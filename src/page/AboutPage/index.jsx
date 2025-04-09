import React from 'react';
import AboutHero from '../../components/AboutPage/AboutHero';
import AboutBenefits from '../../components/AboutPage/AboutBenefits';
import AboutTeam from '../../components/AboutPage/AboutTeam';
import AboutStories from '../../components/AboutPage/AboutStories';
import AboutClients from '../../components/AboutPage/AboutClients';

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