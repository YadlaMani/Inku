import React from "react";
import ChatRoom from "@/components/ChatRoom";
const page = async ({
  params,
}: {
  params: {
    roomId: string;
  };
}) => {
  const roomId = params.roomId;
  return (
    <div>
      <h1>{roomId}</h1>
      <ChatRoom id={roomId} />
    </div>
  );
};

export default page;
