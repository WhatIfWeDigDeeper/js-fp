import * as sut from './errorHandling';

describe('errorHandling', () => {

  describe('getPort', () => {

    it('should error and return default', () => {
      expect(sut.getPort())
        .toEqual(3000);
    });

  });

});