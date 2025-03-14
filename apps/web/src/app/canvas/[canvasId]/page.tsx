"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import rough from "roughjs";
import { Button } from "@/components/ui/button";
import { RoughCanvas } from "roughjs/bin/canvas";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import axios from "axios";
import { Circle, PencilLineIcon, RectangleHorizontalIcon } from "lucide-react";

type Shape =
  | { type: "rect"; x: number; y: number; width: number; height: number }
  | { type: "circle"; centerX: number; centerY: number; radius: number }
  | { type: "line"; x1: number; y1: number; x2: number; y2: number };

type currShape = "rect" | "circle" | "line";

const CanvasRoom = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rcRef = useRef<RoughCanvas | null>(null);
  const [shapeType, setShapeType] = useState<currShape>("rect");
  const [shapes, setShapes] = useState<Shape[]>([]);
  const shapesRef = useRef<Shape[]>([]);
  const isDrawingRef = useRef(false);
  const startCoordsRef = useRef<{ x: number; y: number } | null>(null);
  const previewShapeRef = useRef<Shape | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const roomId = useParams().canvasId;

  useEffect(() => {
    const fetchInitialShapes = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/room/shapes/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_USER_TOKEN}`,
            },
          }
        );

        const fetchedShapes = res.data.shapes
          .map((shape: any) => {
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
            } else if (shape.type === "line") {
              return {
                type: "line",
                x1: shape.data.x1,
                y1: shape.data.y1,
                x2: shape.data.x2,
                y2: shape.data.y2,
              };
            }
            return null;
          })
          .filter(Boolean);

        setShapes(fetchedShapes);
        shapesRef.current = fetchedShapes;
        redrawCanvas();
      } catch (error) {
        console.error("Failed to fetch shapes:", error);
        toast.error("Failed to load canvas data");
      }
    };

    fetchInitialShapes();
  }, [roomId]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const roughCanvas = rough.canvas(canvas);
    rcRef.current = roughCanvas;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redrawCanvas();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (roomId) {
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
          } else if (shape.type === "circle") {
            newShape = {
              type: "circle",
              centerX: shape.centerX,
              centerY: shape.centerY,
              radius: shape.radius,
            };
          } else if (shape.type === "line") {
            newShape = {
              type: "line",
              x1: shape.x1,
              y1: shape.y1,
              x2: shape.x2,
              y2: shape.y2,
            };
          } else {
            newShape = {
              type: "rect",
              x: shape.x,
              y: shape.y,
              width: shape.width,
              height: shape.height,
            };
          }

          shapesRef.current = [...shapesRef.current, newShape];
          setShapes([...shapesRef.current]);
          redrawCanvas();
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
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: "leave_room", roomId }));
        socketRef.current.close();
      }
      socketRef.current = null;
    };
  }, [roomId]);

  useEffect(() => {
    shapesRef.current = shapes;
  }, [shapes]);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const rc = rcRef.current;
    if (!canvas || !rc) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    shapesRef.current.forEach((shape) => drawShape(rc, shape));

    if (previewShapeRef.current) {
      drawShape(rc, previewShapeRef.current, true);
    }
  }, []);

  const drawShape = (rc: RoughCanvas, shape: Shape, isPreview = false) => {
    const options = {
      stroke: isPreview ? "gray" : "white",
      strokeWidth: 2,
      roughness: 1,
    };

    if (shape.type === "rect") {
      rc.rectangle(shape.x, shape.y, shape.width, shape.height, options);
    } else if (shape.type === "circle") {
      rc.circle(shape.centerX, shape.centerY, shape.radius * 2, options);
    } else if (shape.type === "line") {
      rc.line(shape.x1, shape.y1, shape.x2, shape.y2, options);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    startCoordsRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !startCoordsRef.current || !rcRef.current)
      return;

    const width = event.clientX - startCoordsRef.current.x;
    const height = event.clientY - startCoordsRef.current.y;

    if (shapeType === "rect") {
      previewShapeRef.current = {
        type: "rect",
        x: startCoordsRef.current.x,
        y: startCoordsRef.current.y,
        width,
        height,
      };
    } else if (shapeType === "circle") {
      previewShapeRef.current = {
        type: "circle",
        centerX: startCoordsRef.current.x,
        centerY: startCoordsRef.current.y,
        radius: Math.abs(width),
      };
    } else if (shapeType === "line") {
      previewShapeRef.current = {
        type: "line",
        x1: startCoordsRef.current.x,
        y1: startCoordsRef.current.y,
        x2: event.clientX,
        y2: event.clientY,
      };
    }

    redrawCanvas();
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !previewShapeRef.current) return;

    isDrawingRef.current = false;

    const newShapes = [...shapesRef.current, previewShapeRef.current];
    shapesRef.current = newShapes;
    setShapes(newShapes);

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "add_shape",
          roomId,
          previewShape: previewShapeRef.current,
        })
      );
    }

    previewShapeRef.current = null;
    redrawCanvas();
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
        <div>
          <Button
            className={`${shapeType === "circle" ? "bg-white" : ""}`}
            onClick={() => setShapeType("circle")}
          >
            <Circle size={24} />
          </Button>
          <Button
            className={`${shapeType === "line" ? "bg-white" : ""}`}
            onClick={() => setShapeType("line")}
          >
            <PencilLineIcon size={24} />
          </Button>
          <Button
            className={`${shapeType === "rect" ? "bg-white text-black" : ""}`}
            onClick={() => setShapeType("rect")}
          >
            <RectangleHorizontalIcon size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CanvasRoom;
