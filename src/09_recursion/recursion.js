import isEmpty from 'lodash/fp/isEmpty';
import head from 'lodash/fp/head';
import tail from 'lodash/fp/tail';

export const recursiveSum = (ary) => (
  isEmpty(ary)
    ? 0
    : head(ary) + recursiveSum(tail(ary))
);

export const tailRecursiveSum = (ary, acc = 0) => (
  isEmpty(ary)
    ? acc
    : tailRecursiveSum(tail(ary), acc + head(ary))
);

const fibRecursive = (nth, first = 0, second = 1) =>
  nth === 0
    ? first
    : fibRecursive(--nth, second, first + second);

export const fibonacci = (nth) => fibRecursive(nth);
