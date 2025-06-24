"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@/app/context/socketContext";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brush, 
  Eraser, 
  Palette, 
  Undo, 
  Redo, 
  Download, 
  Users, 
  Send,
  Settings,
  Timer,
  Crown,
  MessageSquare,
  Trash2,
  RotateCcw,LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
type Player = {
  id: string;
  name: string;
  avatar?: string;
};

export default function RoomPage() {
  const router = useRouter();
  const socket = useSocket();
  const session = useSession();
  const { roomId } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerId, setPlayerId] = useState<string>("");
  const [hostId, setHostId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const handleLeaveRoom = () => {
    if (!socket || typeof roomId !== "string") return;

    socket.send(JSON.stringify({ type: "leave_room", data: { roomId } }));
    setPlayers([]);
    setPlayerId("");
    setHostId("");
    router.push('/game'); 
  };
  
  useEffect(() => {
    if (!session || session.status !== "authenticated") {
      router.push('/');
      return;
    }
    if (!socket || typeof roomId !== "string") return;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "join_room", data: { roomId } }));
    };

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);

      if (msg.type === "player_list") {
        setPlayers(msg.data);
      }

      if (msg.type === "joined_room") {
        setPlayerId(msg.data.playerId);
        setHostId(msg.data.hostId);
      }

      if (msg.type === "error") {
        setError(msg.data.msg);
      }
    };
  }, [socket, roomId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Brush className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  DrawMyThing
                </span>
              </div>
              <div className="text-gray-400">Room: {roomId}</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-4 py-2">
                <Timer className="w-5 h-5 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">60s</span>
              </div>
              
              <div className="bg-green-600/20 border border-green-500/30 rounded-lg px-4 py-2">
                <span className="text-green-400 font-semibold">Draw: BUTTERFLY</span>
              </div>
              
              <Button onClick={handleLeaveRoom} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <LogOut className="w-4 h-4 mr-2" />
                Leave Room
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          
          {/* Players Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg h-full">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Players ({players.length}/8)
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {players.map((player) => (
                    <div key={player.id} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                      <Image
                        src={player.avatar || "/default-avatar.png"}
                        alt={player.name}
                        width={40}
                        height={40}
                        className="rounded-full border border-gray-600"
                      ></Image>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{player.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  Start Game
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg h-full">
              <CardContent className="p-4 h-full flex flex-col">
                
                {/* Drawing Tools */}
                <div className="flex items-center justify-between mb-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {/* Tool Selection */}
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Brush className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Eraser className="w-4 h-4" />
                      </Button>
                    </div>
                    
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Undo className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Redo className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 bg-white rounded-lg overflow-hidden">
                  <canvas
                    width={800}
                    height={600}
                    className="w-full h-full cursor-crosshair"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          
        </div>
      </div>
    </div>
  );
}
