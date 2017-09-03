describe('impure vs. pure functions', () => {

  class Product {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
  }

  describe('impure', () => {
    it('should allow mutation', () => {
      const product = new Product('iPad Pro', 699.99);
      product.price = 1;
      expect(product.price)
        .toEqual(1);
    });
  });

  describe('pure', () => {
    it('should throw error on attempt to update value', () => {
      const product = new Product('iPad Pro', 699.99);
      Object.freeze(product);
      try {
        product.price = 1;
      } catch (err) {
        expect(err).toBeTruthy();
        return;
      }
      fail('should not hit');
    });
  });

});








