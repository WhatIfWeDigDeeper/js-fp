import Task from 'data.task';
import Spotify from "./spotify";
import unexpected from "./testUtil";

// for node args
// const argv = new Task((rej, res) => res(process.argv));
// const names = argv.map(args => args.slice(2));

const main = ([name1, name2]) =>
  Task.of(rels1 => rels2 => [rels1, rels2])
    .ap(Spotify.related(name1))
    .ap(Spotify.related(name2));

describe('27: Build a data flow for a real world app, 28: Retrieve and use data from an api with pure functional constructs', () => {
  it('should return related artists, but Spotify API requires a token', () => {
    const names = ['oasis','blur'];
    main(names).fork((err) => {
      console.log('*****received');
      console.log(err);
      expect(
        err
      ).toEqual('should error, but does not reach here');
    }, unexpected);
  });
});
