export const nextCharForNumberStringImperative = (str) => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = number + 1;
  return String.fromCharCode(nextNumber);
};

export const nextCharForNumberStringV1 = str =>
  String.fromCharCode(parseInt(str.trim(), 10) + 1);

// map is composition, input -> output
export const nextCharForNumberStringV2Array = str =>
  [str]
    .map(s => s.trim())
    .map(t => parseInt(t, 10))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i));

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`,
});

export const nextCharForNumberStringV3Box = str =>
  Box(str)
    .map(s => s.trim())
    .map(t => parseInt(t, 10))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i));

export const nextCharForNumberStringV4BoxFold = str =>
  Box(str)
    .map(s => s.trim())
    .map(t => parseInt(t, 10))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase());

