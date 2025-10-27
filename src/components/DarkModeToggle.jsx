import React from 'react';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
          : 'bg-gray-700 text-white hover:bg-gray-600'
      }`}
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
