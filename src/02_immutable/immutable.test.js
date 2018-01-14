// @flow

import * as R from 'ramda';

type Price = {
  list: number,
  sale: ?number
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

  it('should not prevent modification of array member', () => {
    const ary: Array<number> = [1, 2, 4, 8];

    ary.push(16);

    expect(ary.length).toEqual(5);
  });

  it('should not prevent modification of object properties', () => {
    const price: Price = { list: 39.99, sale: null };
    const prod: Product = new Product('test', price);

    prod.price.list = 19.99;

    expect(price.list).not.toEqual(39.99);
  });

  it('should allow mutation', () => {
    const price: Price = { list: 699.99, sale: 649.99 };
    const product = new Product('iPad Pro', price);

    product.price.sale = 1;

    expect(product.price.sale).toEqual(1);
  });

  it('should not throw error on attempt to update value', () => {
    const price: Price = { list: 699.99, sale: 649.99 };
    const product = new Product('iPad Pro', price);
    Object.freeze(product);

    product.price.sale = 1;
    expect(product.price.sale).toEqual(1);
  });

  it('should throw error on attempt to update value', () => {
    const price: Price = { list: 699.99, sale: 649.99 };
    Object.freeze(price);
    const product = new Product('iPad Pro', price);

    expect(() => {
      product.price.sale = 1;
    }).toThrow();
  });

  it('should throw error on attempt to update value', () => {
    const price: Price = { list: 699.99, sale: 649.99 };
    Object.freeze(price);
    const product = new Product('iPad Pro', price);
    Object.freeze(product);

    const price2: Price = { list: 699.99, sale: 1 };
    expect(() => {
      product.price = price2;
    }).toThrow();
  });

});

describe('Object.merge or ...', () => {
  const listPrice: { list: number } = { list: 19.99};
  const salePrice: { sale: number } = { sale: 14.95 };

  it('should use Object.merge', () => {
    const price: Price = Object.assign({}, listPrice, salePrice);

    expect(price.sale).toEqual(14.95);
  });

  it('should use object spread operator ...', () => {
    const price:Price = { ...listPrice, ...salePrice };

    expect(price.sale).toEqual(14.95);
  });
});


describe('Ramda lenses', () => {

  it('should return new product when modifying through lens', () => {
    const price:Price = { list: 399.99, sale: 389.95};
    const product:Product = new Product('GoPro', price);

    // $FlowFixMe: Ramda flow-typed has not implemented lens yet
    const salePriceLens = R.lens(
      R.path(['price', 'sale']),
      R.assocPath(['price', 'sale'])
    );

    // $FlowFixMe: Ramda flow-typed has not implemented set yet
    const actual:Product = R.set(salePriceLens, 349.95, product);

    expect(actual.price.sale)
      .not.toEqual(product.price.sale);
  });

});

