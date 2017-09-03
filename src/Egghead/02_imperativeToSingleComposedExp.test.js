import * as sut from './02_imperativeToSingleComposedExp';

describe('02_imperativeToSingleComposedExp', () => {

  describe('imperative', () => {

    it('should apply discount', () => {
      expect(sut.applyDiscountImperative('$5.00', '20%'))
        .toEqual(4.00);
    });

  });


});