import { Link } from 'react-router-dom';
import BG1 from '../../assets/Home-BG-1.jpg'
import sideBG from '../../assets/Side-BG.jpg'

export default function HomeGuide() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* Background image with glassmorphism effect */}
      <div className="absolute inset-x-0 top-0 h-[78vh] overflow-hidden">
        <img
          src={BG1}
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Glass overlay for the background image */}
        <div className="absolute inset-0 bg-opacity-20 backdrop-filter backdrop-blur-[4px]"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center py-12">
          {/* Left column (content) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              STUDY WITH{" "}
              <span className="block text-4xl font-bold">ART JOURNEY</span>
            </h1>
            <p className="text-white mb-6 max-w-md">
              "Learn art history & Discover the stories behind masterpieces and
              enhance your understanding of art."
            </p>

            {/* Sign up button */}
            <Link to="/signup" className="px-6 py-3 bg-third-yellow text-black font-medium rounded-lg hover:bg-secondary-yellow transition-colors">
              LET'S SIGN UP
            </Link>
          </div>

          {/* Right column (artwork image) */}
          <div className="hidden md:flex md:justify-center">
            <img
              src={sideBG}
              alt="Art masterpiece"
              className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Stats section at bottom */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-12">
          {/* Stat 1 */}
          <div className="bg-secondary-yellow p-4 rounded-lg text-center text-primary-white">
            <div className="text-2xl font-bold">2M +</div>
            <div className="text-sm">CUSTOMERS</div>
          </div>

          {/* Stat 2 */}
          <div className="bg-secondary-yellow p-4 rounded-lg text-center text-primary-white">
            <div className="text-2xl font-bold">4 +</div>
            <div className="text-sm">YEARS EXPERIENCE</div>
          </div>

          {/* Stat 3 */}
          <div className="bg-secondary-yellow p-4 rounded-lg text-center text-primary-white">
            <div className="text-2xl font-bold">60 +</div>
            <div className="text-sm">TOTAL LESSONS</div>
          </div>

          {/* Stat 4 */}
          <div className="bg-secondary-yellow p-4 rounded-lg text-center text-primary-white">
            <div className="text-2xl font-bold">4.9</div>
            <div className="text-sm">STAR REVIEWS</div>
          </div>
        </div>

        {/* Double down arrow indicator with subtle animation and smooth scroll */}
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer transition-transform hover:translate-y-1 duration-300"
          onClick={() => {
            document.getElementById("featured-topics").scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M7 8L12 13L17 8"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 14L12 19L17 14"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
