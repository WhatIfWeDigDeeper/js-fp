import { fromNullable, tryCatch } from './fpUtil';

describe('imperative null checks vs. Either', () => {

  describe('street property', () => {

    const kramerLn = '1835 Kramer Ln.';
    const volusion = {
      address: {
        street: {
          name: kramerLn
        }
      }
    };

    describe('imperative deep property', () => {
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

    describe('functional deep property', () => {

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

  describe('concat', () => {

    describe('imperative concat', () => {
      const concatUniq = (x, ys) => {
        const found = ys.filter(y => y === x)[0];
        return found ? ys : [x].concat(ys);
      };

      it('should not find x', () => {
        expect(concatUniq(1, [2,3,4]))
          .toEqual([1,2,3,4]);
      });
      it('should find x', () => {
        expect(concatUniq(1, [2,1,3]))
          .toEqual([2,1,3]);
      });
    });

    describe('functional concat', () => {
      const concatUniq = (x, ys) => (
        fromNullable(ys.filter(y => y === x)[0])
          .fold(() => [x].concat(ys), y => ys)
      );

      it('should not find x', () => {
        expect(concatUniq(1, [2,3,4]))
          .toEqual([1,2,3,4]);
      });
      it('should find x', () => {
        expect(concatUniq(1, [2,1,3]))
          .toEqual([2,1,3]);
      });

    });
  });

  describe('try catch vs tryCatch', () => {
    const goodCfg = '{ "url": "https://VOLUSION.com" }';
    const malformedCfg = '{ missingQuotes: "https://vol.com" }';

    describe('imperative try catch', () => {
      const parseCfgUrl = cfg => {
        try {
          const c = JSON.parse(cfg);
          if (c.url) {
            return c.url.toLowerCase();
          }
          return null;
        } catch (e) {
          return null;
        }
      };

      it('should parse correctly', () => {
        expect(parseCfgUrl(goodCfg))
          .toEqual('https://volusion.com');
      });
      it('should not parse', () => {
        expect(parseCfgUrl(malformedCfg))
          .toBeNull();
      });
    });

    describe('functional tryCatch', () => {
      const parseCfgUrl = cfg => (
        tryCatch(() => JSON.parse(cfg))
          .chain(c => fromNullable(c.url))
          .fold(e => null,
                x => x.toLowerCase())
      );
      it('should parse correctly', () => {
        expect(parseCfgUrl(goodCfg))
          .toEqual('https://volusion.com');
      });
      it('should not parse', () => {
        expect(parseCfgUrl(malformedCfg))
          .toBeNull();
      });

    });
  });
});
