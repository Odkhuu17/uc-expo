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

export const formatDuration = (durationMillis?: number | null) => {
  if (!durationMillis || durationMillis <= 0) {
    return '00:00';
  }

  const totalSeconds = Math.floor(durationMillis / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
};
