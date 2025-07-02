"use client";
import { use, useEffect, useState } from "react";
import { useSocket } from "@/app/context/socketContext";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { 
  Clock,
  Brush, 
  Users, 
  Send,
  MessageSquare,
  Trash2,
  RotateCcw,LogOut,Crown
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import PromptPage from "./PromptPage";
import GuessPage from "./GuessPage";
import DrawPage from "./DrawPage";
type Player = {
  id: string;
  name: string;
  avatar?: string;
};

export default function RoomPage() {
  const [gamePhase , setgamePhase] = useState<string>("waiting");
  const [gameData, setGameData] = useState<string>("");
  const [round, setRound] = useState<number>(1);
  const router = useRouter();
  const socket = useSocket();
  const session = useSession();

  const params = useParams(); 
  const rawRoomId = params.roomId;
  const roomId = Array.isArray(rawRoomId) ? rawRoomId[0] : rawRoomId;

  const [players, setPlayers] = useState<Player[]>([]);
  const [playerId, setPlayerId] = useState<string>("");
  const [hostId, setHostId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{playerName:string , playerAvatar:string , playerId: string; message: string }[]>([]);
  const handleLeaveRoom = () => {
    if (!socket || typeof roomId !== "string") return;

    socket.send(JSON.stringify({ type: "leave_room", data: { roomId } }));
    setPlayers([]);
    setPlayerId("");
    setHostId("");
    router.push('/game'); 
  };
  const startGameHandler = () => {
    if (!socket || typeof roomId !== "string") return;

    socket.send(JSON.stringify({ type: "start_game", data: { roomId } }));
  };
  
  useEffect(() => {
    
    if (!socket || typeof roomId !== "string") return;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "join_room", data: { roomId } }));
    };

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "player_list") {
        setPlayers(msg.data);
        setHostId(msg.hostId);
      }
      if (msg.type === "joined_room") {
        setPlayerId(msg.data.playerId);
      }
      if (msg.type === "error") {
        setError(msg.data.msg);
      }
      if(msg.type === "chat") {
        setChatMessages(prev => [...prev, {playerAvatar : msg.data.playerAvatar, playerId: msg.data.playerId, playerName : msg.data.playerName, message: msg.data.message }]);
        console.log("Chat message received:", msg.data);
      }
      if(msg.type === "game_phase") {
        setgamePhase(msg.data.phase);
        setRound(msg.data.round);
        console.log("Game phase updated:", msg.data.phase);
      }
      if(msg.type === "game_content") {
        setGameData(msg.data.content);
        console.log("Game data received:", msg.data.content);
      }
    };
  }, [socket, roomId]);

  return (<>
      {
      gamePhase=== "waiting" ?
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
                            <span className="flex gap-4 text-white font-medium">{player.name} {player.id == hostId ? <Crown className="text-yellow-500"/>  : ""}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {session.data?.userId ==  hostId && (
                  <Button onClick={startGameHandler} className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Start Game
                  </Button>)}
                </CardContent>
              </Card>
            </div>

            {/* Waiting Area */}
            <div className="lg:col-span-2 " >
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg h-full">
                <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center">
                  
                  {/* Waiting Animation */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-8 animate-pulse">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <Clock className="w-10 h-10 text-white animate-spin" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-4">
                    Waiting for Admin to Start
                  </h2>
                  
                  <p className="text-xl text-gray-300 mb-8 max-w-md">
                    The game will begin once the room admin starts the session. Get ready to draw and guess!
                  </p>

                  <div className="mt-8 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-300 text-sm">
                      💡 <strong>Tip:</strong> While you wait, think of some creative prompts to suggest when it's your turn!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Chat Area */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg h-full">
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Chat
                    </h3>
                  </div>

                  {/* Chat Messages */}
                  <div className="max-h-156 flex-1 overflow-y-auto space-y-3 mb-4">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className="p-3 rounded-lg bg-gray-700/50">
                        <div className="flex items-center space-x-2 mb-1">
                          <Image
                            src={msg.playerAvatar || "/default-avatar.png"}
                            alt="avatar"
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span className="flex gap-4 text-white font-medium">{msg.playerName} {msg.playerId == hostId ? <Crown className="text-yellow-500 text-sm"/>  : ""}</span>
                        </div>
                        <p className="text-white text-md">{msg.message}</p>
                      </div>
                    ))}
                    
                  </div>

                  {/* Chat Input */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!socket || !newMessage.trim()) return;

                      socket.send(JSON.stringify({
                        type: "chat_message",
                        data: {
                          roomId,
                          message: newMessage
                        }
                      }));
                      setNewMessage("");
                    }}
                    className="flex space-x-2"
                  >
                    <Input
                      placeholder="Say something..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    />
                    <Button 
                      type="submit" 
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>

                </CardContent>
              </Card>
            </div>

            
          </div>
        </div>
      </div> : 
      gamePhase === "prompt" ?
      <PromptPage socket={socket} roomId={roomId} round={round} />:
      gamePhase === "guess" ?
      <GuessPage  socket={socket} roomId={roomId} round={round} gameData={gameData}  />:
      gamePhase === "draw" ?
      <DrawPage socket={socket} roomId={roomId} round={round} gameData={gameData}></DrawPage>:
      
      <div>RESULTS</div>
    }
  </>
    
  );
}
