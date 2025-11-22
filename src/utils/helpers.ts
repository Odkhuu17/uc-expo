import { createNumberMask } from 'react-native-mask-input';

export const moneyFormat = (
  amount: number | string,
  decimalPlaces: number = 0
) => {
  return `${Number(amount)
    .toFixed(decimalPlaces)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}₮`;
};

export const moneyMask = createNumberMask({
  delimiter: ',',
  precision: 0,
});
