import { List } from 'immutable-ext';
import { Sum } from './monoid';

describe('10: Unbox types with foldMap', () => {
  it('should use reduce and concat', () => {
    const result = [Sum(1), Sum(2), Sum(3)]
      .reduce((acc, x) => acc.concat(x), Sum.empty());
    expect(
      result.x
    ).toEqual(6);
  });
  it('should sum 3 values using fold', () => {
    const result = List.of(
      Sum(1), Sum(2), Sum(3))
      .fold(Sum.empty());
    expect(
      result.x
    ).toEqual(6);
  });
  it('should map and fold', () => {
    const result = List.of(1,2,3)
      .map(Sum)
      .fold(Sum.empty());
    expect(
      result.x
    ).toEqual(6);
  });
  it('should use foldMap, like mapReduce', () => {
    const result = List.of(1,2,3)
      .foldMap(Sum, Sum.empty());
    expect(
      result.x
    ).toEqual(6);
  });
});

