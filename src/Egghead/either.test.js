import {
  fromNullable,
  Left,
  Right
} from './fpUtil';

describe('Either', () => {
  // const Right = x => ({
  //   map: f => Right(f(x)),
  //   fold: (f, g) => g(x),
  //   inspect: () => `Right(${x})`,
  // });
  //
  // const Left = x => ({
  //   map: f => Left(x),
  //   fold: (f, g) => f(x),
  //   inspect: () => `Left(${x})`,
  // });
  //
  // const Either = Right || Left;

  describe('Left and Right', () => {

    it('should map right', () => {
      const result = Right(3)
                      .map(x => x + 1)
                      .map(x => x / 2);
      expect(result.inspect())
        .toEqual('Right(2)');
      console.log(result);
    });

    it('should leave x untouched with Left', () => {
      const result = Left(3)
                      .map(x => x + 1);
      expect(result.inspect())
        .toEqual('Left(3)');
      console.log(result);
    });

    it('should use fold to determine if error', () => {
      const result = Right(3)
        .map(x => x + 1)
        .map(x => x / 2)
        .fold(x => 'error',
              x => x);
      expect(result)
        .toEqual(2);
    });

    it('Left should ignore requests and dump error', () => {
      const result = Left(3)
        .map(x => x + 1)
        .map(x => x / 2)
        .fold(x => 'error',
              x => x);
      expect(result)
        .toEqual('error');
    });
  });

  // https://egghead.io/lessons/javascript-composable-code-branching-with-either
  describe('More either', () => {

    const findColor = name =>
      fromNullable({
        red: '#ff4444',
        blue: '#3b5998',
        yellow: '#fff68f'
      }[name]);

    const safeFindColor = name => (
      findColor(name)
      .map(c => c.slice(1))
      .fold(e => 'no color',
            c => c.toUpperCase()));

    it('should return correct hex code', () => {
      expect(safeFindColor('red'))
        .toEqual('FF4444');
    });

    it('should return no color found', () => {
      expect(safeFindColor('green'))
        .toEqual('no color');
    });
  });
});

