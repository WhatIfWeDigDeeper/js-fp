export const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y)
});
Sum.empty = () => Sum(0);

const Product = x => ({
  x,
  concat: ({x: y}) => Product(x * y)
});
Product.empty = () => Product(1);

export const Any = x => ({
  x,
  concat: ({x: y}) => Any(x || y)
});
Any.empty = () => Any(false);

export const All = x => ({
  x,
  concat: ({x: y}) => All(x && y)
});
All.empty = () => All(true);

export const Max = x => ({
  x,
  concat: ({x: y}) => Max(x > y ? x : y)
});
Max.empty = () => Max(-Infinity);

export const Min = x => ({
  x,
  concat: ({x: y}) => Min(x < y ? x : y)
});
Min.empty = () => Min(Infinity);

export const Left = x => ({
  fold: (f, g) => f(x),
  map: f => Left(x),
  concat: o => Left(x),
  isLeft: () => true,
  inspect: () => `Left(${x})`
});

export const Right = x => ({
  fold: (f, g) => g(x),
  map: f => Right(f(x)),
  concat: o =>
    o.fold(e => Left(e),
      r => Right(x.concat(r))),
  inspect: () => `Right(${x})`
});

export const First = either => ({
  fold: f => f(either),
  concat: o => either.isLeft ? o : First(either)
});
First.empty = () => First(Left());

export const Fn = f => ({
  fold: f,
  concat: o => Fn(x => f(x).concat(o.fold(x)))
});

export const Pair = (x, y) => ({
  x,
  y,
  concat: ({x: x1, y: y1}) =>
    Pair(x.concat(x1), y.concat(y1))
});
