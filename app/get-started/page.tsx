"use client";

import { useEffect, useState } from "react";

export default function GetStartedPage() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const connect = async () => {
      const res = await fetch("/api/ws-token");
      const data = await res.json();
      setToken(data.token);

      const socket = new WebSocket(`ws://localhost:3001?token=${data.token}`);

      socket.onopen = () => setStatus("✅ Connected to WebSocket");
      socket.onmessage = (e) => console.log("Server:", e.data);
      socket.onerror = (e) => setStatus("❌ WebSocket error");
      socket.onclose = () => setStatus("🔌 Disconnected");
    };

    connect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      <h2 className="text-xl mb-4">WebSocket Status</h2>
      <p className="mb-2">{status}</p>
      <p className="text-xs break-words max-w-md">{token}</p>
    </div>
  );
}
