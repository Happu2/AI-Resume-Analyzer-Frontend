import { useState } from 'react';
import axios from 'axios';
import FileUploader from './components/FileUploader';
import JobResults from './components/JobResults';
import FeatureCard from './components/FeatureCard';
import DarkModeToggle from './components/DarkModeToggle'; 


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

 
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
 

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('resume', file); 

    try {
      const response = await axios.post(`${API_URL}/resume/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error('Server error. Please try again.');
      }

      setAnalysisResult(response.data);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'An unknown error occurred. Is the backend server running?');
    } finally {
      setIsLoading(false);
    }
  };

  const mainBg = isDarkMode ? 'bg-gray-900' : 'bg-gray-50'; // Darker background for dark mode
  const mainTextColor = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const secondaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
   
    <div className={`min-h-screen flex flex-col items-center py-12 px-4 font-sans antialiased ${mainBg} ${mainTextColor} transition-colors duration-200`}>
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <header className="text-center mb-10 max-w-4xl mx-auto">
        <div className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full mb-4 ${isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'}`}>
          + Professional Resume Optimization
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
          Transform Your Resume with AI-Powered Insights
        </h1>
        <p className={`text-lg mt-4 ${secondaryTextColor}`}>
          Upload your resume (.pdf file) and instantly generate a professionally formatted template. Our advanced AI analyzes your content and provides actionable improvements to make your resume stand out.
        </p>
      </header>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          icon="✨"
          title="Advanced AI Analysis"
          description="Multi-metric analysis with specific improvement suggestions and scoring."
          isDarkMode={isDarkMode}
        />
        <FeatureCard
          icon="📄"
          title="Professional Templates"
          description="Clean designs proven to pass ATS systems and impress recruiters."
          isDarkMode={isDarkMode}
        />
        <FeatureCard
          icon="⬇️"
          title="Multi-Format Export"
          description="Export your new resume in PDF."
          isDarkMode={isDarkMode}
        />
      </div>

      <main className="w-full max-w-3xl">
        {!analysisResult && (
          <FileUploader onFileUpload={handleFileUpload} isLoading={isLoading} isDarkMode={isDarkMode}/>
        )}

        {isLoading && (
          <div className="text-center p-8">
            <p className={`text-lg font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              Analyzing your resume... This may take a moment.
            </p>
            <p className={`${secondaryTextColor}`}>Our AI is generating your personalized feedback.</p>
          </div>
        )}

        {error && (
          <div className={`text-center p-6 border rounded-lg ${isDarkMode ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-300 text-red-700'}`}>
            <p className="font-bold text-lg">An Error Occurred</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        {analysisResult && (
          <>
            <JobResults jobs={analysisResult.matchedJobs} isDarkMode={isDarkMode} />
            <button
              onClick={() => {
                setAnalysisResult(null);
                setError(null);
              }}
              className={`w-full text-white py-3 rounded-lg mt-6 font-semibold transition-colors ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Analyze Another Resume
            </button>
          </>
        )}
      </main>
    </div>
  );
}

