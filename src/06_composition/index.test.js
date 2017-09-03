import fp from 'lodash/fp';
import _ from 'lodash';

const myList = ['1','2','3'];
const parseIntBase10 = _.curryRight(parseInt)(10);
console.log(parseIntBase10('44'));

myList.map(x => parseInt(x,10));
_.map(myList, parseInt);
fp.map(parseInt)(myList);


// partial vs currying
// http://stackoverflow.com/questions/218025/what-is-the-difference-between-currying-and-partial-application
// Currying takes exactly 1 input, whereas partial application takes 2 (or more) inputs.

const add = (x, y) => x + y;
const partialAdd5 = _.partial(add, 5);
partialAdd5(10);

const curryAdd = _.curry(add);
const curryAdd5 = curryAdd(5);
curryAdd5(20);


const printToConsole = str => {
  console.log(str);
  return str;
};
const toUpperCase = str => str.toUpperCase();
const echo = fp.identity;

const printMessage = fp.compose(
                        printToConsole,
                        toUpperCase,
                        echo);

