"use client";
import React, { useState, useEffect } from "react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

interface Room {
  id: string;
  slug: string;
  createdAt: string;
}

const CanvasRoom = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const slugParam = searchParams.get("slug");
    setSlug(slugParam);

    if (slugParam) {
      fetchRoomDetails(slugParam);
    }
  }, []);

  async function fetchRoomDetails(slug: string) {
    try {
      console.log(slug);
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/room/${slug}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (res.data.success) {
        setRoom(res.data.room);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching room details");
    }
  }

  return (
    <div>
      {room ? (
        <div>
          <h1 className="text-2xl font-bold text-center">Room Details</h1>
          <p>Room ID: {room.id}</p>
          <p>Room Slug: {room.slug}</p>
          <p>Room Created At: {room.createdAt}</p>
          <Button>
            <Link href={`/canvas/${room.id}`}>Join Room</Link>
          </Button>
        </div>
      ) : (
        <div>
          <h1>Room not found</h1>
          <Button>
            <Link href="/dashboard">Create your own</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CanvasRoom;
