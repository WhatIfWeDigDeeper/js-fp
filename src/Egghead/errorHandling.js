// https://egghead.io/lessons/javascript-composable-error-handling-with-either

import fs from 'fs';
import {
  // Either,
  Left,
  Right,
} from './fpUtil';

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

export const getPort = () => (
  tryCatch(() => fs.readFileSync('config.json'))
    .chain(c => tryCatch(JSON.parse(c)))
    .fold(e => 3000, c => c.port)
);

// const getPortWithTryCatch = () => {
//   try {
//     const str = fs.readFileSync('config.json');
//     const config = JSON.parse(str);
//     return config.port;
//   } catch (e) {
//     return 3000;
//   }
// };
