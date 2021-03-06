// @flow

import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import reduce from 'lodash/fp/reduce';

import {
  CartTotal,
  Price,
  Product
} from '../types';

// replace loops with map, filter, reduce, or recursion

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
    expect(sum).toEqual(11);
  });

  it('should use ES5 built-in array methods for map, filter, reduce', () => {
    const sum = myList.map(x => parseInt(x, 10))
                      .filter(x => !Number.isNaN(x))
                      .reduce((acc, x) => acc + x, 0);
    expect(sum).toEqual(11);
  });

  // it('should use lodash standard map, filter, reduce', () => {
  //   map(myList);
  //   expect()
  //     .toBe();
  // });

  it('lodash fp map, filter, reduce, data last', () => {
    const sum = flow(
      map(x => parseInt(x, 10)),
      filter(x => !Number.isNaN(x)),
      reduce((acc, x) => acc + x, 0)
    )(myList);

    expect(sum).toEqual(11);
  });

});

describe('recursion vs. tail recursion', () => {

  const _rangeRecurse = (count:number, start:number = 1, ary:Array<number>=[], i:number = 0): Array<number> => {
    if (ary.length === count) {
      return ary;
    }
    return _rangeRecurse(count, start, [...ary, i + start], i + 1);
  };

  const range = (count:number, start:number = 1): Array<number> => _rangeRecurse(count, start, [], 0);


  it('should create range', () => {
    expect(range(5)).toEqual([1, 2, 3, 4, 5]);
    expect(range(3, 10)).toEqual([10, 11, 12])
  });

  const _rangeReverse = (ary:Array<number>=[], i:number, start:number = 0): Array<number> => {
    if (i <= start) {
      return ary;
    }
    return _rangeReverse([i - 1, ...ary], i - 1, start);
  };

  const rangeRev = (count:number, start:number = 1):Array<number> => _rangeReverse([], count + start, start);

  it('should create range in reverse', () => {
    expect(
      rangeRev(5)
    ).toEqual([1, 2, 3, 4, 5]);

    expect(rangeRev(3, 10)).toEqual([10, 11, 12]);
  });

  // it('should test performance', () => {
  //   const max = 1000;
  //   let begin = Date.now();
  //   for(let i = 0; i < max; i += 1){
  //     rangeRev(100);
  //   }
  //   let end = Date.now();
  //   console.log(`call to rangeRev took ${end - begin} milliseconds`);
  //
  //   let begin2 = Date.now();
  //   for(let i = 0; i < max; i += 1){
  //     range(100);
  //   }
  //   let end2 = Date.now();
  //   console.log(`call to range took ${end2 - begin2} milliseconds`);
  //
  // });
});

// const myList = ['1','2','3'];
// const parseIntBase10 = curryRight(parseInt)(10);
// console.log(parseIntBase10('44'));
//
// myList.map(x => parseInt(x,10));
// map(myList, parseInt);
// map(parseInt)(myList);
//
//
// // partial vs currying
// // http://stackoverflow.com/questions/218025/what-is-the-difference-between-currying-and-partial-application
// // Currying takes exactly 1 input, whereas partial application takes 2 (or more) inputs.
//
// const add = (x, y) => x + y;
// const partialAdd5 = partial(add, 5);
// partialAdd5(10);
//
// const curryAdd = curry(add);
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

export const getOfferPrice = (price:Price):number => !price.salePrice ? price.listPrice : price.salePrice;
export const getSubTotal = (products:Array<Product>):number =>
  products.map(x => (!x.price.salePrice ? x.price.listPrice : x.price.salePrice) * x.quantity)
    .reduce((acc,b) => acc + b, 0);

//const tax = subTotal * 0.825;
//const total = subTotal + total;
// const itemCount = products.map(x => x.quantity).reduce((acc,b) => acc + b, 0);



export const sum = (a:number, b:number):number => a + b;
//products.map(x => getOfferPrice(x.price) * x.quantity).reduce(sum)
export const getOfferPriceWithQuantity = (p:Product) => getOfferPrice(p.price) * p.quantity;
export const getListPriceWithQuantity = (p:Product) => p.price.listPrice * p.quantity;

//products.map(getOfferPriceWithQuantity).reduce(sum);


export const listTotal = (products:Array<Product>):number => products.map(getListPriceWithQuantity).reduce(sum);
export const offerTotal = (products:Array<Product>):number => products.map(getOfferPriceWithQuantity).reduce(sum);
export const getSavings = (products:Array<Product>):number => listTotal(products) - offerTotal(products);


// [products] -> CartTotal
export const calculateCartTotal = (products:Array<Product>, taxRate:number = 0.0825):CartTotal => {
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

