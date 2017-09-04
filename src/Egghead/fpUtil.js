export const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

export const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

export const Either = Right || Left;

export const fromNullable = x => (
  x != null
    ? Right(x)
    : Left(null)
);

export const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

// semi-groups
const Sum = x => ({
  x,
  // destructure of otherSum and rename x to y.
  concat: ({x: y}) => Sum(x + y),
  inspect: () => `Sum(${x})`
});
Sum.empty = () => Sum(0);

const All = x => ({
  x,
  concat: ({x: y}) => All(x && y),
  inspect: () => `All(${x})`
});
All.empty = () => All(true);

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: () => `First(${x})`
});

export const semiGroup = {
  Sum,
  All,
  First
};

export const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0);

export const all = xs =>
  xs.reduce((acc, x) => acc && x, true);

export const first = xs =>
  xs.reduce((acc, x) => acc);
