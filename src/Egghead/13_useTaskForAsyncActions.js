import Task from 'data.task';
import fs from 'fs';

const originalAppWithCallBacks = () =>
  fs.readFile('config.json', 'utf-8', (err, contents) => {
    if (err) throw err;
    const newContents = contents.replace(/8/g, '6');
    fs.writeFile('config1.json', newContents, (err, _) => {
      if(err) throw err;
      console.log('success');
    })
  });

const readFile = (fileName, enc) =>
  new Task((rej, res) =>
    fs.readFile(fileName, enc, (err, contents) =>
      err ? rej(err) : res(contents)));

const writeFile = (fileName, contents) =>
  new Task((rej, res) =>
    fs.writeFile(fileName, contents, (err, success) =>
      err ? rej(err) : res(success)));

const app = () =>
  readFile('config.json', 'utf-8')
    .map(contents => contents.replace(/8/g, '6'))
    .chain(contents => writeFile('config1.json', contents));

app.fork(e => console.log(e),
        x => console.log('success'));

