"use client";
import React, { useRef, useState, useEffect } from "react";
import rough from "roughjs";
import { Button } from "@/components/ui/button";
import { RoughCanvas } from "roughjs/bin/canvas";
import { toast } from "sonner";

type Shape =
  | { type: "rect"; x: number; y: number; width: number; height: number }
  | { type: "circle"; centerX: number; centerY: number; radius: number };

type currShape = "rect" | "circle";

const CanvasRoom = ({ roomId }: { roomId: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rc, setRc] = useState<RoughCanvas | null>(null);
  const [shapeType, setShapeType] = useState<currShape>("rect");
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoords, setStartCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [previewShape, setPreviewShape] = useState<Shape | null>(null);

  const socketRef = useRef<WebSocket | null>(null);

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
      redrawCanvas(roughCanvas, shapes, previewShape);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [shapes, previewShape]);
  useEffect(() => {
    if (!roomId) return;

    console.log("Connecting to WebSocket for Canvas");

    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}?token=${process.env.NEXT_PUBLIC_TEST_USER_TOKEN}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket Connected for Canvas");
      socket.send(JSON.stringify({ type: "join_room", roomId }));
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "new_shape") {
          setShapes((prevShapes) => [...prevShapes, message.shape]);
        } else if (message.type === "all_shapes") {
          setShapes(message.shapes);
        }
      } catch (err) {
        console.error("Error parsing socket message:", err);
      }
    };

    socket.onerror = (err) => {
      toast.error("WebSocket error");
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      socketRef.current = null;
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "leave_room", roomId }));
        socket.close();
      }
      socketRef.current = null;
    };
  }, [roomId]);
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setStartCoords({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startCoords || !rc) return;

    const width = event.clientX - startCoords.x;
    const height = event.clientY - startCoords.y;
    const newShape: Shape =
      shapeType === "rect"
        ? { type: "rect", x: startCoords.x, y: startCoords.y, width, height }
        : {
            type: "circle",
            centerX: startCoords.x,
            centerY: startCoords.y,
            radius: Math.abs(width),
          };

    setPreviewShape(newShape);
    redrawCanvas(rc, shapes, newShape);
  };

  const handleMouseUp = () => {
    if (!isDrawing || !previewShape) return;
    setIsDrawing(false);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "add_shape",
          roomId,
          previewShape,
        })
      );
    }
    setShapes((prevShapes) => [...prevShapes, previewShape]);
    setPreviewShape(null);
  };

  const redrawCanvas = (
    rc: RoughCanvas,
    shapes: Shape[],
    preview?: Shape | null
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => drawShape(rc, shape));

    if (preview) {
      drawShape(rc, preview, true);
    }
  };

  const drawShape = (rc: RoughCanvas, shape: Shape, isPreview = false) => {
    const options = { stroke: isPreview ? "gray" : "white" };
    if (shape.type === "rect") {
      rc.rectangle(shape.x, shape.y, shape.width, shape.height, options);
    } else if (shape.type === "circle") {
      rc.circle(shape.centerX, shape.centerY, shape.radius * 2, options);
    }
  };

  return (
    <div className="h-full w-full relative">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 bg-black"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={() => setShapeType(shapeType === "rect" ? "circle" : "rect")}
        >
          Switch Shapes
        </Button>
      </div>
    </div>
  );
};

export default CanvasRoom;
