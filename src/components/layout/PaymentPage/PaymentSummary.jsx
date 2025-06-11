import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TailwindStyle } from '@/utils/Enum';

// Mock data for different payment types
const paymentTypeData = {
  monthly: {
    name: 'Plus Monthly',
    description: 'Complete multiple courses and get certified in a short time',
    price: 99000,
    currency: 'VND',
    discount: 17.5
  },
  annual: {
    name: 'Plus Annual',
    description: 'Combine flexibility and savings with long-term learning goals',
    price: 1200000,
    currency: 'VND',
    discount: 2
  },
  'per-course': {
    name: 'Course Subscription',
    description: 'Learn a single course and earn a certificate',
    price: 40000,
    currency: 'VND',
    discount: 2
  }
};

export default function PaymentSummary({ paymentType = 'monthly', paymentMethod = '', onPayClick }) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  
  // Get subscription details based on payment type
  const subscriptionDetails = paymentTypeData[paymentType];
  
  // Calculate total after discount
  const discountAmount = isCouponApplied 
    ? (subscriptionDetails.price * couponDiscount) / 100 
    : 0;
  const totalAfterDiscount = subscriptionDetails.price - discountAmount;
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };
  
  const handleRemoveCoupon = () => {
    // Placeholder implementation that allows removing any coupon
    setIsCouponApplied(false);
    setAppliedCoupon('');
    setCouponDiscount(0);
    console.log('Removing coupon');
  };

  const handleApplyCoupon = () => {
    // Placeholder implementation that allows applying any coupon
    if (couponCode.trim() !== '') {
      setIsCouponApplied(true);
      setAppliedCoupon(couponCode);
      
      // Placeholder logic - in the future this would come from database
      // For now, just assign a random discount between 20-80%
      const randomDiscount = Math.floor(Math.random() * 61) + 20;
      setCouponDiscount(randomDiscount);
      
      console.log('Applying coupon:', couponCode, 'with discount:', randomDiscount);
      setCouponCode(''); // Clear input after applying
    }
  };

  // Handle Pay Now button click
  const handlePayNowClick = () => {
    console.log('PaymentSummary: Received payment method:', paymentMethod);
    
    // Check if payment method is selected
    if (!paymentMethod) {
      alert('Please select a payment method before proceeding with payment.');
      return;
    }

    // Create payment data object that would be sent to the server
    const paymentData = {
      paymentType,
      paymentMethod,
      subscriptionName: subscriptionDetails.name,
      originalPrice: subscriptionDetails.price,
      currency: subscriptionDetails.currency,
      appliedCoupon: isCouponApplied ? appliedCoupon : null,
      discountPercentage: isCouponApplied ? couponDiscount : 0,
      discountAmount: discountAmount,
      totalAmount: totalAfterDiscount,
      timestamp: new Date().toISOString()
    };
    
    // Log payment data to console
    console.log('Payment data ready to be sent:', paymentData);
    
    // Call the original onPayClick function if provided
    if (onPayClick) {
      onPayClick(paymentData);
    }
  };

  // Get label based on payment type
  const getSubscriptionLabel = () => {
    switch(paymentType) {
      case 'monthly':
        return 'Monthly Subscription';
      case 'annual':
        return 'Annual Subscription';
      case 'per-course':
        return 'Course Subscription';
      default:
        return 'Subscription';
    }
  };
  
  return (
    <div className="payment-summary-container w-full md:max-w-[669px] flex flex-col items-center gap-[19px] py-5 md:py-[34px] px-4 md:px-[34px] relative shadow-md">
      {/* Background rectangle */}
      <div className="absolute inset-0 bg-[#F3E6D1] border border-[#ECD2AA] rounded-lg"></div>
      
      {/* Content */}
      <div className="z-10 flex flex-col items-center w-full gap-[15px] md:gap-[19px]">
        {/* Subscription/Course Details */}
        <div className="w-full text-center">
          <h3 className="text-[22px] md:text-[28px] font-bold text-black opacity-75 mb-2">{subscriptionDetails.name}</h3>
          <p className="text-[16px] md:text-[18px] leading-[20px] md:leading-[22px] text-[#8F8E8E] mb-3 w-full">{subscriptionDetails.description}</p>
        </div>

        {/* Price Breakdown */}
        <div className="w-full group-8881">
          <div className="border-b border-[#BEBABA] py-4 md:py-6 px-3 md:px-[34px]">
            <div className="flex flex-col space-y-4 md:space-y-5 w-full">
              {/* Subscription row */}
              <div className="flex justify-between items-center w-full">
                <span className="text-[20px] md:text-[24px] leading-[24px] md:leading-[29px] text-black font-normal">{getSubscriptionLabel()}</span>
                <span className="text-[20px] md:text-[24px] leading-[24px] md:leading-[29px] text-black font-medium">{formatCurrency(subscriptionDetails.price)} {subscriptionDetails.currency}</span>
              </div>
              
              {/* Promotion row - only show when coupon applied */}
              {isCouponApplied && (
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <div className="mr-[10px]">
                      <svg viewBox="0 0 24 24" width="20" height="20" md:width="24" md:height="24" fill="#374957">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                      </svg>
                    </div>
                    <span className="text-[20px] md:text-[24px] leading-[24px] md:leading-[29px] text-black font-medium">Promotion</span>
                  </div>
                  <span className="text-[20px] md:text-[24px] leading-[24px] md:leading-[29px] text-black font-medium">-{couponDiscount}%</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Total */}
          <div className="flex justify-between items-center py-3 md:py-4 px-3 md:px-[34px] w-full">
            <span className="text-[20px] md:text-[24px] leading-[24px] md:leading-[29px] text-black font-semibold">Total:</span>
            <span className="text-[20px] md:text-[24px] leading-[24px] md:leading-[29px] text-black font-semibold">{formatCurrency(totalAfterDiscount)} {subscriptionDetails.currency}</span>
          </div>
        </div>

        {/* Applied Coupon - Only show when a coupon is applied */}
        {isCouponApplied && (
          <div className="w-full border border-dashed border-[#8F8E8E] py-2 px-4 flex justify-between items-center mb-2 relative">
            <div className="text-left">
              <p className="text-black text-[16px] md:text-[18px]">
                Applied <span className="font-semibold">{appliedCoupon}</span>
              </p>
              <p className="text-[#8F8E8E] text-[14px] md:text-[16px]">Counpon Art Journey</p>
            </div>
            <button 
              className="absolute right-2 top-2 text-lg"
              onClick={handleRemoveCoupon}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12" stroke="#374957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 4L12 12" stroke="#374957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {/* Discount Code Input */}
        <div className="flex flex-row items-center w-full mb-3 gap-2">
          <div className="border border-[#BEBABA] rounded-lg px-3 py-2 flex-grow h-[45px] md:h-[50px] flex items-center">
            <input 
              type="text" 
              placeholder="Enter discount code" 
              className="w-full bg-transparent text-center text-[#8F8E8E] text-[14px] md:text-[16px] outline-none"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyCoupon();
                }
              }}
            />
          </div>
          <Link to="/"
            onClick={(e) => {
              e.preventDefault();
              handleApplyCoupon();
            }}
            className={`inline-block px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg font-semibold ${TailwindStyle.HIGHLIGHT_FRAME}`}
          >
            Apply
          </Link>
        </div>

        {/* Pay button */}
        <button 
          className="mt-2 w-[50%] md:w-[40%] bg-[#ECD2AA] text-[#5F5E5E] font-bold text-[18px] md:text-[20px] py-3 rounded-[6px] flex items-center justify-center transition-colors duration-300 ease-in-out hover:bg-[#DDA853] hover:text-white cursor-pointer"
          //onClick={onPayClick}
          onClick={handlePayNowClick}
        >
          PAY NOW
        </button>
      </div>
    </div>
  );
} 