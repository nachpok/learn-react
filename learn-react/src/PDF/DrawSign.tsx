import React, { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";
import { Button } from "antd";

interface DrawSignProps {
  onSign: (sign: string) => void;
}

function DrawSign({ onSign }: DrawSignProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let signaturePad: SignaturePad | null = null;

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
        signaturePad = new SignaturePad(canvas, {
          minWidth: 0.5,
          maxWidth: 0.5,
        });
      }
    }
  }, []);
  //TODO i cant resign, on second run signaturePad does not exist
  const clear = () => {
    if (!signaturePad) {
      throw Error("DrawSign.clear - No signaturePad");
    }
    signaturePad?.clear();
  };
  const save = () => {
    if (!signaturePad) {
      throw Error("DrawSign.save - No signaturePad");
    }
    console.log("DrawSign.save.signaturePad: ", signaturePad);
    const sign = signaturePad.toSVG();
    onSign(sign);
    console.log("DrawSign.save.sign: ", sign);
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
