import React from 'react';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb } from 'pdf-lib';

const Generator = () =>{
const PdfGenerator = async () => {

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);

  page.drawText('Hello, this is a PDF page!', {
    x: 50,
    y: 750,
    size: 24,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  saveAs(blob, 'output.pdf');

};
// const App = () => {
  return (
    <div>
      <h1>PDF Generation in React</h1>
      <button onClick={PdfGenerator}>Generate PDF</button>
    </div>
  );

};

export default Generator;
