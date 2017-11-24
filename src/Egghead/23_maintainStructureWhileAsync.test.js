import Task from 'data.task';
import {
  List,
  Map
} from 'immutable-ext';
import unexpected from './testUtil';

describe('23: Maintaining structure whilst asyncing', () => {
  const httpGet = (path, params) =>
    Task.of(`${path}: result`);
  it('should use traverse to result in Task', () => {
    Map({home: '/', about: '/about-us', blog: '/blog'})
      .traverse(Task.of, route => httpGet(route, {}))
      .fork(unexpected, result => {
        expect(
          result.count()
        ).toEqual(3);
      })
  });
  it('should use traverse twice with List', (done) => {
    Map({home: List(['/', '/home']), about: List(['/about-us'])})
      .traverse(Task.of, routes =>
        routes
          .traverse(Task.of, route => httpGet(route, {}))
      )
      .fork(unexpected, result => {
        expect(
          result.toIndexedSeq().toArray().length
        ).toEqual(2);
        done();
      });
  });
});
