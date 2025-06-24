"use client";

import { SocketProvider } from "../../context/socketContext"

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <SocketProvider>
      {children}
    </SocketProvider>
  );
}
