"use client";
import React, { useRef, useState, useEffect } from "react";
import rough from "roughjs";
import { Button } from "@/components/ui/button";
import { RoughCanvas } from "roughjs/bin/canvas";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import axios from "axios";

type Shape =
  | { type: "rect"; x: number; y: number; width: number; height: number }
  | { type: "circle"; centerX: number; centerY: number; radius: number };

type currShape = "rect" | "circle";

const CanvasRoom = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rc, setRc] = useState<RoughCanvas | null>(null);
  const [shapeType, setShapeType] = useState<currShape>("rect");
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const roomId = useParams().canvasId;
  const shapesRef = useRef(shapes);

  const [startCoords, setStartCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [previewShape, setPreviewShape] = useState<Shape | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  async function fetchInitialShapes() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/room/shapes/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_USER_TOKEN}`,
        },
      }
    );
    const fetchedShapes = res.data.shapes.map((shape: any) => {
      if (shape.type === "rect") {
        return {
          type: "rect",
          x: shape.data.x,
          y: shape.data.y,
          width: shape.data.width,
          height: shape.data.height,
        };
      } else if (shape.type === "circle") {
        return {
          type: "circle",
          centerX: shape.data.centerX,
          centerY: shape.data.centerY,
          radius: shape.data.radius,
        };
      }
    });
    console.log("Processed shapes:", fetchedShapes);
    setShapes(fetchedShapes);
    shapesRef.current = fetchedShapes;
  }
  useEffect(() => {
    fetchInitialShapes();
    if (rc) redrawCanvas(rc, shapes);
  }, []);

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
    if (!roomId) {
      console.log("No roomId found, not connecting WebSocket");

      return;
    }

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
      const data = JSON.parse(event.data);
      console.log("Received shape data:", data);
      if (data.data) {
        const shape = data.data;
        let newShape: Shape;

        if (shape.type === "rect") {
          newShape = {
            type: "rect",
            x: shape.x,
            y: shape.y,
            width: shape.width,
            height: shape.height,
          };
        } else {
          newShape = {
            type: "circle",
            centerX: shape.centerX,
            centerY: shape.centerY,
            radius: shape.radius,
          };
        }

        setShapes((prevShapes) => {
          const updatedShapes = [...prevShapes, newShape];
          shapesRef.current = updatedShapes;
          return updatedShapes;
        });
        console.log("Shapes after adding:", shapesRef.current);
        if (rc) redrawCanvas(rc, [...shapesRef.current]);
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
  useEffect(() => {
    shapesRef.current = shapes;
  }, [shapes]);
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

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !previewShape) return;
    setIsDrawing(false);

    if (socketRef.current) {
      console.log("Sending shape to socket");
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

        <h1 className="text-white">Room Id :{roomId}</h1>
      </div>
    </div>
  );
};

export default CanvasRoom;
