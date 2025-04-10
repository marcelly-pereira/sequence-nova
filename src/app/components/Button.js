import React, { useState, useRef, useEffect } from 'react';

export const AnimatedExpandingButton = ({ 
  onClick, 
  disabled = false, 
  className = '', 
  text = '',
  icon = null, 
  textColor = 'text-[#0056d6]',
}) => {
  const buttonRef = useRef(null);
  const [expandedWidth, setExpandedWidth] = useState(200);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (buttonRef.current) {
      const textWidth = text.length * 8;
      setExpandedWidth(40 + textWidth + 32);
    }
  }, [text]);

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const defaultIcon = (
    <svg 
      className="w-full h-full fill-white transition-all duration-200 ease-in-out group-hover:fill-[#0056d6] group-focus:fill-[#0056d6] group-hover:rotate-180 group-focus:rotate-180"
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 30 30"
    >
      <g mask="url(#mask0_21_345)">
        <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
      </g>
    </svg>
  );

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      tabIndex={-1}
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      className={`group relative flex items-center ${isHovered ? 'justify-start' : 'justify-center'} bg-[#0056d6] rounded-lg overflow-hidden h-10 transition-all duration-300 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} 
        ${className}
        w-10 hover:w-auto hover:px-3 focus:outline-none active:outline-none focus-visible:outline-none`}
      style={{ 
        width: isHovered ? `${expandedWidth}px` : '40px',
        outline: 'none !important',
        boxShadow: 'none !important',
        WebkitTapHighlightColor: 'transparent',
        border: 'none !important'
      }}
    >
      <div 
        className="absolute top-0 right-0 w-0 h-0 border-solid border-r-white border-t-transparent border-l-transparent border-b-transparent transition-all duration-300 ease-in-out"
        style={{
          borderRightWidth: isHovered ? `${expandedWidth * 2}px` : '14.4px',
          borderBottomWidth: isHovered ? '80px' : '14.4px'
        }}
      ></div>
      
      <div className={`flex items-center justify-center w-5 h-5 z-10 transition-all duration-300 ${isHovered ? 'ml-0' : ''}`}>
        {icon || defaultIcon}
      </div>
      
      <span className={`whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-xs ml-0 group-hover:ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 ${textColor} font-medium text-sm`}>
        {text}
      </span>
    </button>
  );
};

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className = '',
  disabled = false,
  icon = null
}) => {
  const getButtonClasses = () => {
    const baseClasses = "flex items-center justify-center gap-1 rounded-md transition-all duration-200 px-2 py-1 text-sm focus:outline-none active:outline-none focus-visible:outline-none";
    
    const variantClasses = {
      primary: "bg-[#0056d6] hover:opacity-90 text-white",
      secondary: "bg-gray-500 hover:bg-gray-600",
      outline: "border-[1.5px] border-[#0056d6] text-[#0056d6]"
    };
    
    return `${baseClasses} ${variantClasses[variant]} ${className}`;
  };
  
  const handleMouseDown = (e) => {
    e.preventDefault();
  };
  
  return (
    <button
      className={getButtonClasses()}
      type={type}
      onClick={onClick}
      disabled={disabled}
      tabIndex={-1}
      onMouseDown={handleMouseDown}
      style={{ 
        outline: 'none !important',
        boxShadow: 'none !important',
        WebkitTapHighlightColor: 'transparent',
        border: 'none !important'
      }}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;