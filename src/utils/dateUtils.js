export const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const isFutureDate = (date) => {
  return new Date(date) > new Date();
}; 