import React from 'react';

export default function AboutClients() {
  return (
    <div className="bg-white text-black pt-0 mt-0 pb-16">
      <div className="container mx-auto px-4 text-center">
        <div>
          <h3 className="text-xl uppercase font-medium mb-10">HOW <span className="font-bold">CLIENTS SAID</span></h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="Client" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold">Leslie Alexander</h4>
              </div>
              <p className="italic text-gray-600">
                "There is no one who loves pain itself, who seeks after it
                and wants to have it, simply because it is pain..."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Client" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold">Mayor Danloy</h4>
              </div>
              <p className="italic text-gray-600">
                "There is no one who loves pain itself, who seeks after it
                and wants to have it, simply because it is pain..."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 