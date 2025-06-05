import { Link } from "react-router-dom";
import { useAppTranslation } from "@/contexts/TranslationContext";
import { useAuthStore } from "@/domains/store/use-auth-store";
import BG1 from "@/assets/Home-BG-1.jpg";
import sideBG from "@/assets/Side-BG.jpg";
import { TailwindStyle } from "@/utils/Enum";
import LazyImage from "@/components/elements/LazyImg/LazyImg";

export default function HomeGuide() {
  const { t } = useAppTranslation();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0">
        <img
          loading="lazy"
          src={BG1}
          alt="Classical art background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10 container px-2 lg:px-8 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          {/* Left column - Enhanced content */}
          <div className="space-y-8">
            {/* Elegant badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <span className="text-white/90 text-sm font-medium tracking-wide">
                ✨ {t("home.hero.badge", "Premium Art Education")}
              </span>
            </div>

            {/* Main heading with better typography */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6x text-white">
                {t("home.hero.title")}
                <span className="block font-bold mongro-normal bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {t("home.hero.subtitle")}
                </span>
              </h1>

              <div className="w-24 h-1 bg-gradient-to-r from-third-yellow to-transparent rounded-full"></div>
            </div>

            {/* Description with better spacing */}
            <p className="text-lg text-white/90 leading-relaxed max-w-lg font-light">
              {t("home.hero.description")}
            </p>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={isAuthenticated ? "/learn" : "/signup"}
                className={`group relative px-8 py-4 ${TailwindStyle.HIGHLIGHT_FRAME} hover:shadow-xl`}
              >
                <span className="relative z-10">
                  {isAuthenticated
                    ? t("home.hero.goToLearn")
                    : t("home.hero.signUp")}
                </span>
                <div className="absolute inset-0  rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Compact Stats Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {/* Stat 1 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center hover:bg-white/15 transition-all duration-300">
                <div className="text-xl font-bold text-white mb-1">2M+</div>
                <div className="text-xs text-white/80 uppercase tracking-wide">
                  {t("home.stats.customers")}
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center hover:bg-white/15 transition-all duration-300">
                <div className="text-xl font-bold text-white mb-1">4+</div>
                <div className="text-xs text-white/80 uppercase tracking-wide">
                  {t("home.stats.experience")}
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center hover:bg-white/15 transition-all duration-300">
                <div className="text-xl font-bold text-white mb-1">60+</div>
                <div className="text-xs text-white/80 uppercase tracking-wide">
                  {t("home.stats.lessons")}
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center hover:bg-white/15 transition-all duration-300">
                <div className="text-xl font-bold text-white mb-1">4.9</div>
                <div className="text-xs text-white/80 uppercase tracking-wide">
                  {t("home.stats.reviews")}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Enhanced image */}
          <div className="relative">
            <div>
              <img
                loading="lazy"
                src={sideBG}
                alt="Classical art masterpiece"
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
              />

              {/* Featured Artwork Note - bottom-left of the image */}
              <div className="absolute bottom-[-40px] left-3 bg-white rounded-lg p-4 shadow-lg max-w-xs">
                <div className="text-xs text-primary-yellow font-semibold mb-1 uppercase tracking-wide">
                  {t("home.hero.featuredArtwork", "Featured Artwork")}
                </div>
                <div className="text-sm text-gray-900 mongro-normal font-bold mb-1">
                  A Glory of the Virgin with the Archangel Gabriel and Saints
                  Eusebius, Roch, and Sebastian
                </div>
                <div className="text-xs text-gray-600">
                  Sebastiano Ricci, 1722 - 1727
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          onClick={() => {
            document.getElementById("featured-topics")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <div className="flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-colors duration-300">
            <span className="text-sm font-medium tracking-wider transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2">
              SCROLL
            </span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-white/50 transition-all duration-300">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce group-hover:animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
