import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TailwindStyle } from "@/utils/Enum";
import SideBG from "@/assets/SideBGSignIn.jpg";
import confetti from 'canvas-confetti';
import Checkbox from "@/components/elements/checkbox/Checkbox";

export default function Survey() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  // Handle countdown and redirect for success screen
  useEffect(() => {
    if (step === 4) {
      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Set up countdown timer
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [step, navigate]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleContinentToggle = (continent) => {
    setSelectedContinents(prev => {
      if (prev.includes(continent)) {
        return prev.filter(item => item !== continent);
      } else {
        return [...prev, continent];
      }
    });
  };

  const handleSubmit = () => {
    // Here you would typically send the survey data to your backend
    console.log('Survey submitted:', { userType, selectedContinents });
    // Move to success screen
    setStep(4);
  };

  // Progress step bar component
  const ProgressSteps = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary-yellow' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary-yellow bg-amber-50' : 'border-gray-300'}`}>
              <span className="font-bold">1</span>
            </div>
            <span className="text-xs mt-1">Purpose</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary-yellow' : 'bg-gray-300'}`}></div>
          
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary-yellow' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-primary-yellow bg-amber-50' : 'border-gray-300'}`}>
              <span className="font-bold">2</span>
            </div>
            <span className="text-xs mt-1">Interests</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-primary-yellow' : 'bg-gray-300'}`}></div>
          
          <div className={`flex flex-col items-center ${step >= 4 ? 'text-primary-yellow' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 4 ? 'border-primary-yellow bg-amber-50' : 'border-gray-300'}`}>
              <span className="font-bold">3</span>
            </div>
            <span className="text-xs mt-1">Complete</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Step 1: Welcome Screen - Fullscreen with low opacity */}
      {step === 1 && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src={SideBG}
              alt="Art Journey Welcome"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>
          
          <div className="relative z-10 text-center p-8">
            <h1 className="text-4xl font-bold text-primary-yellow mb-8">
              WELCOME TO ART JOURNEY
            </h1>
            <button
              onClick={handleNext}
              className={`${TailwindStyle.HIGHLIGHT_FRAME} px-12 py-3 text-lg font-semibold rounded-md cursor-pointer`}
            >
              NEXT
            </button>
          </div>
        </div>
      )}

      {/* Step 2: User Type Selection */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full mx-4">
          <ProgressSteps />
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            How do you want to use Art Journey?
          </h2>
          <p className="text-gray-600 mb-6">
            We'll personalize your setup experience accordingly.
          </p>

          <div className="space-y-4">
            <div 
              className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 ${
                userType === 'teacher' ? 'border-primary-yellow bg-amber-100' : 'border-gray-300'
              }`}
              onClick={() => handleUserTypeSelect('teacher')}
            >
              <div className="bg-amber-100 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="font-medium">I'm here to take resources to teach</p>
                <p className="text-sm text-gray-600">Evaluate resources of art history</p>
              </div>
            </div>

            <div 
              className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 ${
                userType === 'student' ? 'border-primary-yellow bg-amber-100' : 'border-gray-300'
              }`}
              onClick={() => handleUserTypeSelect('student')}
            >
              <div className="bg-amber-100 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">I'm here to practice and prepare</p>
                <p className="text-sm text-gray-600">Solve challenges and learn new art history knowledge</p>
              </div>
              <div className="ml-auto">
                <span className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded">Free trial</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleNext}
              disabled={!userType}
              className={`${TailwindStyle.HIGHLIGHT_FRAME} px-8 py-2 text-base font-semibold rounded-md ${
                !userType ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              NEXT
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Continent Selection with Checkboxes */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full mx-4">
          <ProgressSteps />
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Which continent do you like the art history?
          </h2>
          <p className="text-gray-600 mb-6">
            We'll personalize your setup experience accordingly.
          </p>

          <div className="space-y-3">
            {['Europe Art History', 'Asia Art History', 'Africa Art History', 
              'Oceania Art History', 'North America Art History', 'South America Art History'].map((item) => (
              <div key={item} className="flex items-center p-2">
                <Checkbox
                  checked={selectedContinents.includes(item)}
                  onChange={() => handleContinentToggle(item)}
                  color="primary-yellow"
                >
                  <span className={selectedContinents.includes(item) ? 'text-primary-yellow' : 'text-gray-700'}>
                    {item}
                  </span>
                </Checkbox>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              className="px-8 py-2 text-base font-semibold rounded-md border border-primary-yellow text-primary-yellow hover:bg-amber-50"
            >
              BACK
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={selectedContinents.length === 0}
              className={`${TailwindStyle.HIGHLIGHT_FRAME} px-8 py-2 text-base font-semibold rounded-md ${
                selectedContinents.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              NEXT
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Success Screen */}
      {step === 4 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-amber-100 to-amber-200">
          <div className="bg-white rounded-xl shadow-2xl p-10 max-w-4xl w-full mx-4 text-center relative overflow-hidden">
            <ProgressSteps />
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary-yellow opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary-yellow opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
            
            {/* Success icon */}
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Art Journey Begins Now!
            </h2>
            
            <p className="text-lg text-gray-600 mb-6">
              Thank you for sharing your preferences. We've customized your experience based on your selections.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-primary-yellow mb-4">Your Selected Interests:</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedContinents.map(continent => (
                  <span key={continent} className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    {continent}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-gray-500">
                Redirecting to homepage in <span className="text-primary-yellow font-bold">{countdown}</span> seconds...
              </p>
            </div>
            
            <Link 
              to="/"
              className="inline-block px-8 py-3 bg-primary-yellow text-white rounded-md font-semibold hover:bg-amber-600 transition-colors"
            >
              Go to Homepage Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}