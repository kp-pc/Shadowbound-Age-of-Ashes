import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sword, Shield, FlaskConical, BookOpen, Backpack, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'consumable' | 'quest' | 'misc';
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

const DEFAULT_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    name: 'Shadow Dagger',
    type: 'weapon',
    description: 'A blade that seems to absorb the light around it.',
    rarity: 'rare'
  },
  {
    id: '2',
    name: 'Obsidian Plate',
    type: 'armor',
    description: 'Heavy armor forged from volcanic glass.',
    rarity: 'epic'
  }
];

const RARITY_COLORS = {
  common: 'text-gray-400',
  uncommon: 'text-green-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'text-yellow-400'
};

const ICON_MAP: Record<string, React.ReactNode> = {
  weapon: <Sword className="w-6 h-6" />,
  armor: <Shield className="w-6 h-6" />,
  consumable: <FlaskConical className="w-6 h-6" />,
  quest: <BookOpen className="w-6 h-6" />,
  misc: <Sparkles className="w-6 h-6" />
};

export const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const loadInventory = () => {
      const stored = localStorage.getItem('shadowboundInventory');
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        localStorage.setItem('shadowboundInventory', JSON.stringify(DEFAULT_INVENTORY));
        setItems(DEFAULT_INVENTORY);
      }
    };

    loadInventory();
    // Listen for custom events to update inventory in real-time
    window.addEventListener('inventoryUpdated', loadInventory);
    return () => window.removeEventListener('inventoryUpdated', loadInventory);
  }, []);

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Backpack className="text-darkFantasy-highlight" />
        <h2 className="text-2xl font-gothic text-darkFantasy-highlight">Inventory</h2>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-darkFantasy-accent italic text-center py-4">Your backpack is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map(item => (
            <Card 
              key={item.id} 
              className="bg-darkFantasy-secondary border-darkFantasy-border hover:border-darkFantasy-accent transition-colors"
            >
              <CardContent className="p-4 flex items-start space-x-4">
                <div className={cn(
                  "p-3 rounded-lg bg-darkFantasy-primary text-darkFantasy-highlight",
                  item.rarity === 'legendary' && "ring-2 ring-yellow-400/50"
                )}>
                  {ICON_MAP[item.type] || <Sparkles className="w-6 h-6" />}
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
      )}
    </div>
  );
};