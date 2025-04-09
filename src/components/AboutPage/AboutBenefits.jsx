import React from 'react';
import BestChoiceImage from '../../assets/aboutus-bestchoice.png';

export default function AboutBenefits() {
  return (
    <div className="py-16 bg-white text-black mt-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <img 
              src={BestChoiceImage}
              alt="Office Space" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <div className="pl-1 md:pl-0">
              <h3 className="text-2xl font-bold mb-8 pl-28">BEST CHOICE FOR <span className="text-[#DDA853]">CLIENTS</span></h3>
              <div className="space-y-8 pl-16">
                <div className="flex items-start gap-5">
                  <div className="mt-1 flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 13L10 16L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-medium text-xl">Flexible & Convenient Learning</p>
                </div>
                <div className="flex items-start gap-5">
                  <div className="mt-1 flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 13L10 16L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-medium text-xl">High-Quality Content Time & Cost Efficiency</p>
                </div>
                <div className="flex items-start gap-5">
                  <div className="mt-1 flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 13L10 16L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-medium text-xl">Effective Learning Support System</p>
                </div>
                <div className="flex items-start gap-5">
                  <div className="mt-1 flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 13L10 16L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-medium text-xl">Engaging Learning Community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 