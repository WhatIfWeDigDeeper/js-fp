import { List } from 'immutable-ext';
import compose from 'lodash/fp/compose';
import {
  fromNullable,
  identity,
  noOp
} from "./fpUtil";
import {
  All,
  First,
  Fn,
  Left,
  Right,
  Sum
} from './monoid';

describe('09: A currated collection of monoids and their uses', () => {
  it('should sum non-null values', () => {
    const stats = List.of(
      {page: 'Home', views: 40},
      {page: 'About', views: 10},
      {page: 'Blog', views: 4}
    );
    const result = stats.foldMap(x =>
      fromNullable(x.views)
        .map(Sum), Right(Sum(0))
    );
    expect(
      result.fold(noOp, identity).x
    ).toEqual(54);
  });

  it('should return null if any null values', () => {
    const statsWithNull = List.of(
      {page: 'Home', views: 40},
      {page: 'About', views: 10},
      {page: 'Blog', views: null}
    );
    const result = statsWithNull.foldMap(x => fromNullable(x.views)
      .map(Sum), Right(Sum(0)));
    expect(
      result.fold(identity)
    ).toEqual(null);
  });
  it('should find first', () => {
    const findFirst = (xs, pred) =>
      List(xs)
        .foldMap(x => First(pred(x) ? Right(x) : Left()), First.empty())
        .fold(x => x);
    const result = findFirst([3,4,5,6,7], x => x > 4);
    expect(
      result.fold(noOp, identity)
    ).toEqual(Right(5).fold(noOp, identity));
  });
  it('should filter out words with vowels', () => {
    const hasVowels = x => !!x.match(/[aeiou]/iu);
    const longWord = x => x.length >= 5;
    const both = Fn(compose(All, hasVowels))
      .concat(Fn(compose(All, longWord)));

    expect(
      ['gym', 'bird', 'lilac']
        .filter(x => both.fold(x).x)
    ).toContain('lilac');
  });
});


























