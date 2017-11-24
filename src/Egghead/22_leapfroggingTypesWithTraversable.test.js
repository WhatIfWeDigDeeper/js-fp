import fs from 'fs';
import Task from 'data.task';
import { List } from 'immutable-ext';
import unexpected from './testUtil';
const futurize = require('futurize').futurize(Task);

const readFile = futurize(fs.readFile);
const files = List(['src/Egghead/fpUtil.js', 'src/Egghead/readme.md']);

describe('22: Leapfrogging types with Traversable', () => {
  it('should call traverse instead of map to return single Task around list', () => {
    files
      .traverse(Task.of, fn => readFile(fn, 'utf-8'))
      .fork(unexpected, result => {
        expect(
          result.count()
        ).toEqual(2);
      });
  });
});
