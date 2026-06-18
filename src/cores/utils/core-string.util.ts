export const maskStringValue = (value: string, limit = 4) => {
  if (!value) return '';
  return 'x'.repeat(value.length - limit) + value.slice(-limit);
};

export const showHiddenString = (value: string, maxNumber: number) => {
  if (!value) return '';
  let stringValue = '';
  for (let i = 0; i < maxNumber; i++) {
    stringValue += 'x';
  }
  return stringValue + value.slice(-4);
};
