import { semiGroup, sum, all, first } from "./fpUtil";

describe('SemiGroup -> Monoids by supporting neutral element', () => {
  it('should Sum and skip neutral element, empty', () => {
    expect(semiGroup.Sum.empty()
                    .concat(semiGroup.Sum(1))
                    .concat(semiGroup.Sum(2)).x)
      .toEqual(3);
  });
  it('should combine boolean values and neutral value is true', () => {
    expect(semiGroup.All(true)
                    .concat(semiGroup.All(true))
                    .concat(semiGroup.All.empty()).x)
      .toEqual(true);
  });
  it('should sum elements in array', () => {
    expect(sum([1,2,3]))
      .toEqual(6);
  });
  it('should add booleans together', () => {
    expect(all([true, true, true]))
      .toEqual(true);
  });
  it('should return first element in array', () => {
    expect(first([1,2,3]))
      .toEqual(1);
  });
});
