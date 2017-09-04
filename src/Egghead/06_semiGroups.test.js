import { semiGroup } from './fpUtil';

describe('semiGroups - types with concat method', () => {
  describe('concatable semi-groups', () => {
    it('should display associative properties', () => {
      expect('a'.concat('b').concat('c'))
        .toEqual('a'.concat('b'.concat('c')));
    });
  });

  describe('Number concat', () => {
    it('should sum two sums together', () => {
      expect((semiGroup.Sum(1).concat(semiGroup.Sum(2))).x)
        .toBe(3);
    });
  });

  describe('Boolean concat', () => {
    it('should return false when at least one false', () => {
      expect((semiGroup.All(true).concat(semiGroup.All(false))).x)
        .toBe(false);
    });
    it('should return true when all true', () => {
      expect((semiGroup.All(true).concat(semiGroup.All(true))).x)
        .toBe(true);
    });
  });

  describe('First concat', () => {
    it('should keep first and throw away concatenations', () => {
      expect((semiGroup.First('abc').concat(semiGroup.First('def'))).x)
        .toBe('abc');
    });
  });
});
