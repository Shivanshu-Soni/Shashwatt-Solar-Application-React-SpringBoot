import React, { useState } from 'react';
import axios from 'axios';

const FileDownloadComponent = () => {
  const [fileId, setFileId] = useState(null);

  const handleDownload = () => {
    if (fileId) {
      axios({
        url: `http://localhost:8181/downloadFile/${fileId}`,
        method: 'GET',
        responseType: 'blob', // Important! This tells axios to treat the response as a binary blob
      })
      .then((response) => {
        // const contentDisposition = response.headers['content-disposition'];
        // const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        // const matches = filenameRegex.exec(contentDisposition);
        // const filename = matches !== null && matches[1] ? matches[1].replace(/['"]/g, '') : 'downloaded-file';

        // const blob = new Blob([response.data]);
        // const link = document.createElement('a');
        // link.href = window.URL.createObjectURL(blob);
        // link.download = filename;
        // link.click();
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const filename = `downloaded-file.pdf`;

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch((error) => {
        console.error('Download error:', error);
        // Handle download error
      });
    }
  };

  return (
    <div>
      <h2>File Download</h2>
      <input
        type="number"
        placeholder="Enter File ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
      />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default FileDownloadComponent;
