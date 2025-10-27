import { useState } from 'react';
const FileUploader = ({ onFileUpload, isLoading }) => {
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

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-xl font-semibold text-center mb-1">Get Started in Minutes</h2>
      <p className="text-center text-gray-500 mb-6">Simply upload your resume and let our AI do the heavy lifting.</p>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          {/* Upload Icon */}
          <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h.5A5.5 5.5 0 0112 7.5v.1a5.5 5.5 0 015.5 5.4v.1a4 4 0 01-4 4h-.5m-9-4H17"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v6m0 0l-3-3m3 3l3-3"></path></svg>

          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Upload your resume (.pdf file)</span>
          </p>
          <p className="text-xs text-gray-500">Drag and drop your PDF file here, or click to browse</p>

          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf"
          />
        </label>

        {file && (
          <p className="text-center text-sm text-gray-700 mt-4">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading || !file}
          className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Analyze File'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Want to see how it works? <a href="#" onClick={(e) => e.preventDefault()} className="text-green-600 font-medium hover:underline">Try with sample data</a>
        </p>
      </form>
    </div>
  );
}
export default FileUploader;