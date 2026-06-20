export const saveTimeSpent = (time: number) => {
  const today = new Date().toISOString().split('T')[0];
  const stats = JSON.parse(localStorage.getItem('timePasserStats') || '{}');
  stats[today] = (stats[today] || 0) + time;
  localStorage.setItem('timePasserStats', JSON.stringify(stats));
};

export const saveScore = (gameId: string, score: number) => {
  const stats = JSON.parse(localStorage.getItem('timePasserStats') || '{}');
  stats.scores = stats.scores || {};
  stats.scores[gameId] = score;
  localStorage.setItem('timePasserStats', JSON.stringify(stats));
};

export const loadStats = () => {
  return JSON.parse(localStorage.getItem('timePasserStats') || '{}');
};