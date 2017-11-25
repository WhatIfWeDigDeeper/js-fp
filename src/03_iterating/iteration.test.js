import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import reduce from 'lodash/fp/reduce';

describe('for loops vs es5 vs lodash fp', () => {

  const myList = ['1', '2', '3', 'oops', '5'];

  it('should use for loop to parse, filter and sum values', () => {
    let sum = 0;
    for (let i = 0; i < myList.length; i++) {
      const value = parseInt(myList[i], 10);
      if (!Number.isNaN(value)) {
        sum += parseInt(myList[i], 10);
      }
    }
    expect(sum)
      .toBe(11);
  });

  it('should use ES5 built-in array methods for map, filter, reduce', () => {
    const sum = myList.map(x => parseInt(x, 10))
                      .filter(x => !Number.isNaN(x))
                      .reduce((acc, x) => acc + x, 0);
    expect(sum)
      .toBe(11);
  });

  it('should use lodash standard map, filter, reduce', () => {
    _.map(myList);
    expect()
      .toBe();
  });

  it('lodash fp map, filter, reduce, data last', () => {
    const sum = flow(
      map(x => parseInt(x, 10)),
      filter(x => !Number.isNaN(x)),
      reduce((acc, x) => acc + x, 0)
    )(myList);

    expect(sum)
      .toBe(11);
  });

});

describe('recursion vs. tail recursion', () => {

});

// const myList = ['1','2','3'];
// const parseIntBase10 = _.curryRight(parseInt)(10);
// console.log(parseIntBase10('44'));
//
// myList.map(x => parseInt(x,10));
// _.map(myList, parseInt);
// fp.map(parseInt)(myList);
//
//
// // partial vs currying
// // http://stackoverflow.com/questions/218025/what-is-the-difference-between-currying-and-partial-application
// // Currying takes exactly 1 input, whereas partial application takes 2 (or more) inputs.
//
// const add = (x, y) => x + y;
// const partialAdd5 = _.partial(add, 5);
// partialAdd5(10);
//
// const curryAdd = _.curry(add);
// const curryAdd5 = curryAdd(5);
// curryAdd5(20);

// interview questions

//
//	P R O B L E M    # 1
//
//	Goal: Build a function that takes an integer and doubles it.
//
//  doublesIt(1) == 2

//
//	P R O B L E M    # 2
//
//	Goal: Build a function that determines if an integer is even or odd.
//				It should return true if it’s even and false if it’s odd.
//
// 	evenOrOdd(1) == false
// 	evenOrOdd(2) == true

//
//	P R O B L E M    # 3
//
//	Goal: Build a function that when given a filename, returns the file extension.
//				If there isn’t a file extension, return false.
//
//	getExtension("file.txt") == txt
// 	getExtension("file.two.txt") == txt
//	getExtension("file") == false

//
//	P R O B L E M    # 4
//
//	Goal: Build a function that when given an array finds the the longest string
//				in the first level of the array. Array can be an array of arrays, strings, numbers, dates
//
//	getLongestString(array1) == "longeststring"

//
//	P R O B L E M    # 5
//
//	Goal: Build a function that will sum all integers that exist in any level
//				of a nested array.
//

export const getOfferPrice = (price) => !price.salePrice ? price.listPrice : price.salePrice;
export const getSubTotal = (products) =>
  products.map(x => (!x.price.salePrice ? x.price.listPrice : x.price.salePrice) * x.quantity)
    .reduce((acc,b) => acc + b, 0);

//const tax = subTotal * 0.825;
//const total = subTotal + total;
// const itemCount = products.map(x => x.quantity).reduce((acc,b) => acc + b, 0);



export const sum = (a, b) => a + b;
//products.map(x => getOfferPrice(x.price) * x.quantity).reduce(sum)
export const getOfferPriceWithQuantity = (x) => getOfferPrice(x.price) * x.quantity;
export const getListPriceWithQuantity = (x) => x.price.listPrice * x.quantity;

//products.map(getOfferPriceWithQuantity).reduce(sum);


export const listTotal = (products) => products.map(getListPriceWithQuantity).reduce(sum);
export const offerTotal = (products) => products.map(getOfferPriceWithQuantity).reduce(sum);
export const getSavings = (products) => listTotal(products) - offerTotal(products);


// [products] -> CartTotal
export const calculateCartTotal = (products, taxRate = 0.0825) => {
  const subtotal = getSubTotal(products);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const savings = getSavings(products);
  return new CartTotal(subtotal, tax, total, savings);
};

// const calculateCartSubtotal = (products)
//
//
// const sumBy3 = (products, fldSelector) => {
// return products.map(fldSelector).reduce(sum);
// }
//
class CartTotal {
  constructor(subtotal, tax, total, savings=0.0) {
    this.subtotal = subtotal;
    this.tax = tax;
    this.total = total;
    this.savings = savings;
    Object.freeze(this);
  }

}
