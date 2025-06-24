
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { HeaderMenuDesktop , HeaderMenuMobile } from '@/components/Menu';
import { 
  Palette, 
  Users, 
  MessageSquare, 
  Zap, 
  Star, 
  Play, 
  Sparkles,
  ArrowRight,
  Brush,
  Timer,
  Trophy,
  Menu, X
} from 'lucide-react';
import Link from 'next/link';

export default  function Home() {
  

  const gameSteps = [
    { icon: Brush, title: "Draw", description: "Create your masterpiece", color: "text-blue-400" },
    { icon: MessageSquare, title: "Guess", description: "Interpret the drawing", color: "text-green-400" },
    { icon: Users, title: "Pass", description: "Share with others", color: "text-purple-400" },
    { icon: Trophy, title: "Reveal", description: "See the hilarious results", color: "text-yellow-400" }
  ];

  const features = [
    {
      icon: Palette,
      title: "Creative Drawing Tools",
      description: "Professional drawing tools with multiple brush sizes, colors, and effects to bring your imagination to life.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Multiplayer Rooms",
      description: "Create private rooms for friends or join public games with players from around the world.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Timer,
      title: "Timed Challenges",
      description: "Fast-paced rounds keep the energy high and the laughs coming with customizable time limits.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Sparkles,
      title: "Hilarious Results",
      description: "Watch as your simple drawing transforms into something completely unexpected through the chain.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Artist",
      content: "This is the most fun I've had with an online game in years! The drawing tools are surprisingly good.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Streamer",
      content: "Perfect for content creation. My audience loves when we play this together!",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Teacher",
      content: "Great for team building activities. Even my students who don't usually draw love it.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
                  <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Brush className="w-6 h-6 text-white" />
                </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DrawMyThing
              </span>
            </div>

            {/* Desktop Menu */}
            <HeaderMenuDesktop>
            </HeaderMenuDesktop>
            <HeaderMenuMobile></HeaderMenuMobile>
          </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="transition-all duration-1000 translate-y-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Draw. Guess. Laugh.
            <br />
            <span className="text-white">Repeat.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate drawing telephone game where your masterpiece becomes someone else's puzzle. 
            Create hilarious chains of drawings and guesses with friends or strangers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              
              <Link className='flex items-center' href={"/game"}><Play className="w-5 h-5 mr-2" />Start Playing Now</Link>
              
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-semibold rounded-xl">
              <Users className="w-5 h-5 mr-2" />
              Create Private Room
            </Button>
          </div>
        </div>

        
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Simple rules, endless fun. Watch your drawing transform through the chain of creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {gameSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-lg transition-all duration-500 hover:scale-105 ">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center justify-center mx-auto mb-4">
                    <Icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                  <div className="mt-4 text-sm text-gray-400">Step {index + 1}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need for the perfect drawing game experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-lg hover:bg-gray-800/70 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            What Players Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of players who are already having a blast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-lg hover:bg-gray-800/70 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur-lg">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Start Drawing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of players in the most creative and hilarious drawing game ever created. 
              No downloads required - start playing instantly in your browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Play className="w-6 h-6 mr-2" />
                Play Now - It's Free!
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-12 py-4 text-xl font-semibold rounded-xl">
                <Users className="w-6 h-6 mr-2" />
                Invite Friends
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-12 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Brush className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DrawChain
              </span>
            </div>
            <p className="text-gray-400">
              The ultimate drawing telephone game for creative minds and endless laughter.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Game</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">How to Play</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rules</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tips & Tricks</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reddit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bug Reports</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 DrawChain. All rights reserved. Made with ❤️ for creative minds.</p>
        </div>
      </footer>
    </div>
  );
}