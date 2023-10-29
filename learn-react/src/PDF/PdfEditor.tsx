import React, { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Button, Input } from "antd";

//--
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
//--
function PdfEditor() {
  const [pdfString, setPdfString] = useState<string>();
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState<ArrayBuffer | null>(
    null
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const buffer = await file.arrayBuffer();
      setPdfArrayBuffer(buffer);
      const blob = new Blob([buffer], { type: "application/pdf" });
      const dataUrl = URL.createObjectURL(blob);
      setPdfString(dataUrl);
    }
  };

  const addText = async () => {
    if (pdfArrayBuffer) {
      const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const fontSize = 30;
      const { height } = firstPage.getSize();
      firstPage.drawText("Some Text!", {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      });
      const pdfBytes = await pdfDoc.save();
      setPdfArrayBuffer(pdfBytes);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const dataUrl = URL.createObjectURL(blob);
      setPdfString(dataUrl);
    }
  };

  const addPage = async () => {
    if (pdfArrayBuffer) {
      const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const page = pdfDoc.addPage();
      const fontSize = 30;
      const { height } = page.getSize();
      page.drawText("New Page!!!", {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      });
      const pdfBytes = await pdfDoc.save();
      setPdfArrayBuffer(pdfBytes);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const dataUrl = URL.createObjectURL(blob);
      setPdfString(dataUrl);
    }
  };

  const removePage = async () => {
    if (pdfArrayBuffer) {
      const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
      await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const pagesLen = pdfDoc.getPages().length - 1;
      pdfDoc.removePage(pagesLen);

      const pdfBytes = await pdfDoc.save();
      setPdfArrayBuffer(pdfBytes);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const dataUrl = URL.createObjectURL(blob);
      setPdfString(dataUrl);
    }
  };

  const downloadPDF = () => {
    const a = document.createElement("a");
    if (a && pdfString) {
      a.href = pdfString;
      a.download = "uploaded.pdf";
      a.click();
    }
  };

  const iframeStyle = {
    width: "595px",
    height: "842px",
    border: "3px solid #ccc",
  };

  return (
    <div>
      <Input type="file" accept=".pdf" onChange={handleFileUpload} />
      <Button onClick={addText}>Add Text</Button>
      <Button onClick={addPage}>Add Page to end</Button>
      <Button onClick={removePage}>Remove page from end</Button>
      <Button onClick={downloadPDF}>Download PDF</Button>

      {pdfString ? (
        <>
          <iframe id="iframe" style={iframeStyle} src={pdfString}></iframe>
        </>
      ) : (
        <>
          <p>No PDF</p>
        </>
      )}
    </div>
  );
}

export default PdfEditor;

// async function createPdf() {
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([350, 400]);
//   page.moveTo(110, 200);
//   page.drawText("Hello World!");
//   const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
//   setPdfString(pdfDataUri);
// }
