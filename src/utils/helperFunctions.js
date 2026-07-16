export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const getProfileStrengthLabel = (strength) => {
  if (strength >= 90) return "Excellent";
  if (strength >= 70) return "Good";
  if (strength >= 40) return "Average";
  return "Poor";
};