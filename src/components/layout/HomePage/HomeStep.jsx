import { useAppTranslation } from "@/contexts/TranslationContext";
import step1Image from "@/assets/step1-image.png";
import step2Image from "@/assets/step2-image.png";
import { Link } from "react-router-dom";
import { TailwindStyle } from "@/utils/Enum";

export default function HomeStep() {
  const { t } = useAppTranslation();

  return (
    <div className="w-full py-16 px-6 lg:px-16">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold mb-16">
        {t("home.steps.title")}
      </h2>

      {/* Step 1 - Read */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto mb-20">
        {/* Left side - Text */}
        <div className="lg:w-1/2 pr-8">
          <div
            className={`inline-block bg-primary-yellow text-white px-6 py-3 rounded-md text-lg font-semibold mb-8 ${TailwindStyle.HIGHLIGHT_FRAME}`}
          >
            <span className="">{t("home.steps.step1.title")}</span>
          </div>

          <p className="text-base text-gray-800 leading-relaxed">
            {t("home.steps.step1.description")}
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
          <div
            className={`inline-block bg-primary-yellow text-white px-6 py-3 rounded-md text-lg font-semibold mb-8 ${TailwindStyle.HIGHLIGHT_FRAME}`}
          >
            <span>{t("home.steps.step2.title")}</span>
          </div>

          <p className="text-base text-gray-800 leading-relaxed mb-8">
            {t("home.steps.step2.description")}
          </p>

          <div className="flex justify-center">
            <Link
              to="/learn"
              className="inline-block px-8 py-3 border-2 border-primary-yellow text-black font-medium rounded-md hover:bg-primary-yellow hover:text-white transition-colors"
            >
              {t("home.steps.step2.button")}
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
