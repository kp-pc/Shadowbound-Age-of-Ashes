export const GOTHIC_FONT_FAMILY = [
  "'Gothic Serif', serif",
  "'Dark Fantasy Display', serif"
];

export const applyGothicStyle = (element: React.ReactNode) => {
  return <span style={{ fontFamily: GOTHIC_FONT_FAMILY, color: "#2A0845" }}>{element}</span>;
};

// Add more utilities as needed
