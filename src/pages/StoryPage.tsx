import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryInterface } from '@/components/game/story-interface';

const StoryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    // When the story ends, go back to the dashboard
    navigate('/');
  };

  return <StoryInterface onComplete={handleComplete} />;
};

export default StoryPage;