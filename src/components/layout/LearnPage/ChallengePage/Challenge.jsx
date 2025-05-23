import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, X, Info, ChevronRight, Upload, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { TailwindStyle } from '@/utils/Enum';
import { toast } from '@/utils/Toast';
import LazyImage from '@/components/elements/LazyImg/LazyImg';

export default function Challenge() {
  // Updated params to include both courseId and moduleId
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [challengeData, setChallengeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Mock challenge data based on courseId and moduleId
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchChallengeData = () => {
      setLoading(true);
      console.log(`Fetching challenge data for course: ${courseId}, module: ${moduleId}`);
      
      // Simulating API delay
      setTimeout(() => {
        // Mock data structure based on course and module
        const challengeDataMap = {
          // Course 1 (Art History)
          '1': {
            // Module 1 (Early Christian Art)
            '1': {
              title: "Early Christian Art Analysis Challenge",
              description: "Apply your knowledge by analyzing key pieces of Early Christian art.",
              estimatedTime: 20, // minutes
              difficulty: "Intermediate",
              steps: [
                {
                  id: 1,
                  title: "The Good Shepherd Fresco",
                  type: "analysis",
                  instructions: "Study this 3rd-century fresco from the Catacomb of Priscilla in Rome, depicting the Good Shepherd motif. Identify the symbolic elements and explain their Christian meaning.",
                  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Good_shepherd_02.jpg/440px-Good_shepherd_02.jpg",
                  questions: [
                    "What does the figure of the shepherd symbolize in Early Christian art?",
                    "How does this artwork reflect the historical context of Christianity in the 3rd century?",
                    "Identify at least two artistic techniques or elements that were typical for the period."
                  ]
                },
                {
                  id: 2,
                  title: "Sarcophagus of Junius Bassus",
                  type: "analysis",
                  instructions: "Examine this 4th-century marble sarcophagus, one of the most important examples of Early Christian relief sculpture. Focus on the narrative panels and their arrangement.",
                  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Sarcofago_di_giunio_basso%2C_cosa_e_roma_359_dc_ca._03.jpg/600px-Sarcofago_di_giunio_basso%2C_cosa_e_roma_359_dc_ca._03.jpg",
                  questions: [
                    "What biblical scenes can you identify in this sarcophagus?",
                    "How does the arrangement of scenes create a theological message?",
                    "How does this artwork demonstrate the fusion of Roman and Christian artistic traditions?"
                  ]
                },
                {
                  id: 3,
                  title: "Your Own Analysis",
                  type: "creation",
                  instructions: "Find an example of Early Christian art not covered in this module. Upload an image of the artwork and provide your analysis following the framework you've learned.",
                  questions: [
                    "What is the name, date, and origin of this artwork?",
                    "What symbols, themes, or narratives are present?",
                    "How does this artwork connect to the historical context of Early Christianity?",
                    "What makes this a significant example of Early Christian art?"
                  ]
                }
              ]
            },
            // Module 2 (Byzantine Art)
            '2': {
              title: "Byzantine Iconography Challenge",
              description: "Test your knowledge of Byzantine art symbols and techniques.",
              estimatedTime: 25,
              difficulty: "Intermediate",
              steps: [
                {
                  id: 1,
                  title: "Hagia Sophia Mosaics",
                  type: "analysis",
                  instructions: "Analyze these famous mosaics from the Hagia Sophia in Constantinople.",
                  imageUrl: "https://placehold.co/600x400?text=Byzantine+Mosaics",
                  questions: [
                    "What are the key characteristics of Byzantine mosaic art?",
                    "How does this artwork represent the theological ideas of the period?",
                    "What techniques were used to create a sense of divine presence?"
                  ]
                },
                {
                  id: 2,
                  title: "Byzantine Icon Analysis",
                  type: "analysis",
                  instructions: "Examine this Byzantine icon and identify its symbolic elements.",
                  imageUrl: "https://placehold.co/600x400?text=Byzantine+Icon",
                  questions: [
                    "How does this icon demonstrate Byzantine artistic conventions?",
                    "What symbolic colors are used and what do they represent?",
                    "How does the composition direct the viewer's attention?"
                  ]
                },
                {
                  id: 3,
                  title: "Your Byzantine Analysis",
                  type: "creation",
                  instructions: "Find a Byzantine artwork and provide your own detailed analysis.",
                  questions: [
                    "What period of Byzantine art does this example represent?",
                    "What religious or political message does it convey?",
                    "How does it compare to other Byzantine artworks you've studied?",
                    "What makes this particular example significant?"
                  ]
                }
              ]
            }
          },
          // Course 2 (Modern Art)
          '2': {
            // Module data for Modern Art course
            '1': {
              title: "Impressionism Analysis Challenge",
              description: "Apply your knowledge of Impressionist techniques and themes.",
              estimatedTime: 15,
              difficulty: "Beginner",
              steps: [
                // Steps for Impressionism challenge
                {
                  id: 1,
                  title: "Monet's Water Lilies",
                  type: "analysis",
                  instructions: "Study this famous Impressionist painting and analyze its techniques.",
                  imageUrl: "https://placehold.co/600x400?text=Monet+Water+Lilies",
                  questions: [
                    "How does Monet use color and light in this painting?",
                    "What impressionist techniques can you identify?",
                    "How does this work reflect the Impressionist movement's values?"
                  ]
                },
                {
                  id: 2,
                  title: "Your Impressionist Example",
                  type: "creation",
                  instructions: "Find an Impressionist painting not covered in this module and analyze it.",
                  questions: [
                    "Who is the artist and when was it created?",
                    "What elements make this an Impressionist work?",
                    "How does this work compare to other Impressionist paintings of the period?"
                  ]
                }
              ]
            }
          }
        };
        
        // Try to get data for the specified course and module
        if (challengeDataMap[courseId] && challengeDataMap[courseId][moduleId]) {
          const data = challengeDataMap[courseId][moduleId];
          setChallengeData(data);
          
          // Initialize responses array based on steps
          setResponses(Array(data.steps.length).fill({ text: "", images: [] }));
          setTimeRemaining(data.estimatedTime * 60); // Convert minutes to seconds
        } else {
          // Fallback to generic challenge if the specific one is not found
          console.log("Specific challenge not found, using generic challenge");
          setChallengeData({
            title: `Course ${courseId} - Module ${moduleId} Challenge`,
            description: "Apply your knowledge from this module with this practice challenge.",
            estimatedTime: 15,
            difficulty: "Intermediate",
            steps: [
              {
                id: 1,
                title: "Sample Analysis",
                type: "analysis",
                instructions: "Study this artwork and provide your analysis.",
                imageUrl: "https://placehold.co/600x400?text=Sample+Artwork",
                questions: [
                  "What do you observe in this artwork?",
                  "How does it relate to the module content?",
                  "What techniques are being used?"
                ]
              },
              {
                id: 2,
                title: "Your Own Creation",
                type: "creation",
                instructions: "Create or find your own example related to this module's topic.",
                questions: [
                  "Describe your selected example",
                  "Why is it relevant to this module?",
                  "What insights does it provide about the topic?"
                ]
              }
            ]
          });
          
          // Initialize responses array based on steps for generic challenge
          setResponses(Array(2).fill({ text: "", images: [] }));
          setTimeRemaining(15 * 60); // 15 minutes in seconds
        }
        
        setLoading(false);
      }, 1000);
    };

    fetchChallengeData();
  }, [courseId, moduleId]);

  // Timer countdown logic (unchanged)
  useEffect(() => {
    if (loading || isComplete || !timeRemaining) return;

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isComplete, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Updated navigation to include courseId
  const handleBackToModule = () => {
    navigate(`/learn/course/${courseId}/module/${moduleId}`);
  };

  // Rest of the component remains the same
  const handleResponseChange = (text) => {
    const newResponses = [...responses];
    newResponses[currentStep] = { ...newResponses[currentStep], text };
    setResponses(newResponses);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Create file preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      
      // Update responses with image
      const newResponses = [...responses];
      newResponses[currentStep] = { 
        ...newResponses[currentStep], 
        images: [file] 
      };
      setResponses(newResponses);
    };
    reader.readAsDataURL(file);
  };

  const handleNextStep = () => {
    // Basic validation
    if (!responses[currentStep].text || responses[currentStep].text.trim() === '') {
      toast({
        title: "Response required",
        description: "Please provide an answer before continuing.",
        variant: "destructive"
      });
      return;
    }

    // If it's the creation step that requires an image upload
    if (challengeData.steps[currentStep].type === 'creation' && 
        responses[currentStep].images.length === 0) {
      toast({
        title: "Image required",
        description: "Please upload an image for this step.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < challengeData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Reset image preview when moving to next step
      setImagePreview(null);
    } else {
      // Complete the challenge
      setIsComplete(true);
      // In a real app, you would submit the result to the server here
    }
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Loading state remains the same
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary-yellow" />
            <p className="text-gray-600">
              Loading challenge for Course {courseId}, Module {moduleId}...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // The rest of the component UI remains the same
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {!isComplete ? (
          <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Challenge Header */}
            <div className="bg-third-yellow p-6 border-b border-secondary-yellow">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleBackToModule}
                  className="flex items-center text-primary-blue hover:text-secondary-blue"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  <span>Back to Module</span>
                </button>
                {timeRemaining && (
                  <div className="flex items-center text-primary-blue bg-primary-yellow px-3 py-1 rounded-full">
                    <Clock size={16} className="mr-2" />
                    <span className="font-medium">
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                )}
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                {challengeData.title}
              </h1>
              <p className="text-gray-600 mt-1">{challengeData.description}</p>
              <div className="text-xs text-gray-500 mt-1">
                Course {courseId} • Module {moduleId}
              </div>

              <div className="flex items-center mt-3 text-sm text-gray-600">
                <div className="flex items-center mr-4">
                  <Clock size={14} className="mr-1 text-primary-blue" />
                  <span>{challengeData.estimatedTime} minutes</span>
                </div>
                <div className="flex items-center">
                  <Info size={14} className="mr-1 text-primary-blue" />
                  <span>Difficulty: {challengeData.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="p-4 bg-white border-b border-gray-100">
              <div className="flex items-center justify-between mb-1 text-sm text-gray-600">
                <span>
                  Step {currentStep + 1} of {challengeData.steps.length}
                </span>
              </div>
              <Progress
                value={(currentStep / (challengeData.steps.length - 1)) * 100}
                className="h-2 bg-gray-200"
              >
                <div
                  className="h-full bg-primary-yellow rounded-full"
                  style={{
                    width: `${
                      (currentStep / (challengeData.steps.length - 1)) * 100
                    }%`,
                  }}
                ></div>
              </Progress>
            </div>

            {/* Current Step Content */}
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {challengeData.steps[currentStep].title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {challengeData.steps[currentStep].instructions}
                </p>

                {/* Display artwork image for analysis steps */}
                {challengeData.steps[currentStep].type === "analysis" &&
                  challengeData.steps[currentStep].imageUrl && (
                    <div className="mb-6">
                      <div className="rounded-lg overflow-hidden border border-gray-200 mb-2">
                        <img
                          src={challengeData.steps[currentStep].imageUrl}
                          alt={challengeData.steps[currentStep].title}
                          className="w-full h-auto max-h-96 object-contain"
                        />
                      </div>
                      <p className="text-xs text-gray-500 italic text-center">
                        {challengeData.steps[currentStep].title} (Click image to
                        enlarge)
                      </p>
                    </div>
                  )}

                {/* Display file upload for creation steps */}
                {challengeData.steps[currentStep].type === "creation" && (
                  <div className="mb-6">
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        imagePreview
                          ? "border-amber-300 bg-amber-50"
                          : "border-gray-300 hover:border-amber-300"
                      }`}
                    >
                      {imagePreview ? (
                        <div className="mb-4">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-64 mx-auto object-contain rounded"
                          />
                          <p className="text-sm text-gray-500 mt-2">
                            Image uploaded successfully
                          </p>
                        </div>
                      ) : (
                        <div className="p-4">
                          <Upload className="h-12 w-12 text-amber-500 mx-auto mb-2" />
                          <p className="text-gray-600 mb-1">
                            Drag and drop your image here or click to browse
                          </p>
                          <p className="text-xs text-gray-500">
                            Supported formats: JPG, PNG, GIF (Max size: 5MB)
                          </p>
                        </div>
                      )}

                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleTriggerFileInput}
                        className="mt-2 border-amber-500 text-amber-600 hover:bg-amber-50"
                      >
                        {imagePreview ? "Change Image" : "Select Image"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Questions */}
                <div className="space-y-4 mb-6">
                  {challengeData.steps[currentStep].questions.map(
                    (question, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-800 font-medium mb-1">
                          {index + 1}. {question}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Response Text Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Analysis
                </label>
                <Textarea
                  placeholder="Type your response here..."
                  className="w-full p-3 border border-gray-300 rounded-lg min-h-[200px]"
                  value={responses[currentStep].text || ""}
                  onChange={(e) => handleResponseChange(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Be specific and reference details from the artwork to support
                  your analysis.
                </p>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleNextStep}
                  className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2`}
                >
                  {currentStep < challengeData.steps.length - 1 ? (
                    <span className="flex items-center">
                      Next Step <ChevronRight size={16} className="ml-1" />
                    </span>
                  ) : (
                    "Complete Challenge"
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Challenge Complete View
          <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-amber-50 p-6 border-b border-amber-100">
              <h1 className="text-xl font-bold text-gray-800">
                Challenge Completed!
              </h1>
              <p className="text-gray-600 mt-1">
                Great job completing this challenge.
              </p>
              <div className="text-xs text-gray-500 mt-1">
                Course {courseId} • Module {moduleId}
              </div>
            </div>

            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Analysis Submitted Successfully
              </h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Your art analysis has been recorded. This exercise will help you
                develop critical skills in evaluating and interpreting
                historical artworks.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleBackToModule}
                  className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2`}
                >
                  Return to Module
                </Button>

                <Button
                  variant="outline"
                  className="border-amber-500 text-amber-600 hover:bg-amber-50"
                  onClick={() => {
                    // In a real app, this would navigate to responses review
                    toast({
                      title: "Review coming soon",
                      description:
                        "The ability to review your submissions will be available soon.",
                    });
                  }}
                >
                  <Eye size={16} className="mr-2" />
                  Review My Responses
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}