export const CHARACTER_KEY = "shadowboundCharacter";

export const saveCharacter = (character: any) => {
  localStorage.setItem(CHARACTER_KEY, JSON.stringify(character));
};

export const loadCharacter = (): any => {
  const data = localStorage.getItem(CHARACTER_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearCharacter = () => {
  localStorage.removeItem(CHARACTER_KEY);
};