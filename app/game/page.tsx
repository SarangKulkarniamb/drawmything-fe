"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Brush,
  Eye,
  Gamepad2,
  Laugh,
  MessageSquare,
  Palette,
  Plus,
  Sparkles,
  Timer,
  Trophy,
  UserPlus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

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
    const newRoomId = await getRoomID();
    if (newRoomId) router.push(`/game/${newRoomId}`);
  }

  function handleJoinRoom() {
    if (!roomId) return;
    router.push(`/game/${roomId}`);
  }

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
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Brush className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  DrawMyThing
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Play?
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Create a new room or join your friends in an existing game
            </p>
          </div>

          {/* Create / Join Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Create Room */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg hover:bg-gray-800/70 transition-all duration-300 group">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Plus className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Create New Room</h2>
                <p className="text-gray-300 mb-8">
                  Start a new game and invite your friends to join the fun
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 text-lg"
                  onClick={handleCreateRoom}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Room
                </Button>
              </CardContent>
            </Card>

            {/* Join Room */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg hover:bg-gray-800/70 transition-all duration-300 group">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <UserPlus className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Join Room</h2>
                <p className="text-gray-300 mb-8">
                  Enter a room code to join an existing game
                </p>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter Room Code"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 text-center text-xl font-mono tracking-widest py-4"
                    
                  />
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 text-lg"
                    onClick={handleJoinRoom}
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Join Room
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How to Play Section */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-white mb-2">
                How to Play DrawMyThing
              </CardTitle>
              <p className="text-center text-gray-300 text-lg">
                The hilarious drawing telephone game that gets funnier with every round
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {[
                  {
                    step: 1,
                    title: "Give a custom prompt",
                    desc: "Write a quirky sentence",
                    icon: Sparkles,
                    color: "from-yellow-500 to-orange-500",
                  },
                  {
                    step: 2,
                    title: "Draw It",
                    desc: "Use the drawing tools to illustrate the prompt you received",
                    icon: Palette,
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    step: 3,
                    title: "Others Guess",
                    desc: "Players try to guess what you've drawn",
                    icon: MessageSquare,
                    color: "from-blue-500 to-purple-500",
                  },
                  {
                    step: 4,
                    title: "See Results",
                    desc: "Laugh at the hilarious interpretations!",
                    icon: Laugh,
                    color: "from-pink-500 to-red-500",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.step} className="text-center">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-sm font-bold text-purple-400 mb-2">STEP {item.step}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Game Rules */}
              <div className="bg-gray-800/50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                  Game Rules & Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
                      <Timer className="w-5 h-5 mr-2" />
                      Drawing Phase
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• You have 60 seconds to draw your masterpiece</li>
                      <li>• Use different brush sizes and colors</li>
                      <li>• No letters, numbers, or symbols allowed</li>
                      <li>• Keep it simple - others need to guess it!</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      Guessing Phase
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Type your guesses for the drawings you receive</li>
                      <li>• Think outside the box - be creative!</li>
                      <li>• Watch the drawing evolve in real-time</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Pro Tips for Maximum Fun
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>• Draw quickly but clearly</div>
                    <div>• Use the whole canvas space</div>
                    <div>• Start with basic shapes</div>
                    <div>• Add details if you have time</div>
                    <div>• Don't overthink your guesses</div>
                    <div>• Have fun with wild interpretations!</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
