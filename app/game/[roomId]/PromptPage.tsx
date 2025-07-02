"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brush,
  Send,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
type PromptPageProps = {
  socket: WebSocket|null;
  roomId?: string|undefined;
  round?: number;
};
export default function PromptPage({socket, roomId, round}: PromptPageProps) {
  const [prompt, setPrompt] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  

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
            
            <div className="text-gray-300">Round {round} of 3</div>
            
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Prompt Card */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg mb-8">
            <CardHeader className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Create Your Prompt
              </CardTitle>
              <p className="text-gray-300 text-lg">
                Write something creative and fun for the next player to draw!
              </p>
            </CardHeader>
            {!hasSubmitted ? (<CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Your Creative Prompt
                  </label>
                  <Textarea
                    placeholder="Enter your creative prompt here... (e.g., 'A penguin teaching yoga to flamingos')"
                    value={prompt}
                    onChange={(e:any) => setPrompt(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 text-lg min-h-[120px] resize-none"
                    maxLength={150}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-400">
                      Be creative! The funnier, the better.
                    </span>
                    <span className="text-sm text-gray-400">
                      {prompt.length}/150
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 text-lg"
                  disabled={prompt.trim().length < 5
                    || hasSubmitted}
                  onClick={() => {
                    if (prompt.trim().length >= 5) {
                      setHasSubmitted(true);
                      socket?.send(JSON.stringify({
                        type: 'submission',
                        data: { roomId:roomId, content:prompt }
                      }));
                      console.log('Prompt submitted:', prompt);
                    }
                  }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Prompt
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent> ):  
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-white text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                    Prompt Submitted!
                    </h3>
                    <div className=" rounded-lg p-4 mb-6 w-full">
                        <p className="text-gray-300 text-sm mb-2">Your prompt:</p>
                        <p className="text-white font-semibold text-lg">"{prompt}"</p>
                    </div>
                    <p className="text-gray-300 mb-6">
                    Waiting for other players...
                    </p>
                    
                </div>
                }
            
          </Card>
        </div>
      </div>
    </div>
  );
}