//const Map = require('immutable-ext');

describe('semiGroups', () => {

  const Sum = x => ({
    x,
    concat: ({x: y}) => Sum(x + y),  // destructure of otherSum and rename x to y.
    inspect: () => `Sum(${x})`
  });

  const All = x => ({
    x,
    concat: ({x: y}) => All(x && y),  // destructure of otherSum and rename x to y.
    inspect: () => `All(${x})`
  });


  const First = x => ({
    x,
    concat: _ => First(x),
    inspect: () => `First(${x})`
  });


  describe('concatable semi-groups', () => {

    it('should display associative properties', () => {
      expect('a'.concat('b').concat('c'))
        .toEqual('a'.concat('b'.concat('c')));
    });

  });

  describe('Number concat', () => {

    it('should sum two sums together', () => {
      expect((Sum(1).concat(Sum(2))).x)
        .toBe(3);
    });

  });

  describe('Boolean concat', () => {

    it('should return false when at least one false', () => {
      expect((All(true).concat(All(false))).x)
        .toBe(false);
    });

    it('should return true when all true', () => {
      expect((All(true).concat(All(true))).x)
        .toBe(true);
    });
  });

  describe('First concat', () => {


    it('should keep first and throw away concatenations', () => {
      expect((First('abc').concat(First('def'))).x)
        .toBe('abc');
    });

  });

  // describe('Object composed entirely of semiGroups is itself a semiGroup, concatenable', () => {
  //   it('should merge two accounts', () => {
  //     const acct1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin'] });
  //     const acct2 = Map({ name: First('Nico'), isPaid: All(false), points: Sum(2), friends: ['Gatsby'] });
  //     expect((acct1.concat(acct2)).name)
  //       .toBe('Nico');
  //   });
  // });

});
