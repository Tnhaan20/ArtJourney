/**
 * Extract learning outcomes from JSON string format
 * Supports formats like: {"oc1":"outcome 1","oc2":"outcome 2",...}
 * @param {string} learningOutcomesJson - JSON string containing learning outcomes
 * @returns {string[]} Array of learning outcome values
 */
export const extractLearningOutcomesFromJson = (learningOutcomesJson) => {
  try {
    // Parse the JSON string
    const parsedOutcomes = JSON.parse(learningOutcomesJson);
    
    // Check if it's an object
    if (typeof parsedOutcomes !== 'object' || parsedOutcomes === null) {
      return [];
    }
    
    // Get all keys that start with "oc" and sort them naturally
    const ocKeys = Object.keys(parsedOutcomes)
      .filter(key => key.startsWith('oc'))
      .sort((a, b) => {
        // Extract numbers from keys like "oc1", "oc2", "oc10" etc.
        const numA = parseInt(a.replace('oc', ''), 10);
        const numB = parseInt(b.replace('oc', ''), 10);
        return numA - numB;
      });
    
    // Extract values in the correct order
    const outcomes = ocKeys
      .map(key => parsedOutcomes[key])
      .filter(value => value && typeof value === 'string' && value.trim().length > 0)
      .map(value => value.trim());
    
    return outcomes;
  } catch (error) {
    console.warn('Failed to parse learning outcomes JSON:', error);
    return [];
  }
};

/**
 * Parse learning outcomes from various formats
 * @param {string|Array} learningOutcomes - Learning outcomes in various formats
 * @param {Array} defaultOutcomes - Default outcomes to use if parsing fails
 * @returns {string[]} Array of learning outcomes
 */
export const parseLearningOutcomes = (learningOutcomes, defaultOutcomes = []) => {
  // If it's already an array, return it
  if (Array.isArray(learningOutcomes) && learningOutcomes.length > 0) {
    return learningOutcomes;
  }

  // If it's a string, try different parsing methods
  if (typeof learningOutcomes === 'string' && learningOutcomes.trim()) {
    const trimmed = learningOutcomes.trim();
    
    // Try to parse as JSON first (for format like {"oc1":"tst"})
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      const jsonOutcomes = extractLearningOutcomesFromJson(trimmed);
      if (jsonOutcomes.length > 0) {
        return jsonOutcomes;
      }
    }
    
    // Try other parsing methods
    const normalizedText = trimmed
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n');

    let splitOutcomes = [];

    // Try splitting by newlines
    if (normalizedText.includes('\n')) {
      splitOutcomes = normalizedText
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(item =>
          item
            .replace(/^[-•*]\s*/, '')
            .replace(/^\d+\.\s*/, '')
            .trim()
        )
        .filter(item => item.length > 0);
    }

    // Try splitting by semicolons
    if (splitOutcomes.length === 0 && normalizedText.includes(';')) {
      splitOutcomes = normalizedText
        .split(';')
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }

    // Try splitting by bullet points
    if (splitOutcomes.length === 0) {
      splitOutcomes = normalizedText
        .split(/[•-]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }

    // Try splitting by numbered lists
    if (splitOutcomes.length === 0) {
      splitOutcomes = normalizedText
        .split(/\d+\./)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }

    // If we found outcomes, return them
    if (splitOutcomes.length > 0) {
      return splitOutcomes;
    }

    // If no splitting worked, return as single item
    return [normalizedText];
  }

  // Return default outcomes if all parsing fails
  return defaultOutcomes;
};
