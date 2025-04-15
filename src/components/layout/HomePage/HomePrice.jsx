import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePrice() {
  return (
    <div className="py-16">
      {/* Page heading */}
      <h1 className="text-center text-3xl md:text-4xl font-bold text-primary-black mb-14">
        Membership and Pricing
      </h1>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-primary-black border-opacity-20 rounded-lg overflow-hidden">
          {/* ---------- CARD #1 ---------- */}
          <div className="bg-white p-8 flex flex-col border-r border-primary-black border-opacity-20">
            {/* Top section */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-primary-black">
                Unique curriculum
              </h2>
              <p className="text-gray-600 text-sm mt-2 h-12 flex items-center justify-center">
                Learn a single course and earn a certificate
              </p>
            </div>

            <div className="text-center py-6 border-t border-b border-gray-200 border-opacity-50">
              <p className="text-2xl font-bold text-primary-black">
                40,000 VND
              </p>
              <p className="text-sm text-gray-600">/month</p>
            </div>

            <div className="text-center py-4">
              <p className="text-gray-600 text-sm">
                Visit an individual course or Specialization page to purchase.
              </p>
            </div>

            <div className="flex-grow">
              <div className="py-3 flex items-start">
                <span className="text-primary-black mr-2">✓</span>
                <span className="text-sm text-primary-black">
                  Access all courses in the curriculum
                </span>
              </div>
              <div className="py-3 flex items-start border-t border-gray-200">
                <span className="text-primary-black mr-2">✓</span>
                <span className="text-sm text-primary-black">
                  Earn certificate upon completion after trial ends
                </span>
              </div>
              <div className="py-3 flex items-start border-t border-gray-200">
                <span className="text-primary-black mr-2">✓</span>
                <span className="text-sm text-primary-black">
                  3 day refund period
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/pay"
                className="w-full py-2 border border-primary-yellow text-primary-yellow rounded font-medium hover:bg-primary-yellow hover:text-white transition-colors duration-300 inline-flex items-center justify-center"
              >
                Continue
              </Link>
            </div>
          </div>

          {/* ---------- CARD #2 ---------- */}
          <div className="bg-white p-8 flex flex-col border-r border-primary-black">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-primary-black">
                Plus Monthly
              </h2>
              <p className="text-gray-600 text-sm mt-2 h-12 flex items-center justify-center">
                Complete multiple courses and get certified in a short time
              </p>
            </div>

            <div className="text-center py-6 border-t border-b border-gray-200">
              <p className="text-2xl font-bold text-primary-black">
                99,999 VND
              </p>
              <p className="text-sm text-gray-600">/month</p>
            </div>

            <div className="text-center py-4">
              <p className="text-gray-600 text-sm">Cancel anytime</p>
            </div>

            <div className="flex-grow">
              <div className="py-3 flex items-start">
                <span className="text-primary-black mr-2">✓</span>
                <span className="text-sm text-primary-black">
                  Access 10+ courses from Art Journey
                </span>
              </div>
              <div className="py-3 flex items-start border-t border-gray-200">
                <span className="text-primary-black mr-2">✓</span>
                <span className="text-sm text-primary-black">
                  Earn certificate upon completion after trial ends
                </span>
              </div>
              <div className="py-3 flex items-start border-t border-gray-200">
                <span className="text-primary-black mr-2">✓</span>
                <span className="text-sm text-primary-black">
                  3 day refund period
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/pay"
                className="w-full py-2 border border-primary-yellow text-primary-yellow rounded font-medium hover:bg-primary-yellow hover:text-white transition-colors duration-300 inline-flex items-center justify-center"
              >
                Continue
              </Link>
            </div>
          </div>

          {/* ---------- CARD #3 ---------- */}
          <div className="bg-white p-8 flex flex-col">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-primary-black">
                Plus Annual
              </h2>
              <p className="text-gray-600 text-sm mt-2 h-12 flex items-center justify-center">
                Combine flexibility and savings with long-term learning goals
              </p>
            </div>

            <div className="text-center py-6 border-t border-b border-gray-200">
              <p className="text-2xl font-bold text-primary-black">
                999,999 VND
              </p>
              <p className="text-sm text-gray-600">/year</p>
            </div>

            <div className="text-center py-4">
              <p className="text-gray-600 text-sm">Cancel anytime</p>
            </div>

            <div className="flex-grow">
              <div className="py-3 flex items-start">
                <span className="text-primary-black mr-2">✓</span>
                <span className="text-sm text-primary-black">
                  Access 10+ courses from Art Journey
                </span>
              </div>
              <div className="py-3 flex items-start border-t border-gray-200">
                <span className="text-primary-black mr-2">✓</span>
                <span className="text-sm text-primary-black">
                  Save when you pay in advance for the year
                </span>
              </div>
              <div className="py-3 flex items-start border-t border-gray-200">
                <span className="text-primary-black mr-2">✓</span>
                <span className="text-sm text-primary-black">
                  7 day refund period
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/pay"
                className="w-full py-2 border border-primary-yellow text-primary-yellow rounded font-medium hover:bg-primary-yellow hover:text-white transition-colors duration-300 inline-flex items-center justify-center"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
