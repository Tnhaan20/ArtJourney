import React from 'react';
import AboutHero from "@/components/layout/AboutPage/AboutHero";
import AboutBenefits from "@/components/layout/AboutPage/AboutBenefits";
import AboutTeam from "@/components/layout/AboutPage/AboutTeam";
import AboutStories from "@/components/layout/AboutPage/AboutStories";
import AboutClients from "@/components/layout/AboutPage/AboutClients";

export default function AboutPage() {
  return (
    <div className="bg-white">
      <AboutHero />
      <AboutBenefits />
      <AboutTeam />
      <AboutStories />
      <AboutClients />
    </div>
  );
} 