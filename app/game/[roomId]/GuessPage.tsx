"use client";

import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Brush, Send, Timer, Eye, MessageSquare, ArrowRight, Lightbulb, Users } from 'lucide-react';

type GuessPageProps = {
  socket: WebSocket | null;
  roomId?: string | undefined;
  round?: number;
  gameData?: string | undefined;
};

export default function GuessPage({ socket, roomId, round, gameData }: GuessPageProps) {
  const [guess, setGuess] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [canvasError, setCanvasError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !gameData) return;

    try {
      const canvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: '#4b5563',
        selection: false,
        preserveObjectStacking: true,
        width: 800,
        height: 600,
      });

      fabricRef.current = canvas;

      const json = JSON.parse(gameData);
      canvas.loadFromJSON(json, () => {
        canvas.renderAll();

        requestAnimationFrame(() => {
          if (containerRef.current) {
            canvas.setDimensions({
              width: containerRef.current.clientWidth,
              height: containerRef.current.clientHeight,
            });
          }
        });
      });

      return () => {
        fabricRef.current?.dispose();
        fabricRef.current = null;
      };
    } catch (error) {
      console.error('Error loading canvas:', error);
      setCanvasError('Failed to load the drawing. Please try again.');
    }
  }, [gameData]);

  useEffect(() => {
    const handleResize = () => {
      if (fabricRef.current && containerRef.current) {
        fabricRef.current.setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = () => {
    if (guess.trim() && !hasSubmitted) {
      setHasSubmitted(true);
      socket?.send(
        JSON.stringify({
          type: 'submission',
          data: { roomId, content: guess },
        })
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !hasSubmitted) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

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
              <div className="text-gray-400">Room: #{roomId ?? '---'}</div>
            </div>
            <div className="flex items-center space-x-4">
              
              <div className="text-gray-300">Round {round}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white text-center flex items-center justify-center">
                  <Eye className="w-5 h-5 mr-2" />
                  What do you think this is?
                </CardTitle>
                <p className="text-gray-300 text-center">
                  Look carefully at the drawing and make your best guess!
                </p>
              </CardHeader>
              <CardContent className="p-4 h-full">
                <div
                  ref={containerRef}
                  className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center"
                  style={{ minHeight: '500px' }}
                >
                  {canvasError ? (
                    <div className="text-center p-4 text-red-400">
                      <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{canvasError}</p>
                    </div>
                  ) : gameData ? (
                    <canvas ref={canvasRef} className="rounded-lg w-full h-full" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Drawing will appear here</p>
                      <p className="text-sm">Waiting for artist's input...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                    Your Turn to Guess!
                  </h3>
                  <p className="text-purple-300 text-sm">
                    Study the drawing carefully and write what you think it represents.
                  </p>
                </div>

                {!hasSubmitted ? (
                  <div className="space-y-4 flex-1">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        What do you think this drawing shows?
                      </label>
                      <Input
                        placeholder="Enter your guess here..."
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 text-lg py-3"
                        maxLength={100}
                        autoFocus
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-400">
                          Be creative with your interpretation!
                        </span>
                        <span className="text-sm text-gray-400">
                          {guess.length}/100
                        </span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 text-lg"
                      onClick={handleSubmit}
                      disabled={guess.trim().length < 2}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Submit Guess
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Guess Submitted!</h3>
                    <div className="bg-gray-700/50 rounded-lg p-4 mb-6 w-full">
                      <p className="text-gray-300 text-sm mb-2">Your guess:</p>
                      <p className="text-white font-semibold text-lg">"{guess}"</p>
                    </div>
                    <p className="text-gray-300 mb-6">
                      Waiting for other players to finish guessing...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
