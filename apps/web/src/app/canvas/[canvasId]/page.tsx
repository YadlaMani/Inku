"use client";
import React, { useRef, useState, useEffect } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import rough from "roughjs";
const page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rc, setRc] = useState<RoughCanvas | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const roughCanvas = rough.canvas(canvas);
    setRc(roughCanvas);
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);
  useEffect(() => {
    if (!canvasRef.current || !rc) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    let isDrawing = false;
    let startX = 0,
      startY = 0;
    canvas.addEventListener("mousedown", (event) => {
      isDrawing = true;
      startX = event.clientX;
      startY = event.clientY;
    });
    canvas.addEventListener("mouseup", (event) => {
      isDrawing = false;
    });
    canvas.addEventListener("mousemove", (event) => {
      if (!isDrawing) return;
      context.clearRect(0, 0, canvas.width, canvas.height);

      rc.rectangle(
        startX,
        startY,
        event.clientX - startX,
        event.clientY - startY,
        {
          stroke: "white",
        }
      );
    });
  });

  return (
    <div className="h-full w-full ">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 bg-black"
      ></canvas>
    </div>
  );
};

export default page;
