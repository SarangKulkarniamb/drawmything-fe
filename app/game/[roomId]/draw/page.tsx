"use client";

import { useEffect, useRef, useState } from "react";
import * as fabric from 'fabric';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle , faSquare } from '@fortawesome/free-solid-svg-icons';
import { 
  Brush,
  Palette,
  Timer,
  Send,
  ArrowRight,
  Circle,
  Square,
  Minus,
  Settings,
  Download,
  Undo,
  Redo,
  RotateCcw,
  Move,
  Eraser
} from 'lucide-react';

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  
  // Drawing state
  const [currentTool, setCurrentTool] = useState<'pencil' | 'rectangle' | 'circle' | 'line' | 'select' | 'eraser'>('pencil');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [timeLeft, setTimeLeft] = useState(60);

  const colors = [
    '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
    '#ffc0cb', '#a52a2a', '#808080', '#90ee90'
  ];

  const brushSizes = [2, 4, 8, 12, 20, 30];
  const prompt = "A cat trying to use a computer";

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      backgroundColor: "#ffffff",
      width: 900,
      height: 600,
    });

    fabricRef.current = canvas;

    // Set up drawing brush
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = currentColor;
    canvas.freeDrawingBrush.width = brushSize;

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricRef.current?.freeDrawingBrush) return;
    fabricRef.current.freeDrawingBrush.color = currentColor;
    fabricRef.current.freeDrawingBrush.width = brushSize;
  }, [currentColor, brushSize]);

  const setTool = (tool: typeof currentTool) => {
    if (!fabricRef.current) return;
    
    setCurrentTool(tool);
    
    switch (tool) {
      case 'pencil':
        fabricRef.current.isDrawingMode = true;
        fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);

        fabricRef.current.freeDrawingBrush.color = currentColor;
        fabricRef.current.freeDrawingBrush.width = brushSize;
        break;
    case 'eraser':
        fabricRef.current.isDrawingMode = true;
        fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);
        setCurrentColor('#ffffff'); 
        fabricRef.current.freeDrawingBrush.color = currentColor; 
        fabricRef.current.freeDrawingBrush.width = brushSize;
        break;
    case 'select':
        fabricRef.current.isDrawingMode = false;
        break;
    default:
        fabricRef.current.isDrawingMode = false;
        break;
    }
  };

  const addRectangleStroke = () => {
    if (!fabricRef.current) return;
    
    const rect = new fabric.Rect({
      left: 80,
      top: 80,
      width: 80,
      height: 80,
      fill: 'transparent',
      stroke: currentColor,
      strokeWidth: brushSize,
    });
    
    fabricRef.current.add(rect);
    fabricRef.current.setActiveObject(rect);
  };
  const addRectangleFilled = () => {
    if (!fabricRef.current) return;
    
    const rect = new fabric.Rect({
      left: 80,
      top: 80,
      width: 80,
      height: 80,
      stroke: currentColor,
      fill: currentColor,
      strokeWidth: brushSize,
    });
    
    fabricRef.current.add(rect);
    fabricRef.current.setActiveObject(rect);
  };

  const addCircleStroke = () => {
    if (!fabricRef.current) return;
    
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: 'transparent',
      stroke: currentColor,
      strokeWidth: brushSize,
    });
    
    fabricRef.current.add(circle);
    fabricRef.current.setActiveObject(circle);
  };
  const addCircleFilled = () => {
    if (!fabricRef.current) return;
    
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: currentColor,
      stroke: currentColor,
      strokeWidth: brushSize,
    });
    
    fabricRef.current.add(circle);
    fabricRef.current.setActiveObject(circle);
  };

  const addLine = () => {
    if (!fabricRef.current) return;
    
    const line = new fabric.Line([50, 100, 200, 100], {
      stroke: currentColor,
      strokeWidth: brushSize,
    });
    
    fabricRef.current.add(line);
    fabricRef.current.setActiveObject(line);
  };

  const clearCanvas = () => {
    if (!fabricRef.current) return;
    fabricRef.current.clear();
    fabricRef.current.backgroundColor = "#ffffff";
    fabricRef.current.renderAll();
  };

  const undo = () => {
    if (!fabricRef.current) return;
    const objects = fabricRef.current.getObjects();
    if (objects.length > 0) {
      fabricRef.current.remove(objects[objects.length - 1]);
    }
  };

  const downloadCanvas = () => {
    /*if (!fabricRef.current) return;
    const dataURL = fabricRef.current.toDataURL({
      format: 'png',
      quality: 1,
    });
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = dataURL;
    link.click();*/
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg flex-shrink-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Brush className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  DrawMyThing
                </span>
              </div>
              <div className="text-gray-400 text-sm">Room: #ABC123</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-red-600/20 border border-red-500/30 rounded-lg px-3 py-1">
                <span className="text-red-400 font-semibold flex items-center text-sm">
                  <Timer className="w-4 h-4 mr-1" />
                  {timeLeft}s
                </span>
              </div>
              
              <div className="text-gray-300 text-sm">Round 1 of 3</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-4 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-full">
          
          {/* Drawing Tools Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg h-full">
              <CardContent className="p-3 h-full overflow-y-auto">
                
                {/* Prompt Display */}
                <div className="mb-4 p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
                  <h3 className="text-sm font-semibold text-white mb-1">Draw This:</h3>
                  <p className="text-blue-300 font-medium text-xs">{prompt}</p>
                </div>

                {/* Main Tools */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center text-sm">
                      <Settings className="w-3 h-3 mr-1" />
                      Tools
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                      <Button
                        variant={currentTool === 'pencil' ? 'default' : 'outline'}
                        size="sm"
                        className={`text-xs p-2 ${currentTool === 'pencil' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`}
                        onClick={() => setTool('pencil')}
                      >
                        <Brush className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={currentTool === 'pencil' ? 'default' : 'outline'}
                        size="sm"
                        className={`text-xs p-2 ${currentTool === 'eraser' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`}
                        onClick={() => setTool('eraser')}
                      >
                        <Eraser className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={currentTool === 'select' ? 'default' : 'outline'}
                        size="sm"
                        className={`text-xs p-2 ${currentTool === 'select' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`}
                        onClick={() => setTool('select')}
                      >
                        <Move className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Shapes */}
                  <div>
                    <h4 className="text-white font-semibold mb-2 text-sm">Shapes</h4>
                    <div className="grid grid-cols-3 gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs p-2"
                        onClick={addRectangleStroke}
                      >
                        <Square className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs p-2"
                        onClick={addRectangleFilled}
                      >
                        <FontAwesomeIcon icon={faSquare} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs p-2"
                        onClick={addCircleStroke}
                      >
                        <Circle className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs p-2"
                        onClick={addCircleFilled}
                      >
                        <FontAwesomeIcon icon={faCircle} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs p-2"
                        onClick={addLine}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-gray-600" />

                  {/* Colors - Compact Grid */}
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center text-sm">
                      <Palette className="w-3 h-3 mr-1" />
                      Colors
                    </h4>
                    <div className="grid grid-cols-7 gap-1">
                      {colors.map((color) => (
                        <button
                          key={color}
                          className={`w-6 h-6 rounded-full border transition-all hover:scale-110 ${
                            currentColor === color ? 'border-white border-2 shadow-lg' : 'border-gray-600'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setCurrentColor(color)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Brush Size */}
                  <div>
                    <h4 className="text-white font-semibold mb-2 text-sm">
                      Size: {brushSize}px
                    </h4>
                    <Slider
                      value={[brushSize]}
                      onValueChange={(value) => setBrushSize(value[0])}
                      max={30}
                      min={1}
                      step={1}
                      className="mb-2"
                    />
                    <div className="grid grid-cols-3 gap-1">
                      {brushSizes.map((size) => (
                        <Button
                          key={size}
                          variant={brushSize === size ? 'default' : 'outline'}
                          size="sm"
                          className={`text-xs p-1 ${brushSize === size ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`}
                          onClick={() => setBrushSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-600" />

                  {/* Actions */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs p-2"
                        onClick={undo}
                      >
                        <Undo className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs p-2"
                        onClick={downloadCanvas}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 text-xs py-2"
                      onClick={clearCanvas}
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Clear
                    </Button>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-sm py-2"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Submit
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-4">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-white text-center flex items-center justify-center">
                  <Palette className="w-4 h-4 mr-2" />
                  Your Canvas
                  
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 h-full">
                <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-lg overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    className="border border-gray-600 rounded"
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