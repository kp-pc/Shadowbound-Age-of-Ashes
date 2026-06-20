import { useEffect, useState } from 'react';

export const SkipLink = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleFocus = () => setIsVisible(true);
    const handleBlur = () => setIsVisible(false);

    window.addEventListener('focusin', handleFocus);
    window.addEventListener('focusout', handleBlur);

    return () => {
      window.removeEventListener('focusin', handleFocus);
      window.removeEventListener('focusout', handleBlur);
    };
  }, []);

  return (
    <a
      href="#main-content"
      className={`
        absolute top-0 left-0 m-2 p-2 bg-darkFantasy-primary text-darkFantasy-highlight rounded-b-lg
        transition-transform duration-200 z-50
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      Skip to main content
    </a>
  );
};