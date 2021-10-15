export const symbols = (name) => {
  if (name === 'USD') {
    return '$';
  }
  if (name === 'VND') {
    return '₫';
  }
  if (name === 'GBP') {
    return '£';
  }
  return '';
};
