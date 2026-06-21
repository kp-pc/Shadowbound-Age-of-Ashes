import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterCreator, CreatedCharacter } from '@/components/game/character-creator';

const CharacterCreatorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleComplete = (character: CreatedCharacter) => {
    // Store the created character in localStorage for later use
    localStorage.setItem('shadowboundCharacter', JSON.stringify(character));
    // After creation, go straight to the story
    navigate('/story');
  };

  return <CharacterCreator onComplete={handleComplete} />;
};

export default CharacterCreatorPage;