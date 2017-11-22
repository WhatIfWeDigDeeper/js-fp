import { List } from 'immutable';
import {
  Box,
  identity,
  noOp,
  Right
} from './fpUtil';

describe('14: You\'ve been using Functors', () => {
  describe('first law of functors, fx.map(f).map(g) == fx.map(x => g(f(x)))', () => {
    it('should be the same when mapping twice, f(x), g(x) as calling g(f(x))', () => {
      const result1 = Box('squirrels')
        .map(s => s.substr(5))
        .map(s => s.toUpperCase());
      const result2 = Box('squirrels')
        .map(s => s.substr(5).toUpperCase());
      expect(
        result1.fold(identity)
      ).toEqual(result2.fold(identity));
    });
    it('should be true for every functor when mapping twice, f(x), g(x) as calling g(f(x))', () => {
      const mapTwice = Right('squirrels')
        .map(s => s.substr(5))
        .map(s => s.toUpperCase());
      const mapOnceFnTwice = Right('squirrels')
        .map(s => s.substr(5).toUpperCase());
      expect(
        mapTwice.fold(noOp, identity)
      ).toEqual(mapOnceFnTwice.fold(noOp, identity));
    });
  });
  describe('second law of functors: fx.map(identity) == identity(fx)', () => {
    it('should be the same when calling map identity as calling identity functor', () => {
      const result1 = Box('crayons').map(identity);
      const result2 = identity(Box('crayons'));
      expect(
        result1.fold(identity)
      ).toEqual(result2.fold(identity));
    });
    it('should be the same when calling map identity as calling identity functor', () => {
      const result1 = List.of('crayons').map(identity);
      const result2 = identity(List.of('crayons'));
      expect(
        result1
      ).toEqual(result2);
    });
  });

});
