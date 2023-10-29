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

type PDFFile = File;

export default function Sample() {
  const [file, setFile] = useState<PDFFile>();
  const [pdfString, setPdfString] = useState<string>();
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState<ArrayBuffer | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>();
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(800);
      //TODO set dynamic width by vw
      //   setContainerWidth(entry.contentRect.width);
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
    if (currentPage && numPages && currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="PdfEditor">
      <header>
        <h1>react-pdf sample page</h1>
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
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={
                    containerWidth
                      ? Math.min(containerWidth, maxWidth)
                      : maxWidth
                  }
                />
              ))}
            </Document>
            <Button>Prevues</Button>
            {currentPage ? `${currentPage + 1}` : ""}
            <Button>Next</Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
