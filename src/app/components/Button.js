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
        const baseClasses = "flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 text-white";
        
        const variantClasses = {
            primary: "bg-[#1526ff] hover:opacity-90",
            secondary: "bg-gray-500 hover:bg-gray-600",
            outline: "bg-transparent border border-[#1526ff] text-[#1526ff] hover:bg-blue-50"
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