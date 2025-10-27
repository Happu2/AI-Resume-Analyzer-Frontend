import React from 'react';

const FeatureCard = ({ icon, title, description, isDarkMode }) => {
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const titleColor = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const descriptionColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'; // Adjust border color

  return (
    <div className={`p-6 rounded-lg shadow-sm border ${borderColor} ${bgColor} transition-colors duration-200`}>
      <span className="text-2xl" role="img" aria-label="icon">{icon}</span>
      <h3 className={`text-lg font-semibold my-2 ${titleColor}`}>{title}</h3>
      <p className={`text-sm ${descriptionColor}`}>{description}</p>
    </div>
  );
};

export default FeatureCard;
