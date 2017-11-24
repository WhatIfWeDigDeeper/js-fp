const unexpected = err => {
  console.error(err);
  expect(true).toBeFalsy();
};
export default unexpected;
