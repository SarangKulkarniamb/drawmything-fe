
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext<WebSocket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const connect = async () => {
      const res = await fetch("/api/ws-token");
      const { token } = await res.json();
      const ws = new WebSocket(`ws://localhost:3001?token=${token}`);
      setSocket(ws);
    };
    connect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
