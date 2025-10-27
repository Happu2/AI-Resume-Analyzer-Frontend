import { useState } from 'react';
import AiFeedback from "./AiFeedback";
const JobResults = ({ jobs, isDarkMode }) => {
  const [expandedJobId, setExpandedJobId] = useState(jobs && jobs.length > 0 ? jobs[0].id : null);

  const toggleJob = (id) => {
    setExpandedJobId(prevId => (prevId === id ? null : id));
  };

  const componentBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const componentTextColor = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const componentBorder = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`w-full p-6 md:p-8 rounded-lg shadow-xl border ${componentBorder} ${componentBg} transition-colors duration-200`}>

      <h2 className={`text-2xl font-bold mb-6 text-center ${componentTextColor}`}>Your Top Job Matches</h2>

      {jobs.length === 0 ? (
        <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No matching jobs were found in our database for your resume.
          Try updating your resume with more specific keywords!
        </p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => {
            const isExpanded = expandedJobId === job.id;

            
            const itemBgColor = isExpanded
                ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') 
                : (isDarkMode ? 'bg-gray-800' : 'bg-white');
            const itemTextColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
            const itemSecondaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
            const itemScoreColor = isDarkMode ? 'text-green-400' : 'text-green-600';
            const itemBorderColor = isDarkMode ? 'border-gray-600' : 'border-gray-200';

            return (
              <div
                key={job.id}
                className={`p-4 border ${itemBorderColor} rounded-lg shadow-sm transition-colors duration-200 ${itemBgColor}`}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleJob(job.id)}
                >
                  <div className="flex-1 pr-4">
                    <h3 className={`font-bold text-lg ${itemTextColor}`}>{job.title}</h3>
                    <p className={`${itemSecondaryTextColor}`}>{job.company} - {job.location}</p>
                  </div>
                  <div className="text-center pl-4">
                    <span className={`text-2xl font-bold ${itemScoreColor}`}>{job.fitScore}%</span>
                    <p className={`text-sm ${itemSecondaryTextColor}`}>Fit Score</p>
                  </div>
                  <svg
                    className={`w-5 h-5 ml-2 transition-transform ${itemSecondaryTextColor} ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>

                {isExpanded && (
                  <AiFeedback job={job} isDarkMode={isDarkMode} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default JobResults;

