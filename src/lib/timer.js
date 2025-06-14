export default function Timer() {
  const formatTimeToHours = (timeString) => {
    if (!timeString || typeof timeString !== "string") {
      return "0 hours";
    }

    // Split the time string (HH:MM:SS)
    const timeParts = timeString.split(":");

    if (timeParts.length !== 3) {
      return "0 hours";
    }

    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    // Convert everything to total hours
    const totalHours = hours + minutes / 60 + seconds / 3600;

    // Format based on the total hours
    if (totalHours === 0) {
      return "0 hours";
    } else if (totalHours < 1) {
      // Less than 1 hour, show in minutes
      const totalMinutes = Math.round(minutes + seconds / 60);
      return `${totalMinutes} min${totalMinutes !== 1 ? "s" : ""}`;
    } else if (totalHours < 2) {
      // Between 1-2 hours, show as "1 hour" or "1.5 hours"
      if (minutes < 30) {
        return "1 hour";
      } else {
        return "1.5 hours";
      }
    } else {
      // 2+ hours, round to nearest half hour
      const roundedHours = Math.round(totalHours * 2) / 2;
      return `${roundedHours} hour${roundedHours !== 1 ? "s" : ""}`;
    }
  };

  // Helper function to convert time string to hours number
  const timeStringToHours = (timeString) => {
    if (!timeString || typeof timeString !== "string") {
      return 0;
    }

    const timeParts = timeString.split(":");
    if (timeParts.length !== 3) {
      return 0;
    }

    const hours = parseInt(timeParts[0], 10) || 0;
    const minutes = parseInt(timeParts[1], 10) || 0;
    const seconds = parseInt(timeParts[2], 10) || 0;

    return hours + minutes / 60 + seconds / 3600;
  };

  const formatHoursToDays = (hoursInput) => {
    let hours;
    
    // Check if input is a time string or a number
    if (typeof hoursInput === "string") {
      hours = timeStringToHours(hoursInput);
    } else {
      hours = hoursInput;
    }

    if (!hours || hours <= 0 || isNaN(hours)) {
      return "0 days";
    }

    const totalDays = hours / 24;

    if (totalDays < 1) {
      // Less than 1 day, show in hours
      const roundedHours = Math.round(hours);
      return `${roundedHours} hour${roundedHours !== 1 ? "s" : ""}`;
    } else if (totalDays < 2) {
      // Between 1-2 days
      return "1 day";
    } else {
      // 2+ days, round to nearest half day
      const roundedDays = Math.round(totalDays * 2) / 2;
      return `${roundedDays} day${roundedDays !== 1 ? "s" : ""}`;
    }
  };

  // 3. Convert hours to weeks
  const formatHoursToWeeks = (hoursInput) => {
    let hours;
    
    // Check if input is a time string or a number
    if (typeof hoursInput === "string") {
      hours = timeStringToHours(hoursInput);
    } else {
      hours = hoursInput;
    }

    if (!hours || hours <= 0 || isNaN(hours)) {
      return "0 weeks";
    }

    const totalWeeks = hours / (24 * 7); // 168 hours in a week

    if (totalWeeks < 0.5) {
      // Less than half week, show in days
      const days = Math.round(hours / 24);
      if (days < 1) {
        const roundedHours = Math.round(hours);
        return `${roundedHours} hour${roundedHours !== 1 ? "s" : ""}`;
      }
      return `${days} day${days !== 1 ? "s" : ""}`;
    } else if (totalWeeks < 1) {
      // Less than 1 week but more than half week
      return "1 week";
    } else {
      // 1+ weeks
      const roundedWeeks = Math.round(totalWeeks * 2) / 2; // Round to nearest 0.5
      return `${roundedWeeks} week${roundedWeeks !== 1 ? "s" : ""}`;
    }
  };

  // Combined function that automatically chooses the best unit
  const formatTimeAutomatically = (timeString) => {
    if (!timeString) return "0 hours";

    // First convert to hours
    const totalHours = timeStringToHours(timeString);
    
    if (totalHours === 0 || isNaN(totalHours)) {
      return "0 hours";
    }

    // Choose appropriate unit based on duration
    if (totalHours < 24) {
      // Less than 1 day - show hours/minutes
      return formatTimeToHours(timeString);
    } else if (totalHours < 168) {
      // Less than 1 week - show days
      return formatHoursToDays(totalHours);
    } else {
      // 1 week or more - show weeks
      return formatHoursToWeeks(totalHours);
    }
  };
    
  return {
    formatTimeToHours,
    formatHoursToDays,
    formatHoursToWeeks,
    formatTimeAutomatically,
    timeStringToHours, // Export helper function too
  };
}
