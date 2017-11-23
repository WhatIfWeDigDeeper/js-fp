import {
  Box,
  identity
} from './fpUtil';

describe('18: Applicative Functors for multiple arguments', () => {
  const add = x => y => x + y;
  const liftA2 = (f, fx, fy) => fx.map(f).apply(fy);
  const liftA3 = (f, fx, fy, fz) => fx.map(f).apply(fy).apply(fz);

  it('should apply function to value', () => {
    const appliedResult = Box(x => x + 1).apply(Box(2));
    expect(
      appliedResult.fold(identity)
    ).toEqual(3);
  });
  it('should apply curried function taking two arguments', () => {
    const addResult =
      Box(add)
        .apply(Box(2))
        .apply(Box(3));
    expect(
      addResult.fold(identity)
    ).toEqual(5);
  });
  it('should be equivalent, F(x).map(f) == F(f).apply(F(X))', () => {
    const mapApply = liftA2(add, Box(2), Box(4));
    const boxApplyTwice = Box(add).apply(Box(2)).apply(Box(4));
    expect(
      mapApply.fold(identity)
    ).toEqual(boxApplyTwice.fold(identity));
  });
  it('should allow us to map multiple arguments to a function in a generic way', () => {
    const addThree= x => y => z => x + y + z;
    const applyThree = liftA3(addThree, Box(2), Box(3), Box(4));
    expect(
      applyThree.fold(identity)
    ).toEqual(9);
  });
});
