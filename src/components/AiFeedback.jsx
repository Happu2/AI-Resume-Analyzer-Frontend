import React from 'react';
const AiFeedback = ({ job, isDarkMode }) => {
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const secondaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const linkColor = isDarkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'; // Adjust link color too

  return (
    <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
      <h4 className={`font-semibold ${textColor}`}>AI Feedback</h4>
      <p className={`text-sm mt-1 italic ${secondaryTextColor}`}>"{job.reasoning}"</p>

      <h5 className={`font-semibold mt-4 ${textColor}`}>Recommendations to Improve Fit:</h5>
      <ul className={`list-disc list-inside text-sm space-y-1 mt-2 ${secondaryTextColor}`}>
        {job.recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>

      {job.url && (
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block text-white py-2 px-4 rounded-lg mt-4 font-semibold transition-colors ${linkColor}`}
        >
          View & Apply
        </a>
      )}
    </div>
  );
};

export default AiFeedback;

