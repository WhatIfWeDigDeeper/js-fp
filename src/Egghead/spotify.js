import request from 'request';
import Task from 'data.task';
import Either from 'data.either';
import {
  debugLog,
  eitherToTask
} from "./fpUtil";

const httpGet = url =>
  new Task((rej, res) =>
    request(url, (err, resp, body) =>
      err ? rej(err) : res(body))
  );

const parseJson = Either.try(JSON.parse);

const getJSON = url =>
  httpGet(url)
    .map(debugLog)
    .map(parseJson)
    .map(debugLog)
    .chain(eitherToTask);

const first = xs =>
  Either.fromNullable(xs[0]);

const findArtist = name =>
  getJSON(`https://api.spotify.com/v1/search?q=${name}&type=artist`)
    .map(result => result.artists.items)
    .map(first)
    .chain(eitherToTask);

const relatedArtists = id =>
  getJSON(`https://api.spotify.com/v1/artists/${id}/related-artist`)
    .map(result => result.artists);

const related = name =>
  findArtist(name)
    .map(artist => artist.id)
    .chain(relatedArtists)
    .map(artists => artists.map(artist => artist.name));

export default {
  related
};
