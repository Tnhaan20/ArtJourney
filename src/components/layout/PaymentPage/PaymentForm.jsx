import LazyImage from '@/components/elements/LazyImg/LazyImg';
import React, { useState, useEffect } from 'react';

export default function PaymentForm({ paymentType = 'monthly', onPaymentMethodSelect }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  
  useEffect(() => {
    setPaymentMethod('');
  }, [paymentType]);
  
  const handlePaymentMethodSelect = (method) => {
    console.log('Selected payment method:', method);
    setPaymentMethod(method);
    
    // Call the parent component's handler
    if (onPaymentMethodSelect) {
      onPaymentMethodSelect(method);
    }
  };
  
  // Payment method data with logos
  const paymentMethods = [
    { 
      id: 'momo', 
      name: 'MoMo',
      logo: '/src/assets/icons/momo.png'
    },
    { 
      id: 'zalopay', 
      name: 'Zalo PAY',
      logo: '/src/assets/icons/zalopay.png'
    },
    { 
      id: 'vnpay', 
      name: 'VNPAY',
      logo: '/src/assets/icons/vnpay.png'
    }
  ];
  
  return (
    <div className="payment-form-container">
      {/* Remove the H2 title and P description from here, moved to parent */}
      {/* <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Details</h2> */}
      {/* <p className="text-sm text-gray-600 mb-6">Complete your {paymentType === 'per-course' ? 'purchase' : 'subscription'} by providing your payment details</p> */}

      <form>
        {/* Choose Payment Method */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#999999] mb-3">
            Complete your purchase by providing your payment details
          </label>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`payment-method border rounded-md p-4 flex items-center cursor-pointer transition-all duration-200 ${
                  paymentMethod === method.id
                    ? "border-[#dda853] bg-[#dda853] text-white"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handlePaymentMethodSelect(method.id)}
              >
                <LazyImage
                  loading="lazy"
                  src={method.logo}
                  alt={method.name}
                  className="h-6 mr-3"
                />
                <span
                  className={`text-sm font-medium ${
                    paymentMethod === method.id ? "text-white" : "text-gray-800"
                  }`}
                >
                  {method.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
} 