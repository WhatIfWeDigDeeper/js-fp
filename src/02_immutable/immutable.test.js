// @flow
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import reduce from 'lodash/fp/reduce';

import * as Immutable from 'immutable';
import * as R from 'ramda';

type Price = {
  list: number,
  sale: number
};

class Product {
  name: string;
  price: Price;

  constructor(name: string, price: Price) {
    this.name = name;
    this.price = price;
  }
}

describe('const does not protect objects and arrays', () => {

  it('should not prevent modification of object properties', () => {
    const price = { list: 29.99, sale: 24.99};
    const prod = new Product('test', price);
    prod.price.list = 39.99;
    expect(price.list)
      .not.toBe(29.99);
  });

  it('should not prevent modification of array member', () => {
    const ary: Array<number> = [1, 2, 4, 8];
    ary.push(16);
    expect(ary.length)
      .toBe(5);
  });

});

describe('Object.merge or ...', () => {

});

describe('Immutable', () => {

});

// move to composition.
describe('Immutable vs. Lodash/FP', () => {
// from https://jsperf.com/lodash-fp-vs-immutable-js

  const xs: Array<number> = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

  it('should run Immutable.List', () => {
    const actual = Immutable.List(xs)
                            .map(x => x * 2)
                            .filter(x => x > 0)
                            .reduce((r, x) => r + x, 0);
    expect(actual).toBe(30);
  });



  it('should show declarative', () => {
    const double = (x:number):number => x * 2;
    const positive = (x:number):boolean => x > 0;
    const sum = (acc:number=0,x:number):number => acc + x;

    const actual = Immutable.List(xs)
                            .map(double)
                            .filter(positive)
                            .reduce(sum);
    expect(actual).toBe(30);
  });

  it('should run Lodash/fp flow', () => {
    const actual = flow(
      map(x => x * 2),
      filter(x => x > 0),
      reduce((acc, x) => acc + x, 0)
    )(xs);

    expect(actual).toBe(30);
  });

});

describe('Ramda lenses', () => {

  it('should return new product when modifying through lens', () => {
    const product = new Product('GoPro', { list: 399.99, sale: 389.95});

    // $FlowFixMe: Ramda flow-typed has not implemented lens yet
    const salePriceLens = R.lens(
      R.path(['price', 'sale']),
      R.assocPath(['price', 'sale'])
    );

    // $FlowFixMe: Ramda flow-typed has not implemented set yet
    const actual = R.set(salePriceLens, 349.95, product);
    expect(actual.price.sale)
      .not.toBe(product.price.sale);
  });

});

