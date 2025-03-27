import React from 'react';

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
        const baseClasses = "flex items-center justify-center gap-2 rounded-md transition-all duration-200";
        
        const variantClasses = {
            primary: "bg-[#1526ff] hover:opacity-90 text-white",
            secondary: "bg-gray-500 hover:bg-gray-600",
            outline: "border-[1.5px] border-[#1526ff] text-[#1526ff] hover:bg-blue-50 font-bold"
        };
        
        return `${baseClasses} ${variantClasses[variant]} ${className}`;
    };
    
    return (
        <button
            className={getButtonClasses()}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
            {icon}
        </button>
    );
};

export default Button;