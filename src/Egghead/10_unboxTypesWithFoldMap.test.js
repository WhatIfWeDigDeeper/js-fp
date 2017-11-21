import { List } from 'immutable-ext';
import { Sum } from './monoid';

describe('Unbox types with foldMap', () => {
  it('should sum 3 values', () => {
    const result = List.of(
      Sum(1), Sum(2), Sum(3))
      .fold(Sum.empty());
    console.log(result);
    expect(
      result.x
    ).toBe(6);
  });
});

