import { useState } from 'react';

const FileUploader = ({ onFileUpload, isLoading, isDarkMode }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        alert("Please upload a .pdf file.");
        e.target.value = null; 
      }
     
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onFileUpload(file);
    }
  };

  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-300' : 'text-gray-500';
  const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-200';
  const labelBgColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';
  const labelHoverBgColor = isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100';
  const dashedBorderColor = isDarkMode ? 'border-gray-500' : 'border-gray-300';
  const iconColor = isDarkMode ? 'text-gray-500' : 'text-gray-400';
  const selectedFileTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-700';

  return (
    <div className={`${bgColor} p-8 rounded-lg shadow-xl border ${borderColor}`}>
      <h2 className={`text-xl font-semibold text-center mb-1 ${headingColor}`}>Get Started in Minutes</h2>
      <p className={`text-center mb-6 ${textColor}`}>Simply upload your resume and let our AI do the heavy lifting.</p>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed ${dashedBorderColor} rounded-lg cursor-pointer ${labelBgColor} ${labelHoverBgColor} transition-colors`}
        >
        
          <svg className={`w-10 h-10 mb-3 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h.5A5.5 5.5 0 0112 7.5v.1a5.5 5.5 0 015.5 5.4v.1a4 4 0 01-4 4h-.5m-9-4H17"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v6m0 0l-3-3m3 3l3-3"></path></svg>

          <p className={`mb-2 text-sm ${textColor}`}>
            <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Upload your resume (.pdf file)</span>
          </p>
          <p className={`text-xs ${textColor}`}>Drag and drop your PDF file here, or click to browse</p>

          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf" 
          />
        </label>

        {file && (
          <p className={`text-center text-sm mt-4 ${selectedFileTextColor}`}>
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading || !file}
          className={`w-full ${isDarkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'} text-white py-3 rounded-lg mt-6 font-semibold disabled:bg-gray-500 transition-colors`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze File'}
        </button>

      </form>
    </div>
  );
}
export default FileUploader;

