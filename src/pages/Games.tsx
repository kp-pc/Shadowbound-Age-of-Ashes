"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Brain, Grid, Sparkles } from 'lucide-react';

function Games() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="border-b border-darkFantasy-border pb-6">
        <h1 className="text-4xl font-gothic text-darkFantasy-highlight">Arcane Trials</h1>
        <p className="text-darkFantasy-accent mt-1">Test your intellect and memory to survive the oppressive void.</p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trivia Card */}
        <Card className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-colors"></div>
          <CardHeader className="p-6">
            <div className="w-12 h-12 bg-darkFantasy-secondary rounded-lg flex items-center justify-center mb-4 text-darkFantasy-highlight border border-darkFantasy-border group-hover:border-darkFantasy-accent transition-colors">
              <Brain className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-gothic text-darkFantasy-highlight group-hover:text-white transition-colors">
              Trivia Night
            </CardTitle>
            <CardDescription className="text-darkFantasy-accent mt-2">
              Prove your knowledge of the arcane, history, and forbidden lore. Answer correctly to earn points and escape the shadows.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Button asChild className="w-full bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-3">
              <Link to="/games/trivia">
                Begin Trial
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Memory Card */}
        <Card className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition-colors"></div>
          <CardHeader className="p-6">
            <div className="w-12 h-12 bg-darkFantasy-secondary rounded-lg flex items-center justify-center mb-4 text-darkFantasy-highlight border border-darkFantasy-border group-hover:border-darkFantasy-accent transition-colors">
              <Grid className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-gothic text-darkFantasy-highlight group-hover:text-white transition-colors">
              Memory Match
            </CardTitle>
            <CardDescription className="text-darkFantasy-accent mt-2">
              Sharpen your mind to survive the void. Match the ancient runes hidden beneath the cards before the darkness consumes them.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Button asChild className="w-full bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-3">
              <Link to="/games/memory">
                Begin Trial
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Games;