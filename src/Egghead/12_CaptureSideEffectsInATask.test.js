import Task from 'data.task';

describe('11: Capture Side Effects in a Task', () => {
  it('should do success path on fork', (done) => {
    Task.of(1)
      .map(x => x + 1)
      .fork(e => {
          console.log('err', e);
          expect('should not be called').ToBeFalsy();
          done();
        },
        x => {
          console.log('success', x);
          expect(x).toEqual(2);
          done();
        });
  });
  it('should chain task', (done) => {
    Task.of(1)
      .map(x => x + 1)
      .chain(x => Task.of(x+1))
      .fork(e => {
          console.log('err', e);
          expect('should not be called').ToBeFalsy();
          done();
        },
        x => {
          console.log('success', x);
          expect(x).toEqual(3);
          done();
        });
  });
  it('should reject', () => {
    Task.of(1)
      .rejected(e => {
          console.log('err', e);
          expect('should be called').toBeTruthy();
          done();
        },
        x => {
          console.log('success', x);
          expect('to not be called').toBeFalsy();
          done();
        });
  });
});
