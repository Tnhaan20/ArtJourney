import step1Image from "../../assets/step1-image.png";
import step2Image from "../../assets/step2-image.png";

export default function HomeStep() {
  return (
    <div className="w-full bg-[#f8f8f8] py-6 px-6 lg:px-16">
      {/* Title */}
      <h2 className="text-center text-2xl font-bold mb-20">
        The Formula of the Top 5% Art History Masters
      </h2>

      {/* Step 1 - Read */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-20 relative">
        {/* Text Section */}
        <div className="lg:w-2/5 text-left flex flex-col items-start relative">
          {/* Step Title - Separate for Step 1 */}
          <div className="absolute top-[-90px]">
            <span className="inline-block bg-[#E3A857] text-white px-6 py-2 rounded-md text-xl font-semibold">
              Step 1 - Read
            </span>
          </div>
          {/* Step Description */}
          <div className="mt-12">
            <p className="text-lg text-gray-800 leading-relaxed text-justify tracking-wide">
              Begin your journey by exploring carefully curated content that
              dives deep into art history. From ancient civilizations to modern
              masterpieces, gain insights into the evolution of artistic
              expression. Discover how cultural movements shaped artistic
              styles, and how legendary artists revolutionized techniques and
              perspectives over time.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-2/5 flex justify-end">
          <img src={step1Image} alt="Step 1" className="w-full max-w-lg" />
        </div>
      </div>

      {/* Step 2 - Practice */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-12 relative">
        {/* Text Section */}
        <div className="lg:w-2/5 text-left flex flex-col items-start relative">
          {/* Step Title - Separate */}
          <div className="absolute top-[-80px] left-[-80px]">
            <span className="inline-block bg-[#E3A857] text-white px-6 py-2 rounded-md text-xl font-semibold">
              Step 2 - Practice
            </span>
          </div>
          {/* Step Description & Button - Centered */}
          <div className="mt-12 flex flex-col items-center">
            <p className="text-lg text-gray-800 leading-relaxed text-justify tracking-wide">
              Learning goes beyond theory—put your knowledge to the test with
              interactive exercises, engaging quizzes, and hands-on activities
              designed to reinforce your understanding of art history.
            </p>
            {/* Challenge Button - White with Outline */}
            <button className="mt-4 w-40 h-11 flex items-center justify-center text-black border-2 border-[#dda853] rounded-md text-lg font-semibold bg-white hover:bg-[#dda853] hover:text-white transition cursor-pointer">
              Challenge Now
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-2/5 flex justify-start">
          <img src={step2Image} alt="Step 2" className="w-full max-w-lg" />
        </div>
      </div>
    </div>
  );
}
