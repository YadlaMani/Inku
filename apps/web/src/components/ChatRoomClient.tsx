"use client";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Chat {
  id?: number;
  message: string;
  userId?: string;
  roomId?: string;
  createdAt?: string;
}

interface ChatRoomClientProps {
  chats: Chat[];
  roomId: string;
}

const ChatRoomClient = ({
  chats: initialChats,
  roomId,
}: ChatRoomClientProps) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}?token=${process.env.NEXT_PUBLIC_TEST_USER_TOKEN}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "join_room", roomId }));
    };

    socket.onmessage = (event) => {
      try {
        console.log("on message triggered", event.data);
        const parsedData = JSON.parse(event.data);

        if (parsedData.type === "message") {
          setChats((prevChats) => {
            if (
              prevChats.some(
                (chat) =>
                  chat.message === parsedData.message &&
                  chat.userId === parsedData.sender
              )
            ) {
              return prevChats;
            }
            return [
              ...prevChats,
              {
                message: parsedData.message,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                userId: parsedData.sender || "other-user",
              },
            ];
          });
        }
      } catch (error) {
        console.error("Failed to parse message:", event.data);
      }
    };

    socket.onerror = (err) => {
      toast.error("WebSocket error");
      console.error("WebSocket error:", err);
    };

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "leave_room", roomId }));
        socket.close();
      }
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      try {
        socket.send(
          JSON.stringify({
            type: "chat",
            roomId,
            message,
          })
        );

        setMessage("");
      } catch (error) {
        toast.error("Failed to send message");
      }
    } else {
      toast.error("WebSocket not connected or still connecting");
    }
  };

  const isCurrentUser = (userId?: string) =>
    userId === "6d3351ce-826a-4de1-ba30-270dba425647";

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chats.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          chats.map((chat, index) => (
            <div
              key={chat.id || index}
              className={`flex ${isCurrentUser(chat.userId) ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  isCurrentUser(chat.userId)
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted rounded-bl-none"
                }`}
              >
                <p className="break-words">{chat.message}</p>
                {chat.createdAt && (
                  <p
                    className={`text-xs mt-1 ${
                      isCurrentUser(chat.userId)
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatDistanceToNow(new Date(chat.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-border p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={
              !socketRef.current ||
              socketRef.current.readyState !== WebSocket.OPEN
            }
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoomClient;
