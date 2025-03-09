import React from "react";
import ChatRoomClient from "./ChatRoomClient";
import axios from "axios";
import { getRoomChats } from "@/utils";

const ChatRoom = async ({ id }: { id: string }) => {
  const chats = await getRoomChats(id);
  const parsedChats = JSON.parse(chats);
  const formattedChats = parsedChats.success
    ? parsedChats.chats.map((chat: any) => ({
        id: chat.id,
        message: chat.message,
        userId: chat.userId,
        roomId: chat.roomId,
        createdAt: chat.createdAt,
      }))
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden border border-border">
        <div className="bg-primary p-4">
          <h1 className="text-2xl font-bold text-primary-foreground">
            Chat Room
          </h1>
        </div>

        {parsedChats.success ? (
          <ChatRoomClient chats={formattedChats} roomId={id} />
        ) : (
          <div className="p-8 text-center">
            <p className="text-destructive">
              {parsedChats.message || "Failed to load chat messages"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
