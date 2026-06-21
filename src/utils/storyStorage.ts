export const STORY_PROGRESS_KEY = "shadowboundStoryProgress";

export const saveStoryProgress = (nodeId: string) => {
  localStorage.setItem(STORY_PROGRESS_KEY, nodeId);
};

export const loadStoryProgress = (): string | null => {
  return localStorage.getItem(STORY_PROGRESS_KEY);
};

export const clearStoryProgress = () => {
  localStorage.removeItem(STORY_PROGRESS_KEY);
};