"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import CreateRoom from "@/components/CreateRoom";

interface Room {
  id: string;
  slug: string;
  createdAt: Date;
}

const Dashboard = () => {
  const [userRooms, setUserRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const isLoggedIn = useAuth();

  async function fetchRooms() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authorization token found");
        return;
      }

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/room`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.success) setUserRooms(res.data.rooms || []);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error("Error fetching rooms");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchRooms();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black gap-5">
        <h1 className="text-2xl font-extrabold">Login to view the dashboard</h1>
        <Button>
          <Link className="font-bold" href="/login">
            Login
          </Link>
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black gap-5">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Your Rooms</h1>
      <CreateRoom />
      {userRooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black gap-5">
          <h1 className="text-xl font-bold">No rooms available</h1>
        </div>
      ) : (
        <ul className="space-y-4">
          {userRooms.map((room) => (
            <li
              key={room.id}
              className="p-4 border rounded-lg shadow-sm bg-white dark:bg-black"
            >
              <h2 className="text-lg font-semibold">{room.slug}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Created At: {new Date(room.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
