export const generateRandomNumberString = length => {
  let result = '';
  const characters = '0123456789';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

export const refactorPrice = data => {
  if (Number.isInteger(Number(data))) {
    return Number(data);
  } else {
    return Number(Number(data).toFixed(2));
  }
};
