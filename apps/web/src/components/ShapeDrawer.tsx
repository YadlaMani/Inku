import React from "react";
import { Circle, RectangleHorizontalIcon, Minus } from "lucide-react";
import { Button } from "./ui/button";
type currShape = "rect" | "circle" | "line";
const ShapeDrawer = ({
  shapeType,
  setShapeType,
}: {
  shapeType: currShape;
  setShapeType: (type: "circle" | "line" | "rect") => void;
}) => {
  return (
    <div className="flex gap-2 bg-white p-2 rounded-lg shadow-md border">
      {[
        { type: "circle", Icon: Circle },
        { type: "line", Icon: Minus },
        { type: "rect", Icon: RectangleHorizontalIcon },
      ].map(({ type, Icon }) => (
        <Button
          key={type}
          onClick={() => setShapeType(type as currShape)}
          className={`flex items-center justify-center p-2 w-10 h-10 rounded-md transition-all 
        ${shapeType === type ? "bg-gray-900 text-white border border-gray-700" : "bg-gray-200 hover:bg-gray-300"}
      `}
        >
          <Icon
            size={24}
            className={`${shapeType === type ? "text-white" : "text-gray-700"}`}
          />
        </Button>
      ))}
    </div>
  );
};

export default ShapeDrawer;
