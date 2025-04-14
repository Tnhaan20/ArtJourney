import { Link } from 'react-router-dom';
import errorImage from "../../../assets/error/500.png"; // Make sure you have this image in your assets folder

export default function ServerError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text content */}
          <div className="md:w-1/2 text-left">
            <h1 className="text-8xl font-bold text-[#F2B866] mb-4">500</h1>
            <h2 className="text-4xl font-bold text-black mb-4">Internal Server Error</h2>
            <p className="text-gray-700 mb-8 max-w-md">
              The server has been deserted for a while.
              Please be patient or try again later.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-[#F2B866] text-white font-medium rounded-full hover:bg-[#e0a755] transition-colors"
            >
              GO BACK HOME
            </Link>
          </div>
          
          {/* Image */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img 
              src={errorImage} 
              alt="500 Error" 
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}