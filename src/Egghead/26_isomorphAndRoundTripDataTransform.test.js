import {
  identity,
  Left,
  noOp,
  Right
} from './fpUtil';

describe('26: Isomorphisms, from(to(x)) = x or to(from(x)) = x, and round trip data transformations', () => {
  const Iso = (to, from) => ({
    to,
    from
  });

  describe('String ~ [char]', () => {
    const chars = Iso(s => s.split(''), c => c.join(''));
    const truncate = str => chars.from(
      chars.to(str).slice(0, 3)
    ).concat('...');

    it('should show String ~ [char] and can be converted without loss', () => {
      expect(
        chars.from(chars.to('hello world'))
      ).toEqual('hello world');
    });
    it('should convert string to char array to use array methods and covert back to string', () => {
      expect(
        truncate('hello world')
      ).toEqual('hel...');
    });
  });
  describe('[a] ~ Either null a', () => {
    const singleton = Iso(e => e.fold(() => [], x => [x]),
      ([x]) => x ? Right(x) : Left());
    const filterEither = (e, pred) =>
      singleton.from(singleton.to(e).filter(pred));

    it('should convert Right(a) to singleton array [a] filter and convert back to Right(a)', () => {
      const result = filterEither(Right('hello'), x => x.match(/h/ig))
        .map(x => x.toUpperCase());
      expect(
        result.fold(noOp, identity)
      ).toEqual('HELLO');
    });
    it('should convert Right(a) to singleton array [a] filter and convert to Left()', () => {
      const result = filterEither(Right('ello'), x => x.match(/h/ig))
        .map(x => x.toUpperCase());
      expect(
        result.inspect()
      ).toEqual('Left(undefined)');
    });
  });
});
