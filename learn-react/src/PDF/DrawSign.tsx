import React, { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";
import { Button } from "antd";

interface DrawSignProps {
  onSign: (sign: string) => void;
}

function DrawSign({ onSign }: DrawSignProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let signaturePadRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.style.width = `${canvas.width}px`;
      canvas.style.height = `${canvas.height}px`;
      canvas.width = canvas.width * ratio;
      canvas.height = canvas.height * ratio;
      const context = canvas.getContext("2d");
      if (context !== null) {
        context.scale(ratio, ratio);
        signaturePadRef.current = new SignaturePad(canvas, {
          minWidth: 0.5,
          maxWidth: 0.5,
        });
      }
    }
  }, []);
  //TODO i cant re-sign, on second run signaturePad does not exist
  const clear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    } else {
      throw Error("DrawSign.clear - No signaturePad");
    }
  };
  const save = () => {
    if (signaturePadRef.current) {
      const sign = signaturePadRef.current.toSVG();
      onSign(sign);
      signaturePadRef.current.clear();
    } else {
      throw Error("DrawSign.save - No signaturePad");
    }
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid black",
          backgroundColor: "white",
          marginBottom: "10px",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "200px",
        }}
      >
        <Button onClick={save}>Save</Button>
        <Button onClick={clear}>Clear</Button>
      </div>
    </div>
  );
}

export default DrawSign;
