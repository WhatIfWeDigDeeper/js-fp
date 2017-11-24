import Task from 'data.task';
import unexpected from './testUtil';

describe('21: Write applicatives for concurrent actions', () => {
  const Db = ({
    find: id => new Task((rej, res) =>
      setTimeout(() => res({id, title: `Project ${id}`}), 100)
    )
  });
  const reportHeader = (p1, p2) =>
    `Report: ${p1.title} compared to ${p2.title}`;

  it('should kick off both applies at same time', () => {
    Task.of(p1 => p2 => reportHeader(p1, p2))
      .ap(Db.find(20))
      .ap(Db.find(8))
      .fork(unexpected, result => {
        expect(
          result
        ).toEqual('Report: Project 20 compared to Project 8');
      })
  });
});
