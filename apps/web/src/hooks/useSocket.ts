import { useEffect, useState } from "react";

export function useSocket({ token }: { token: string }) {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Token is required");
      setLoading(false);
      return;
    }

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}?token=${token}`
    );

    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError("WebSocket connection failed");
      setLoading(false);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setLoading(true);
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [token]);

  return { socket, loading, error };
}
