import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scroll, Sword, Shield, FlaskConical, BookOpen, Backpack } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'consumable' | 'quest' | 'misc';
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: React.ReactNode;
}

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    name: 'Shadow Dagger',
    type: 'weapon',
    description: 'A blade that seems to absorb the light around it.',
    rarity: 'rare',
    icon: <Sword className="w-6 h-6" />
  },
  {
    id: '2',
    name: 'Obsidian Plate',
    type: 'armor',
    description: 'Heavy armor forged from volcanic glass.',
    rarity: 'epic',
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: '3',
    name: 'Void Essence',
    type: 'consumable',
    description: 'A swirling liquid that restores mana.',
    rarity: 'uncommon',
    icon: <FlaskConical className="w-6 h-6" />
  },
  {
    id: '4',
    name: 'Ancient Tome',
    type: 'quest',
    description: 'A book containing forbidden knowledge.',
    rarity: 'legendary',
    icon: <BookOpen className="w-6 h-6" />
  }
];

const RARITY_COLORS = {
  common: 'text-gray-400',
  uncommon: 'text-green-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'text-yellow-400'
};

export const Inventory: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Backpack className="text-darkFantasy-highlight" />
        <h2 className="text-2xl font-gothic text-darkFantasy-highlight">Inventory</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_INVENTORY.map(item => (
          <Card 
            key={item.id} 
            className="bg-darkFantasy-secondary border-darkFantasy-border hover:border-darkFantasy-accent transition-colors"
          >
            <CardContent className="p-4 flex items-start space-x-4">
              <div className={cn(
                "p-3 rounded-lg bg-darkFantasy-primary text-darkFantasy-highlight",
                item.rarity === 'legendary' && "ring-2 ring-yellow-400/50"
              )}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white truncate">{item.name}</h3>
                  <span className={cn("text-[10px] uppercase font-bold", RARITY_COLORS[item.rarity])}>
                    {item.rarity}
                  </span>
                </div>
                <p className="text-xs text-darkFantasy-accent mt-1">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};