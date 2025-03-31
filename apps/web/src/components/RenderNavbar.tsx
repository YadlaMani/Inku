"use client";
import { usePathname } from "next/navigation";
import { Appbar } from "./Appbar";

const RenderNavbar = () => {
  const pathname = usePathname();
  const hideAppbar = pathname.startsWith("/canvas/");

  return <div className="flex flex-col">{!hideAppbar && <Appbar />}</div>;
};

export default RenderNavbar;
