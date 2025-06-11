import React from 'react';

export default function PaymentTypeSelector({ selectedType, onSelect }) {
  const paymentTypes = [
    {
      id: 'monthly',
      title: 'Monthly Subscription',
      description: 'Access all courses with monthly billing',
      price: '99,000 VND/month',
      features: ['Full access to all courses', 'New content monthly', 'Cancel anytime']
    },
    {
      id: 'annual',
      title: 'Annual Subscription',
      description: 'Our best value plan with yearly billing',
      price: '899,990 VND/year',
      features: ['25% discount vs monthly', 'Full access to all courses', 'Priority support']
    },
    {
      id: 'per-course',
      title: 'Pay Per Course',
      description: 'Purchase individual courses',
      price: 'From 249,999 VND/course',
      features: ['Lifetime access to purchased courses', 'No recurring payments', 'Learn at your own pace']
    }
  ];

  return (
    <div className="payment-type-selector">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Choose Your Payment Plan</h2>
      
      {/* Horizontal Tabs */}
      <div className="payment-tabs flex border-b border-gray-300">
        {paymentTypes.map(type => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`flex-1 py-3 px-4 text-center focus:outline-none transition-colors duration-200 ${
              selectedType === type.id 
                ? 'border-b-2 border-primary-yellow text-primary-yellow font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {type.title}
          </button>
        ))}
      </div>
      
      {/* Selected Plan Details */}
      <div className="selected-plan-details py-6 px-4 bg-white rounded-b-lg shadow-sm border-x border-b border-gray-200">
        {paymentTypes.map(type => (
          selectedType === type.id && (
            <div key={type.id} className="selected-plan-content">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{type.title}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
                <p className="text-xl font-bold text-gray-900">{type.price}</p>
              </div>
              
              <div className="plan-features bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Plan includes:</h4>
                <ul className="space-y-2">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
} 