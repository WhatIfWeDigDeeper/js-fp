import { List } from 'immutable-ext';
import Task from 'data.task';
import Spotify from './spotify';
import {
  Pair,
  Sum
} from './monoid';
import unexpected from "./testUtil";

describe('Find the intersection of sets with Semigroups, [1,2,3,4] ^ [3,4,5] = [3,4]', () => {
  const Intersection = xs => ({
    xs,
    concat: ys =>
      Intersection(xs.filter(x => ys.some(y => x === y)))
  });
  const artistIntersection = rels =>
    rels.foldMap(Intersection).xs;

  const artistIntersectionWithBimappedPair = rels =>
    rels.foldMap(x => Pair(Intersection(x), Sum(x.length)))
      .bimap(x => x.xs, y => y.x)
      .toList();

  it('should return intersection of arrays', () => {
    expect(
      Intersection([1,2,3,4]).concat([3,4,5]).xs
    ).toEqual([3,4]);
  });
  it('should use foldMap', () => {
    const names = ['oasis','blur','beatles'];
    const result = List(names)
      .traverse(Task.of, Spotify.related)
      .map(artistIntersection);

    result.fork((err) => {
        expect(
          err
        ).toEqual('should error because of missing api token but does not for some reason');
      }, unexpected);
  });
  it('should use foldMap with Pair for intersection and count', () => {
    const names = ['oasis','blur','beatles'];
    const result = List(names)
      .traverse(Task.of, Spotify.related)
      .map(artistIntersectionWithBimappedPair);

    result.fork((err) => {
        expect(
          err
        ).toEqual('should error because of missing api token but does not for some reason');
      }, unexpected);
  });
});
