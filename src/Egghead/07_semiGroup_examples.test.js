import { Map } from 'immutable-ext';
import { semiGroup } from './fpUtil';

describe('Object composed entirely of semiGroups is itself a semiGroup, concatenable', () => {
  it('should merge two accounts', () => {
    const acct1 = Map({
      name: semiGroup.First('Nico'),
      isPaid: semiGroup.All(true),
      points: semiGroup.Sum(10),
      friends: ['Franklin']
    });
    const acct2 = Map({
      name: semiGroup.First('Nico'),
      isPaid: semiGroup.All(false),
      points: semiGroup.Sum(2),
      friends: ['Gatsby']
    });
    console.log(acct1.concat(acct2).toJS());
    const expected = {
      name: semiGroup.First('Nico'),
      isPaid: semiGroup.All(false),
      points: semiGroup.Sum(12),
      friends: [ 'Franklin', 'Gatsby' ]
    };
    expect((acct1.concat(acct2)).toJS().friends)
      .toEqual(expected.friends);
  });
});
