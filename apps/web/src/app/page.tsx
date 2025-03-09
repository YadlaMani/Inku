"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
export default function Home() {
  const [roomName, setRoomName] = useState("");
  async function joinRoom() {
    if (roomName === "") {
      toast.error("Room name is required");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/room/roomId`,
        {
          slug: roomName,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_USER_TOKEN}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Room joined successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Room not found");
      console.log(err);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      <h1 className="text-4xl font-bold mb-6">Join a Room</h1>

      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="room-name">Room Name</Label>
          <Input
            id="room-name"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="room-password">Room Password</Label>
          <Input id="room-password" placeholder="Enter room password" />
        </div>

        <Button onClick={joinRoom} className="w-full">
          Join Room
        </Button>
      </div>
    </div>
  );
}
