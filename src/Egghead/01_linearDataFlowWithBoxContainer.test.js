import * as sut from './01_linearDataFlowWithBoxContainer';

describe('linearDataFlowWithBoxContainer', () => {

  describe('imperative version', () => {

    it('should return the correct char', () => {
      expect(sut.nextCharForNumberStringImperative(' 64 '))
        .toEqual('A');
    });

  });

  describe('version 1 nested function calls', () => {

    it('should return the correct char', () => {
      expect(sut.nextCharForNumberStringV1(' 64 '))
        .toEqual('A');
    });

  });

  describe('version 2 array with map', () => {

    it('should return the correct char inside an array', () => {
      expect(sut.nextCharForNumberStringV2Array(' 64 '))
        .toEqual(['A']);
    });

  });

  describe('version 3 box', () => {

    it('should return the correct char inside an array', () => {
      expect(sut.nextCharForNumberStringV3Box(' 64 ').inspect())
        .toEqual('Box(A)');
    });

  });

  describe('version 4 box fold', () => {

    it('should return the correct char inside an array', () => {
      expect(sut.nextCharForNumberStringV4BoxFold(' 64 '))
        .toEqual('a');
    });

  });


});