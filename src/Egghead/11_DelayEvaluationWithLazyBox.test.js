const Box = x => ({
  fold: f => f(x),
  map: f => Box(f(x)),
  inspect: () => `Box(${x}`
});

// purity through laziness
// only invoked when folded
const LazyBox = g => ({
  fold: f => f(g()),
  map: f => LazyBox(() => f(g()))
});

describe('11: Delay Evaluation with LazyBox', () => {
  it('should return box unless fold is called', () => {
    const result = LazyBox(() => '  64  ')
      .map(abba => abba.trim())
      .map(trimmed => Number.parseInt(trimmed, 10))
      .map(number => number + 1)
      .map(x => String.fromCharCode(x));
    expect(
      typeof result === 'object'
    ).toBeTruthy()
  });
  it('should delay evaluation until fold is called', () => {
    const result = LazyBox(() => '  64  ')
      .map(abba => abba.trim())
      .map(trimmed => Number.parseInt(trimmed, 10))
      .map(number => number + 1)
      .map(x => String.fromCharCode(x))
      .fold(x => x.toLowerCase());
    expect(
      result
    ).toEqual('a');
  });

});
