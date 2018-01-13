// @flow

describe('impure vs. pure functions', () => {

  class Product {
    name: string;
    price: number;

    constructor(name: string, price: number) {
      this.name = name;
      this.price = price;
    }
  }

  describe('impure', () => {
    it('should allow mutation', () => {
      const product = new Product('iPad Pro', 699.99);
      product.price = 1;
      expect(product.price).toEqual(1);
    });
  });

  describe('pure', () => {
    it('should throw error on attempt to update value', () => {
      const product = new Product('iPad Pro', 699.99);
      Object.freeze(product);
      expect(() => {
        product.price = 1;
      }).toThrow();
    });
  });

});








