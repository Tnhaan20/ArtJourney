import { useState } from "react";

/**
 * Custom Input component with floating label
 * @param {Object} props - Component props
 * @param {string} props.type - Input type (text, email, password, tel, etc.)
 * @param {string} props.name - Input name attribute
 * @param {string} props.label - Label text
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler function
 * @param {boolean} props.required - Whether the input is required
 * @param {string} props.className - Additional class names
 * @param {Object} props.rest - Any other props to pass to the input
 */
export default function Input({
  type = "text",
  name,
  label,
  value,
  onChange,
  required = false,
  className = "",
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(false);
  
  // Handle focus state
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false);
    }
  };

  return (
    <div className={`relative pt-5 w-full ${className}`}>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        placeholder=" "
        className={`
          w-full 
          border-b-2 
          border-secondary-black
          bg-transparent 
          py-2 
          text-primary-black
          outline-none 
          transition-all 
          duration-200
          placeholder:text-transparent
          focus:border-b-3
          focus:border-primary-yellow
          focus:font-medium
        `}
        {...rest}
      />
      <label
        htmlFor={name}
        className={`
          pointer-events-none 
          absolute 
          left-0 
          transition-all 
          duration-200
          ${
            isFocused || value
              ? "top-0 text-sm font-medium text-primary-yellow"
              : "top-5 text-base text-secondary-black"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
}