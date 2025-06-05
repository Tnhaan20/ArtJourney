import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import errorImage from "@/assets/error/404.png";
import { TailwindStyle } from "@/utils/Enum";
import LazyImage from "@/components/elements/LazyImg/LazyImg";

export default function Error() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background circle */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#E8D5B5] -ml-[150px]"></div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center justify-center">
          {/* Text content */}
          <div className="text-center mb-8 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold  text-[#F2B866] mb-4">
              {t("error404.title")}
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold  text-[#F2B866] mb-6">
              {t("error404.heading")}
            </h2>
            <p className="text-gray-700 mb-8 max-w-md mx-auto">
              {t("error404.description")}
            </p>
            <Link
              to="/"
              className={`inline-block px-6 py-3 text-lg font-semibold ${TailwindStyle.HIGHLIGHT_FRAME} text-white rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              {t("error404.button")}
            </Link>
          </div>

          {/* Image */}
          <div className="w-full max-w-md">
            <LazyImage
              src={errorImage}
              alt={t("error404.heading")}
              className="w-full mx-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}