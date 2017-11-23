import Task from 'data.task';
import {
  Box,
  fromNullable,
  identity,
  Left,
  noOp,
  Right
} from './fpUtil';

describe('24: Principled type conversions with Natural Transformations, nat(x).map(f) == nat(x.map(f))', () => {
  const eitherToTask = e =>
    e.fold(Task.rejected, Task.of);
  const boxToEither = b =>
    b.fold(Right);
  const first = xs => fromNullable(xs[0]);
  it('should take one functor and convert to another, F a -> G a', () => {
    eitherToTask(Right('nightingale'))
      .fork(console.error, result => {
        expect(
          result
        ).toEqual('nightingale');
      })
  });
  it('should convert Left to a rejected', () => {
    eitherToTask(Left('error'))
      .fork(err => {
        expect(
          err
        ).toEqual('error');
      }, console.log);
  });
  it('should convert a box to a Right', () => {
    expect(
      boxToEither(Box(100))
        .fold(noOp, identity)
    ).toEqual(100);
  });
  it('should be equivalent to map after transformation as before', () => {
    const mapAfterTransformation = boxToEither(Box(100)).map(x => x * 2);
    const mapBeforeTransformation = boxToEither(Box(100).map(x => x * 2));
    expect(
      mapBeforeTransformation.fold(noOp, identity)
    ).toEqual(mapAfterTransformation.fold(noOp, identity));
  });
  it('should be equivalent to map before and after', () => {
    const mapAfterTransform = first([1, 2, 3]).map(x => x + 1);
    const mapBeforeTransform = first([1,2,3].map(x => x + 1));
    expect(
      mapBeforeTransform.fold(noOp, identity)
    ).toEqual(mapAfterTransform.fold(noOp, identity));
  });
});
