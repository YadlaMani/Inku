"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";

import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";
const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  async function createRoom() {
    try {
      if (!roomName) return;
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/room/create`,
        {
          name: roomName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setRoomName("");
        setIsDialogOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);

      toast.error("Failed to create room. Please try again.");
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Create a room to start drawing with your friends.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="slug" className="sr-only">
              Name
            </Label>
            <Input
              id="slug"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            disabled={!roomName}
            onClick={createRoom}
          >
            Create Room
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
