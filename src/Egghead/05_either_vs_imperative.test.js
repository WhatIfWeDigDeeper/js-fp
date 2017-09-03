import { fromNullable } from './fpUtil';

describe('either vs imperative', () => {

  const kramerLn = '1835 Kramer Ln.';
  const volusion = {
    address: {
      street: {
        name: kramerLn
      }
    }
  };

  describe('Imperative', () => {
    const streetName = user => {
      const address = user.address;
      if (address) {
        const street = address.street;
        if (street) {
          return street.name;
        }
      }
      return 'no street';
    };

    it('should return "no street" when missing address', () => {
      expect(streetName({}))
        .toEqual('no street');
    });
    it('should return street name', () => {
      expect(streetName(volusion))
        .toEqual(kramerLn);
    });
  });

  describe('functional with Either', () => {
    const streetName = user => (
      fromNullable(user.address)
        .chain(a => fromNullable(a.street))
        .map(st => st.name)
        .fold(e => 'no street', n => n)
    );
    it('should return "no street" when missing address', () => {
      expect(streetName({}))
        .toEqual('no street');
    });
    it('should return street name', () => {
      expect(streetName(volusion))
        .toEqual(kramerLn);
    });

  });


});
