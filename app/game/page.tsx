"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  async function getRoomID() {
    try {
      const res = await fetch("/api/create-room", { method: "POST" });
      const data = await res.json();
      return data.roomId;
    } catch {
      return null;
    }
  }

  async function handleCreateRoom() {
    try {
      const newRoomId = await getRoomID();
      if (newRoomId) router.push(`/game/${newRoomId}`);
    } catch (err) {
      console.error("Room creation failed", err);
    }
  }

  function handleJoinRoom(roomId: string) {
    if (!roomId) return;
    router.push(`/game/${roomId}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden flex flex-col justify-center items-center">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

      <h1 className="text-xl mb-4">Draw My Thing 🎨</h1>

      <div className="flex w-full max-w-sm items-center gap-2">
        <Button variant="outline" onClick={handleCreateRoom}>
          Create Room
        </Button>
        <Input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <Button variant="outline" onClick={() => handleJoinRoom(roomId)}>
          Join Room
        </Button>
      </div>
    </div>
  );
}
