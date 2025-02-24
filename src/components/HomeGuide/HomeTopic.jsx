import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// ========== IMPORT ALL IMAGES ==========
// 1) Europe
import europePrehistoric from "../../assets/europe-prehistoric.png";
import europeAncient from "../../assets/europe-ancient.png";
import europeMedieval from "../../assets/europe-medieval.png";
import europeRenaissance from "../../assets/europe-renaissance.png";
import europeModern from "../../assets/europe-modern.png";
import europePostmodern from "../../assets/europe-postmodern.png";

// 2) Asia
import asiaPrehistoric from "../../assets/asia-prehistoric.png";
import asiaAncient from "../../assets/asia-ancient.png";
import asiaMedieval from "../../assets/asia-medieval.png";
import asiaRenaissance from "../../assets/asia-renaissance.png";
import asiaModern from "../../assets/asia-modern.png";
import asiaPostmodern from "../../assets/asia-postmodern.png";

// 3) North America
import northAmericaPrehistoric from "../../assets/northAmerica-prehistoric.png";
import northAmericaAncient from "../../assets/northAmerica-ancient.png";
import northAmericaMedieval from "../../assets/northAmerica-medieval.png";
import northAmericaRenaissance from "../../assets/northAmerica-renaissance.png";
import northAmericaModern from "../../assets/northAmerica-modern.png";
import northAmericaPostmodern from "../../assets/northAmerica-postmodern.png";

// 4) South America
import southAmericaPrehistoric from '../../assets/southAmerica-prehistoric.png';
import southAmericaAncient from '../../assets/southAmerica-ancient.png';
import southAmericaMedieval from '../../assets/southAmerica-medieval.png';
import southAmericaRenaissance from '../../assets/southAmerica-renaissance.png';
import southAmericaModern from '../../assets/southAmerica-modern.png';
import southAmericaPostmodern from '../../assets/southAmerica-postmodern.png';

// 5) Africa

import africaPrehistoric from '../../assets/africa-prehistoric.png';
import africaAncient from '../../assets/africa-ancient.png';
import africaMedieval from '../../assets/africa-medieval.png';
import africaRenaissance from '../../assets/africa-renaissance.png';
import africaModern from '../../assets/africa-modern.png';
import africaPostmodern from '../../assets/africa-postmodern.png';


// 6) Oceania

import oceaniaPrehistoric from '../../assets/oceania-prehistoric.png';
import oceaniaAncient from '../../assets/oceania-ancient.png';
import oceaniaMedieval from '../../assets/oceania-medieval.png';
import oceaniaRenaissance from '../../assets/oceania-renaissance.png';
import oceaniaModern from '../../assets/oceania-modern.png';
import oceaniaPostmodern from '../../assets/oceania-postmodern.png';
 

// ========== COMBINE IMAGES IN AN OBJECT ==========
const imageSets = {
  europe: {
    prehistoric: europePrehistoric,
    ancient: europeAncient,
    medieval: europeMedieval,
    renaissance: europeRenaissance,
    modern: europeModern,
    postmodern: europePostmodern,
  },
  asia: {
    prehistoric: asiaPrehistoric,
    ancient: asiaAncient,
    medieval: asiaMedieval,
    renaissance: asiaRenaissance,
    modern: asiaModern,
    postmodern: asiaPostmodern,
  },
  northAmerica: {
    prehistoric: northAmericaPrehistoric,
    ancient: northAmericaAncient,
    medieval: northAmericaMedieval,
    renaissance: northAmericaRenaissance,
    modern: northAmericaModern,
    postmodern: northAmericaPostmodern,
  },
  southAmerica: {
    prehistoric: southAmericaPrehistoric,
    ancient: southAmericaAncient,
    medieval: southAmericaMedieval,
    renaissance: southAmericaRenaissance,
    modern: southAmericaModern,
    postmodern: southAmericaPostmodern,
  },
  africa: {
    prehistoric: africaPrehistoric,
    ancient: africaAncient,
    medieval: africaMedieval,
    renaissance: africaRenaissance,
    modern: africaModern,
    postmodern: africaPostmodern,
  },
  oceania: {
    prehistoric: oceaniaPrehistoric,
    ancient: oceaniaAncient,
    medieval: oceaniaMedieval,
    renaissance: oceaniaRenaissance,
    modern: oceaniaModern,
    postmodern: oceaniaPostmodern,
  }
};

// A helper to show a nicer label in the UI:
function formatRegionName(regionKey) {
  return (
    regionKey.charAt(0).toUpperCase() +
    regionKey.slice(1).replace(/([A-Z])/g, " $1")
  );
}

export default function HomeTopic() {
  const [selectedRegion, setSelectedRegion] = useState("europe");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleRegionChange = (newRegion) => {
    if (newRegion !== selectedRegion) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedRegion(newRegion);
        setIsTransitioning(false);
      }, 300); // Transition duration (0.3s)
    }
  };

  return (
    <div className="w-full bg-[#f8f8f8] text-black min-h-screen pb-20">
      {/* SCROLL BUTTON */}
      <div className="flex justify-center pt-4 bg-[#f8f8f8]">
        <button
          onClick={() =>
            document
              .getElementById("featured-topics")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="w-12 h-12 rounded-full bg-gray-300 shadow flex items-center justify-center cursor-pointer 
                    hover:bg-gray-400 hover:scale-110 transition-all duration-200 ease-in-out"
        >
          <ChevronDown size={30} strokeWidth={2} strokeLinecap="round" />
        </button>
      </div>

      {/* INTRO TEXT */}
      <div className="max-w-6xl mx-auto text-center mt-6 px-4">
        <p className="text-base leading-relaxed">
          We offer an interactive learning experience that helps users not only
          absorb art history knowledge effectively but also stay engaged through
          immersive activities. Learners can take exciting quizzes, earn badges,
          and climb the leaderboard to track their progress.
        </p>
      </div>

      {/* FEATURED TOPICS SECTION */}
      <div
        id="featured-topics"
        className="max-w-5xl mx-auto text-center px-4 py-12"
      >
        <h2 className="text-3xl font-bold mb-6">Featured Topics</h2>

        {/* Regions - Clickable */}
        <div className="flex justify-center mb-10 text-xl flex-wrap gap-6">
          {Object.keys(imageSets).map((regionKey) => (
            <span
              key={regionKey}
              onClick={() => handleRegionChange(regionKey)}
              className={`cursor-pointer transition duration-200 ${
                selectedRegion === regionKey
                  ? "text-[#e0c068] font-semibold" // Active (selected)
                  : "text-gray-700 hover:text-[#fe9a00]" // Default and hover
              }`}
            >
              {formatRegionName(regionKey)}
            </span>
          ))}
        </div>

        {/* Topic Images (Switch Dynamically) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(imageSets[selectedRegion]).map(([key, imgSrc]) => (
            <div
              key={key}
              className={`relative transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <img src={imgSrc} alt={key} className="w-full block" />
              <h3 className="text-lg font-semibold mt-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
