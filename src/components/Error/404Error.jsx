import { Link } from 'react-router-dom';
import errorImage from '../../assets/error/404.png';

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background circle */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#E8D5B5] -ml-[150px]"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center justify-center">
          {/* Text content */}
          <div className="text-center mb-8 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-[#F2B866] mb-4">OPPS!</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F2B866] mb-6">Page Not Found</h2>
            <p className="text-gray-700 mb-8 max-w-md mx-auto">
              We are very sorry for inconvenience. It looks like you're trying to access a page that was has been deleted or never even existed
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-[#F2B866] text-white font-medium rounded-full hover:bg-[#e0a755] transition-colors"
            >
              GO BACK HOME
            </Link>
          </div>
          
          {/* Image */}
          <div className="w-full max-w-md">
            <img 
              src={errorImage} 
              alt="404 Error" 
              className="w-full mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}