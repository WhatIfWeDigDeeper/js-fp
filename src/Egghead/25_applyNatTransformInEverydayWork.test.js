import { List } from 'immutable-ext';
import Task from 'data.task';
import {
  fromNullable,
  identity,
  Left,
  noOp,
  Right,
  unexpected
} from './fpUtil';

describe('25: Apply Natural Transformations in everyday work', () => {
  describe('nt(x).map(f) == nt(x.map(f)', () => {
    const first = xs => fromNullable(xs[0]);
    const largeNumbers = xs => xs.filter(x => x > 100);
    const larger = x => x * 2;
    it('should transform an array to a list so it can be chained.', () => {
      const result = List(['hello', 'world'])
        .chain(x => List(x.split('')));
      expect(
        result.count()
      ).toEqual(10);
    });
    it('should filter, map and grab first: nt(x.map(f))', () => {
      const app = xs => first(largeNumbers(xs).map(larger));
      expect(
        app([2, 400, 5, 1000]).fold(noOp, identity)
      ).toEqual(800);
    });
    it('should filter, grab first, and map: nt(x).map(f)', () => {
      const app = xs => first(largeNumbers(xs)).map(larger);
      expect(
        app([2, 400, 5, 1000]).fold(noOp, identity)
      ).toEqual(800);
    });
  });
  describe('nat trans', () => {
    const fake = id => ({
      id, name: 'user1', best_friend_id: id + 1
    });
    const Db = ({
      find: id => new Task((rej, res) =>
        res(id > 2 ? Right(fake(id)) : Left('not found')))
    });
    const eitherToTask = e => e.fold(Task.rejected, Task.of);
    it('should flatten tasks', () => {
      Db.find(3)
        .chain(eitherToTask)
        .chain(user => Db.find(user.best_friend_id))
        .chain(eitherToTask)
        .fork(unexpected, bestFriend => {
          expect(
            bestFriend.id
          ).toEqual(4);
        })
    });
    it('should flatten task and fork to error', () => {
      Db.find(2)
        .chain(eitherToTask)
        .chain(user => Db.find(user.best_friend_id))
        .chain(eitherToTask)
        .fork(notFound => {
          expect(
            notFound
          ).toEqual('not found');
        }, unexpected);
    });
  });
});
