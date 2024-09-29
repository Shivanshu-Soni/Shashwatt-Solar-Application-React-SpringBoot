import React, { useState } from 'react';
import axios from 'axios';
import { PDFDocument, rgb } from 'pdf-lib';

// const FileUploadComponent = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleFileChange = (event) => {
//     setSelectedFiles([...event.target.files]);
//   };

//   const handleUpload = () => {
//     const formData = new FormData();
//     selectedFiles.forEach((file) => {
//       formData.append('files', file);
//     });

//     axios.post('http://localhost:8181/uploadFiles', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then((response) => {
//       console.log('Upload successful:', response.data);
//       // Do something after successful upload, like updating UI
//     })
//     .catch((error) => {
//       console.error('Upload error:', error);
//       // Handle upload error
//     });
//   };

//   return (
//     <div>
//       <h2>File Upload</h2>
//       <input type="file" multiple onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };
const FileUploadComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
  
    const generateRandomPDF = async () => {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([400, 200]);
  
      page.drawText('Random Text: ' + Math.random(), {
        x: 50,
        y: 150,
        color: rgb(0, 0, 0),
      });
  
      const pdfBytes = await pdfDoc.save();
  
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      return blob;
    };
  
    const handleGeneratePDF = async () => {
      const randomPDFBlob = await generateRandomPDF();
      setSelectedFiles([randomPDFBlob]);
    };
  
    const handleUpload = () => {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
  
      axios
        .post('http://localhost:8181/uploadFiles', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('Upload successful:', response.data);
          // Do something after successful upload, like updating UI
        })
        .catch((error) => {
          console.error('Upload error:', error);
          // Handle upload error
        });
    };
  
    return (
      <div>
        <h2>File Upload</h2>
        <button onClick={handleGeneratePDF}>Generate Random PDF</button>
        {selectedFiles.length > 0 && (
          <div>
            <p>Selected Files:</p>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <button onClick={handleUpload}>Upload</button>
          </div>
        )}
      </div>
    );
  };
export default FileUploadComponent;
