import step1Image from "../../assets/step1-image.png";
import step2Image from "../../assets/step2-image.png";
import { Link } from "react-router-dom";

export default function HomeStep() {
  return (
    <div className="w-full bg-white py-16 px-6 lg:px-16">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold mb-16">
        The Formula of the Top 5% Art History Masters
      </h2>

      {/* Step 1 - Read */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto mb-20">
        {/* Left side - Text */}
        <div className="lg:w-1/2 pr-8">
          <div className="mb-6">
            <span className="inline-block bg-primary-yellow text-white px-6 py-3 rounded-md text-lg font-semibold">
              Step 1 - Read
            </span>
          </div>
          
          <p className="text-base text-gray-800 leading-relaxed">
            Begin your journey by exploring carefully curated content that
            dives deep into art history. From ancient civilizations to modern
            masterpieces, gain insights into the evolution of artistic
            expression. Discover how cultural movements shaped artistic
            styles, and how legendary artists revolutionized techniques and
            perspectives over time.
          </p>
        </div>

        {/* Right side - Image */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img 
            src={step1Image} 
            alt="Step 1" 
            className="w-full rounded-lg shadow-md" 
          />
        </div>
      </div>

      {/* Step 2 - Practice */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between max-w-6xl mx-auto">
        {/* Right side - Text */}
        <div className="lg:w-1/2 pl-8">
          <div className="mb-6">
            <span className="inline-block bg-primary-yellow text-white px-6 py-3 rounded-md text-lg font-semibold">
              Step 2 - Practice
            </span>
          </div>
          
          <p className="text-base text-gray-800 leading-relaxed mb-8">
            Learning goes beyond theory—put your knowledge to the test
            with interactive exercises, engaging quizzes, and hands-on
            activities designed to reinforce your understanding of art
            history.
          </p>
          
          <div className="flex justify-center">
            <Link 
              to="/learn" 
              className="inline-block px-8 py-3 border-2 border-primary-yellow text-black font-medium rounded-md hover:bg-primary-yellow hover:text-white transition-colors"
            >
              Challenge Now
            </Link>
          </div>
        </div>

        {/* Left side - Image */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img 
            src={step2Image} 
            alt="Step 2" 
            className="w-full rounded-lg shadow-md" 
          />
        </div>
      </div>
    </div>
  );
}
