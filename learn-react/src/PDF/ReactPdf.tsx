import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Button, Input } from "antd";
import "./Sample.css";
// import pdfjs from 'pdfjs-dist/build/pdf';
import "pdfjs-dist/build/pdf.worker.entry";

import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  TypedArray,
  DocumentInitParameters,
} from "pdfjs-dist/types/src/display/api";
import TextInput from "./TextInput";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 1920;
interface Cords {
  x: number;
  y: number;
}
export default function Sample() {
  const [file, setFile] = useState<File>();
  const [pdfString, setPdfString] = useState<string>();
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState<ArrayBuffer | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [cords, setCords] = useState<Cords>();
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(700);
      //TODO set dynamic width by vw
      // setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  async function onFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const { files } = event.target;

    if (files && files[0]) {
      console.log("files.len: ", files.length);
      setFile(files[0]);
      const buffer = await files[0].arrayBuffer();
      setPdfArrayBuffer(buffer);
      const blob = new Blob([buffer], { type: "application/pdf" });
      const dataUrl = URL.createObjectURL(blob);
      setPdfString(dataUrl);
      const len = await getPDFLength(dataUrl);
      setNumPages(len);
      console.log("number of pages: ", len);
    }
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const addO = async () => {
    console.log(cords);

    if (pdfArrayBuffer && cords && containerWidth) {
      const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const pages = pdfDoc.getPages();
      const page = pages[currentPage];
      const fontSize = 30;
      const { height } = page.getSize();
      const A = 100 / 113.99999999999999;
      const B = 16.625030517578125 * A;
      const C = 100 / -117;
      const D = -918.1110992431641 * C;
      page.drawText("O", {
        x: A * cords.x + B,
        y: C * cords.y + D,

        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      });
      const pdfBytes = await pdfDoc.save();
      setPdfArrayBuffer(pdfBytes);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      //TODO get file name (current placeholder "sample")
      const pdfFile = new File([blob], "sample", { type: "application/pdf" });
      setFile(pdfFile);
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

  async function getPDFLength(pdfUrl: string) {
    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    return numPages;
  }

  const nextPage = () => {
    if (numPages && currentPage < numPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMouseMove = (e: {
    currentTarget: { getBoundingClientRect: () => any };
    clientX: number;
    clientY: number;
  }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCords({ x: x, y: y });
  };

  const onLocationClick = () => {
    console.log(cords);
  };

  const [showTextInput, setShowTextInput] = useState(false);
  const [textInputPosition, setTextInputPosition] = useState({ x: 0, y: 0 });

  const addText = () => {
    if (cords) {
      setShowTextInput(true);
      setTextInputPosition(cords);
    }
  };

  const onTextInputDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setTextInputPosition({ x: e.clientX, y: e.clientY });
  };

  const onTextInputDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowTextInput(false);
    if (cords) {
      setTextInputPosition(cords);
    }
  };

  return (
    <div className="PdfEditor">
      <header>
        <h1 style={{ textAlign: "center" }}>Replace Adobe</h1>
      </header>

      <div className="PdfEditor__container">
        <div className="PdfEditor__container__load">
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>
        {file ? (
          <div className="PdfEditor__container__document" ref={setContainerRef}>
            <Button onClick={addText}>Add Text</Button>
            <Button onClick={downloadPDF}>Download PDF</Button>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
              onClick={addO}
            >
              <Page
                key={`page_${currentPage + 1}`}
                pageNumber={currentPage + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
                onMouseMove={handleMouseMove}
              />
            </Document>
            {showTextInput && (
              <TextInput
                style={{
                  position: "absolute",
                  left: `${textInputPosition.x}px`,
                  top: `${textInputPosition.y}px`,
                }}
                draggable
                onDrag={onTextInputDrag}
                onDrop={onTextInputDrop}
              />
            )}
            <Button onClick={prevPage}>Prevues</Button>
            {currentPage + 1}/{numPages}
            <Button onClick={nextPage}>Next</Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
