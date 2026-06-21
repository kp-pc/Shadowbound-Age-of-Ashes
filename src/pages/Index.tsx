import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sword, BookOpen, Trophy, Sparkles, Shield, Crown } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-darkFantasy-primary text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-darkFantasy-primary to-darkFantasy-secondary">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-gothic text-darkFantasy-highlight mb-4 animate-pulse">
              Dark Fantasy
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Rise of the Shadowbound
            </h2>
            <p className="text-xl md:text-2xl text-darkFantasy-accent max-w-3xl mx-auto mb-8">
              Forge your destiny in a world of oppressive shadows and forbidden magic
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <Link to="/games">
              <Button size="lg" className="bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic text-lg px-8 py-4">
                <Trophy className="mr-2" /> Play Games
              </Button>
            </Link>
            <Link to="/settings">
              <Button size="lg" variant="outline" className="border-darkFantasy-highlight text-darkFantasy-highlight hover:bg-darkFantasy-highlight hover:text-white font-gothic text-lg px-8 py-4">
                <Shield className="mr-2" /> Configure
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-darkFantasy-secondary">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-gothic text-darkFantasy-highlight text-center mb-16">
            Your Dark Journey Awaits
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <Card className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-darkFantasy-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sword className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-darkFantasy-highlight font-gothic">Character Forging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-darkFantasy-secondary text-center">
                  Create unique dark heroes with specialized classes like Shadowblade, Arcanist, and Bloodknight
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-darkFantasy-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-darkFantasy-highlight font-gothic">Branching Narrative</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-darkFantasy-secondary text-center">
                  Experience choice-driven storytelling where every decision leads to different paths and endings
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-darkFantasy-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-darkFantasy-highlight font-gothic">Arcane Mini-Games</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-darkFantasy-secondary text-center">
                  Test your wit and memory with themed challenges like Trivia Night and Memory Match
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-darkFantasy-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-darkFantasy-highlight font-gothic">Soul Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-darkFantasy-secondary text-center">
                  Track your journey through the shadows with time spent and archived game scores
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-darkFantasy-secondary to-darkFantasy-primary">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-darkFantasy-primary/50 backdrop-blur-sm rounded-2xl p-12 border border-darkFantasy-border">
            <Sparkles className="w-16 h-16 text-darkFantasy-highlight mx-auto mb-6 animate-pulse" />
            <h3 className="text-4xl font-gothic text-darkFantasy-highlight mb-6">
              Ready to Embrace the Darkness?
            </h3>
            <p className="text-xl text-darkFantasy-secondary mb-8">
              Begin your journey into the shadow realm. Choose your path and forge your legend.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link to="/games">
                <Button size="lg" className="bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic text-lg px-10 py-4">
                  Start Playing Now
                </Button>
              </Link>
              <Link to="/settings">
                <Button size="lg" variant="outline" className="border-darkFantasy-highlight text-darkFantasy-highlight hover:bg-darkFantasy-highlight hover:text-white font-gothic text-lg px-10 py-4">
                  Configure Your Experience
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;