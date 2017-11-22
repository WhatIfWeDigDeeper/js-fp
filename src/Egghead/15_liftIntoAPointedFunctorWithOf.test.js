import Task from 'data.task';
import {
  Box,
  Either,
  identity,
  noOp,
  Right
} from "./fpUtil";

describe('15: Lift into a Pointed Functor with of', () => {
  it('should construct a Task by just putting a value in', () => {
    expect(
      Task.of('hello').fork(noOp, identity)
    ).toEqual('hello');
    expect(
      new Task((rej, res) =>
        res('hello')).fork(noOp, identity)
    ).toEqual('hello');
  });
  it('should construct a Right from an either.of', () => {
    expect(
      Either.of('hello').fold(noOp, identity)
    ).toEqual(
      Right.of('hello').fold(noOp, identity)
    );
  });
  it('should construct a Box by just putting a value in', () => {
    expect(
      Box.of('hello').fold(noOp, identity)
    ).toEqual(
      new Box('hello').fold(noOp, identity)
    );
  });

});
