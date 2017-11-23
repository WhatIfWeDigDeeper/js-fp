describe('17: Build Curried Functions', () => {
  describe('normal function re-use without currying', () => {
    it('should create default function call', () => {
      const add = (x, y) => x + y;
      const incr = (y) => add(1, y);
      expect(
        incr(3)
      ).toEqual(4);
    });
  });
  describe('curried function', () => {
    const modulo = divisor => dividend => dividend % divisor;
    const isOdd = modulo(2);
    const filter = predicate => xs => xs.filter(predicate);
    const getAllOdds = filter(isOdd);

    const replace = regex => replacement => str => str.replace(regex, replacement);
    const censor = replace(/[aeiou]/ig)('*');
    const map = f => xs => xs.map(f);
    const censorAll = map(censor);

    it('should return a function that takes the next argument, one at a time', () => {
      const add = x => y => x + y;
      const incr = add(1);
      expect(
        incr(3)
      ).toEqual(4);
    });
    it('should reuse functions', () => {
      expect(
        isOdd(5)
      ).toBeTruthy();
    });
    it('should preload functions with arguments', () => {
      expect(
        getAllOdds([1,2,3,4])
      ).toEqual([1,3]);
    });
    it('should put data last', () => {
      expect(
        censor('hello world')
      ).toEqual('h*ll* w*rld');
    });
    it('should build up functions with data last', () => {
      expect(
        censorAll(['hello', 'world', 'now!'])
      ).toEqual(['h*ll*', 'w*rld', 'n*w!']);
    });
  });
});
