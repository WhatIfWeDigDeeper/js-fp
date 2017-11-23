import {
  Box,
  identity,
  join,
  noOp
} from './fpUtil';

describe('You\'ve been using Monads, F.of and F.chain monadic interface', () => {
  describe('first law, join(m.map(join)) == join(join(m))', () => {
    it('should take triple nested value', () => {
      const m = Box(Box(Box(3)));
      const joinMapJoin = join(m.map(join));
      const joinJoin = join(join(m));
      expect(
        joinMapJoin.fold(noOp, identity)
      ).toEqual(joinJoin.fold(noOp, identity));
    });
    it('should be equivalent to join(Box.of) and join(map(Box.of)))', () => {
      const m = Box('wonder');
      const joinBox = join(Box.of(m));
      const joinMap = join(m.map(Box.of));
      expect(
        joinBox.fold(noOp, identity)
      ).toEqual(joinMap.fold(noOp, identity));
    });
  });
});
