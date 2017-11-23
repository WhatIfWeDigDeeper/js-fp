import { List } from 'immutable-ext';

describe('20: List comprehensions with Applicative Functors', () => {
  // imperative loop
  // for(x in xs)
  //   for(y in ys)
  //     for(z in zs)

  const merchandise = () => List.of(x => y => z => `${x}-${y}-${z}`)
    .ap(List(['t-shirt', 'sweater']))
    .ap(List(['large', 'medium', 'small']))
    .ap(List(['black', 'white']));

  it('should apply three lists, to replace 3 loops', () => {
    const result = merchandise();
    expect(
      result.size
    ).toEqual(12);
  });

});
