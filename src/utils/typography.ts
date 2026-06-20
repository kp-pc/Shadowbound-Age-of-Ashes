import React from 'react';

export const GOTHIC_FONT_FAMILY = [
  "'Gothic Serif', serif",
  "'Dark Fantasy Display', serif"
];

export const applyGothicStyle = (element: React.ReactNode) => {
  return React.createElement('span', { 
    style: { 
      fontFamily: GOTHIC_FONT_FAMILY.join(','), 
      color: '#2A0845' 
    } 
  }, element);
};