import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import reduce from 'lodash/fp/reduce';

import * as Immutable from 'immutable';
import * as R from 'ramda';

class Price {
  constructor(listPrice, salePrice) {
    this.listPrice = listPrice;
    this.salePrice = salePrice;
  }
}

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

describe('const does not protect objects and arrays', () => {

  it('should not prevent modification of object properties', () => {
    const price = new Price(29.99, 24.99);
    const prod = new Product('test', price);
    prod.price.listPrice = 39.99;
    expect(price.listPrice)
      .not.toBe(29.99);
  });

  it('should not prevent modification of array member', () => {
    const list = [1, 2, 4, 8];
    list.push(16);
    expect(list.length)
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

  const xs = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

  it('should run Immutable.List', () => {
    const actual = Immutable.List(xs)
                            .map(x => x * 2)
                            .filter(x => x > 0)
                            .reduce((r, x) => r + x, 0);
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
    const product = new Product('GoPro', new Price(399.99, 389.95));

    const salePriceLens = R.lens(
      R.path(['price', 'salePrice']),
      R.assocPath(['price', 'salePrice'])
    );

    const actual = R.set(salePriceLens, 349.95, product);
    expect(actual.price.salePrice)
      .not.toBe(product.price.salePrice);
  });

});

