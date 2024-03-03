import React from 'react';

const AutoDownloadButton = () => {
  const handleDownload = () => {
    // Create a sample text file
    const content = 'This is the content of the file.';
    const blob = new Blob([content], { type: 'text/plain' });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'example.txt';

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload}>
      Auto Download File
    </button>
  );
};

export default AutoDownloadButton;
