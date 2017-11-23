import {
  Either,
  identity,
  noOp
} from './fpUtil';

describe('19: Apply multiple functors as arguments to a function (Applicatives)', () => {
  const $ = selector => Either.of({selector, height: 10});
  const getScreenSize = screen => header => footer =>
    screen - (header.height + footer.height);
  const liftA2 = (f, fx, fy) => fx.map(f).apply(fy);

  it('should apply curried functions', () => {
    const result = Either.of(
      getScreenSize(800))
        .apply($('header'))
        .apply($('footer'));
    expect(
      result.fold(noOp, identity)
    ).toEqual(780);
  });
  it('should return same value with map and apply', () => {
    const result = liftA2(getScreenSize(800), $('header'), $('footer'));
    expect(
      result.fold(noOp, identity)
    ).toEqual(780);
  });
});
