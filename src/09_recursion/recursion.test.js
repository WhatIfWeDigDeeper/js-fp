import { recursiveSum, tailRecursiveSum } from './recursion';

describe('recursion v. tail recursion', () => {

  it('should sum an array with normal recursion', () => {
    const ary = [10, 20, 30, 40];
    expect(
      recursiveSum(ary)
    ).toBe(100);
  });

  it('should sum an array with tail recursion', () => {
    const ary = [10, 20, 30, 40];
    expect(
      tailRecursiveSum(ary)
    ).toBe(100);
  });

});


