import { Map } from 'immutable-ext';

describe('Object composed entirely of semiGroups is itself a semiGroup, concatenable', () => {
  const Sum = x => ({
    x,
    // destructure of otherSum and rename x to y.
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`
  });

  const All = x => ({
    x,
    concat: ({x: y}) => All(x && y),
    inspect: () => `All(${x})`
  });

  const First = x => ({
    x,
    concat: _ => First(x),
    inspect: () => `First(${x})`
  });

  it('should merge two accounts', () => {
    const acct1 = Map({
      name: First('Nico'),
      isPaid: All(true),
      points: Sum(10),
      friends: ['Franklin']
    });
    const acct2 = Map({
      name: First('Nico'),
      isPaid: All(false),
      points: Sum(2),
      friends: ['Gatsby']
    });
    console.log(acct1.concat(acct2).toJS());
    const expected = {
      name: First('Nico'),
      isPaid: All(false),
      points: Sum(12),
      friends: [ 'Franklin', 'Gatsby' ]
    };
    expect((acct1.concat(acct2)).toJS().friends)
      .toEqual(expected.friends);
  });
});
