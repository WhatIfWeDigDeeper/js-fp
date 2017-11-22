import { Box } from './fpUtil';

const moneyToFloatImperative = str =>
  parseFloat(str.replace(/\$/g, ''));

const percentToFloatImperative = str => {
  const replaced = str.replace(/\%/g, '');
  const number = parseFloat(replaced);
  return number * 0.01;
};

export const applyDiscountImperative = (price, discount) => {
  const cost = moneyToFloatImperative(price);
  const savings = percentToFloatImperative(discount);
  return cost - cost * savings;
};

const moneyToFloatBox = str =>
  Box(str.replace(/\$/g, ''))
    .map(r => parseFloat(r));

const percentToFloatBox = str =>
  Box(str.replace(/\%/g, ''))
    .map(r => parseFloat(r))
    .map(n => n * 0.01);

export const applyDiscountBox = (money, discount) => (
  moneyToFloatBox(money)
    .fold(price => percentToFloatBox(discount)
                    .fold(saving => price - price * discount)
    )
);
