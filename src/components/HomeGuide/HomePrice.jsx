import React from 'react';

export default function HomePrice() {
  return (
    <div className="bg-[#f8f8f8] py-10">
      {/* Page heading */}
      <h1 className="text-center text-3xl md:text-4xl font-bold text-black mb-14">
        Membership and Pricing
      </h1>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* ---------- CARD #1 ---------- */}
          <div className="bg-white p-6 flex flex-col justify-between items-stretch text-center h-full">
            {/* Top section */}
            <div>
              <h2 className="text-lg font-bold text-black">Unique curriculum</h2>
              {/* Subtitle with min-height to help align across cards */}
              <p className="text-[#8f8e8e] text-sm min-h-[40px] flex items-center justify-center">
                Learn a single course and earn a certificate
              </p>

              {/* First HR spanning full width (negative mx to override p-6) */}
              <hr className="-mx-6 my-4 border-gray-300" />

              <p className="text-xl font-bold text-black">
                20,000 VND - 40,000 VND<br /><span className="text-base font-normal">/month</span>
              </p>
              {/* Smaller note in gray with min-height if needed */}
              <p className="mt-2 text-[#8f8e8e] font-semibold text-sm min-h-[40px] flex items-center justify-center mb-8">
                Visit an individual course or Specialization page to purchase.
              </p>

              {/* Regular HR inside the padding */}
              {/* <hr className="my-4 w-full border-gray-300" /> */}

              <div className="w-full">
                <div className="py-2 border-b border-gray-200 flex items-center justify-start text-sm text-black">
                  <span className="mr-2">✔</span>
                  <span className="text-left">Access all courses in the curriculum</span>
                </div>
                <div className="py-2 border-b border-gray-200 flex items-center justify-start text-sm text-black">
                  <span className="mr-2">✔</span>
                  <span className="text-left">Earn certificate upon completion after trial ends</span>
                </div>
                <div className="py-2 border-b border-gray-200 flex items-center justify-start text-sm text-black">
                  <span className="mr-2">✔</span>
                  <span className="text-left">3 day refund period</span>
                </div>
              </div>
            </div>
            {/* Bottom (button) */}
            <div className="mt-6">
              <button className="px-27 py-1 border border-[#dda853] bg-[#f3f3f3] text-[#dda853] rounded font-medium hover:bg-white cursor-pointer">
                Continue
              </button>
            </div>
          </div>

          {/* ---------- CARD #2 ---------- */}
          <div className="bg-white p-6 flex flex-col justify-between items-stretch text-center h-full">
            <div>
              <h2 className="text-lg font-bold text-black">Plus Monthly</h2>
              <p className="text-[#8f8e8e] text-sm min-h-[40px] flex items-center justify-center">
                Complete multiple courses and get certified in a short time
              </p>

              <hr className="-mx-6 my-4 border-gray-300" />

              <p className="text-xl font-bold text-black">
                99,999 VND<br /><span className="text-base font-normal">/month</span>
              </p>
              <p className="mt-2 text-[#8f8e8e] font-semibold text-sm min-h-[40px] flex items-center justify-center mb-8">
                Cancel anytime
              </p>

              {/* <hr className="my-4 w-full border-gray-300" /> */}

              <div className="w-full">
                <div className="py-2 border-b border-gray-200 flex items-center text-sm text-black">
                  <span className="mr-2">✔</span>
                  <span className="text-left">Access 10+ courses from Art Journey</span>
                </div>
                <div className="py-2 border-b border-gray-200 flex items-center text-sm text-black">
                  <span className="mr-2">✔</span>
                  <span className="text-left">Earn certificate upon completion after trial ends</span>
                </div>
                <div className="py-2 border-b border-gray-200 flex items-center text-sm text-black">
                  <span className="mr-2">✔</span>
                  <span className="text-left">3 day refund period</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button className="px-27 py-1 border border-[#dda853] bg-[#f3f3f3] text-[#dda853] rounded font-medium hover:bg-white cursor-pointer">
                Continue
              </button>
            </div>
          </div>

          {/* ---------- CARD #3 ---------- */}
          <div className="bg-white p-6 flex flex-col justify-between items-stretch text-center h-full">
            <div>
              <h2 className="text-lg font-bold text-black">Plus Annual</h2>
              <p className="text-[#8f8e8e] text-sm min-h-[40px] flex items-center justify-center">
                Combine flexibility and savings with long-term learning goals
              </p>

              <hr className="-mx-6 my-4 border-gray-300" />

              <p className="text-xl font-bold text-black">
                999,999 VND<br /><span className="text-base font-normal">/month</span>
              </p>
              <p className="mt-2 text-[#8f8e8e] font-semibold text-sm min-h-[40px] flex items-center justify-center mb-8">
                Cancel anytime
              </p>

              {/* <hr className="my-4 w-full border-gray-300" /> */}

              <div className="w-full">
                <div className="py-2 border-b border-gray-200 flex items-center text-sm text-black">
                  <span className="mr-2">✔</span>
                  <span className="text-left">Access 10+ courses from Art Journey</span>
                </div>
                <div className="py-2 border-b border-gray-200 flex items-center text-sm text-black">
                  <span className="mr-2">✔</span>
                  <span className="text-left">Save when you pay in advance for the year</span>
                </div>
                <div className="py-2 border-b border-gray-200 flex items-center text-sm text-black">
                  <span className="mr-2">✔</span>
                  <span className="text-left">7 day refund period</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button className="px-27 py-1 border border-[#dda853] bg-[#f3f3f3] text-[#dda853] rounded font-medium hover:bg-white cursor-pointer">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
