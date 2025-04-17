import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PaymentForm from '../../components/layout/PaymentPage/PaymentForm';
import PaymentSummary from '../../components/layout/PaymentPage/PaymentSummary';
import SelectedCourse from '../../components/layout/PaymentPage/SelectedCourse';

export default function PaymentPage() {
  const { paymentType: urlPaymentType } = useParams();
  const [paymentType, setPaymentType] = useState(urlPaymentType || 'monthly');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  useEffect(() => {
    if (urlPaymentType && urlPaymentType !== paymentType) {
      setPaymentType(urlPaymentType);
    }
  }, [urlPaymentType, paymentType]);

  const handlePaymentMethodChange = (method) => {
    console.log('Parent received payment method:', method);
    setSelectedPaymentMethod(method);
  };

  const handlePayment = (paymentData) => {
    console.log('Payment initiated with data:', paymentData);
    
    // Additional validation handled in PaymentSummary component
    alert(`Payment processed successfully!\nPayment Method: ${selectedPaymentMethod}\nAmount: ${paymentData?.totalAmount || 'N/A'}`);
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="payment-page-container max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Main Payment Details Block */} 
        <div className="payment-details-main-block mb-8 sm:mb-12">
          {/* Header with centered title and description */}
          <div className="mt-6 sm:mt-10 mb-6 sm:mb-8"> 
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Payment Details</h2>
          </div>
          
          {/* Flex Layout for Two-Column Structure that stacks on mobile */}
          <div className="payment-page-wrapper flex flex-col md:flex-row md:justify-between gap-6 md:gap-8">
            {/* Left Column: Payment Form */}
            <div className="payment-form-section w-full md:w-[45%] order-2 md:order-1">
              <PaymentForm 
                paymentType={paymentType} 
                onPaymentMethodSelect={handlePaymentMethodChange}
              />
            </div>
            
            {/* Right Column: Payment Summary */}
            <div className="payment-summary-section w-full md:w-[50%] order-1 md:order-2">
              <PaymentSummary 
                paymentType={paymentType} 
                paymentMethod={selectedPaymentMethod}
                onPayClick={handlePayment}
              />
            </div>
          </div>
        </div>
        
        {/* Selected Course Section (if needed) */}
        <div className="selected-course-section">
          <SelectedCourse paymentType={paymentType} />
        </div>
      </div>
    </div>
  );
} 