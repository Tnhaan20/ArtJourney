import React from 'react';

/**
 * A reusable completed checkbox component
 * @param {Object} props - Component props
 * @param {boolean} props.isCompleted - Whether the item is completed
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.size - Size of the checkbox in pixels (default: 20)
 * @returns {JSX.Element} - Rendered component
 */
export default function CompletedBox({ isCompleted, className = "", size = 20 }) {
  return (
    <div 
      className={`rounded-full flex items-center justify-center ${
        isCompleted ? 'bg-green-500' : 'border border-gray-300 bg-white'
      } ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {isCompleted && (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="text-white"
          style={{ width: `${size * 0.6}px`, height: `${size * 0.6}px` }}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      )}
    </div>
  );
}