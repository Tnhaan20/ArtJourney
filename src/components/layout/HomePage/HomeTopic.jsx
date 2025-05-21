import React from "react";
import { useAppTranslation } from '@/contexts/TranslationContext';
import FirstImgTopic from "@/assets/HomePage/Topic/FirstTopic.jpg";

// Import region representative images
import europeImage from "@/assets/HomePage/Topic/europe-topic.jpg"; // Using renaissance as representative
import asiaImage from "@/assets/HomePage/Topic/Asia-Topic.png"; // Using The Great Wave
import northAmericaImage from "@/assets/HomePage/Topic/NA-Topic.png"; // Using modern art
import southAmericaImage from "@/assets/HomePage/Topic/SouthAmerica-Topic.png"; // Using ancient art
import africaImage from "@/assets/HomePage/Topic/Africa-Topic.png"; // Using Nefertiti bust
import oceaniaImage from "@/assets/HomePage/Topic/Oceania-Topic.png"; // Using aboriginal art

export default function HomeTopic() {
  const { t } = useAppTranslation();
  
  // Define regions with their representative images
  const regions = [
    { name: t('home.regions.northAmerica'), image: northAmericaImage },
    { name: t('home.regions.southAmerica'), image: southAmericaImage },
    { name: t('home.regions.oceania'), image: oceaniaImage },
    { name: t('home.regions.europe'), image: europeImage },
    { name: t('home.regions.africa'), image: africaImage },
    { name: t('home.regions.asia'), image: asiaImage },
  ];

  return (
    <div className="w-full text-black min-h-screen">
      {/* INTRO TEXT */}
      <div className="max-w-6xl mx-auto text-center mt-20 px-4">
        <img
          loading="lazy"
          src={FirstImgTopic}
          alt=""
          className="w-full h-full max-h-[60vh] object-contain"
        />
        <p className="text-base leading-relaxed pt-5">
          {t("home.topics.description")}
        </p>
      </div>

      {/* FEATURED TOPICS SECTION */}
      <div
        id="featured-topics"
        className="max-w-5xl mx-auto text-center px-4 py-12"
      >
        <h2 className="text-3xl font-bold mb-10">{t("home.topics.title")}</h2>

        {/* Region Grid - 3x2 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region) => (
            <div key={region.name} className="flex flex-col items-center">
              <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  loading="lazy"
                  src={region.image}
                  alt={region.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mt-3">{region.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
