/*
 * V >=2
 * A {AUTHOR OF TRACK}
 * N {NAME OF TRACK}
 * T Map data
 * C {CategoryId}, {CategoryId}, ...
 * I {NUMBER OF PLAYERS TO COMPLETE},{NUMBER OF STROKES},{BEST NUMBER OF STROKES},{NUMBER OF PEOPLE THAT GOT BEST STROKE}
 * B {FIRST BEST PAR PLAYER},{UNIX TIMESTAMP OF FIRST BEST PAR}000
 * L {LAST BEST PAR PLAYER},{UNIX TIMESTAMP OF LAST BEST PAR}000
 * R {RATING: 0},{RATING: 1},{RATING: 2},{RATING: 3},{RATING: 4},{RATING: 5},{RATING: 6},{RATING: 7},{RATING: 8},{RATING: 9},{RATING: 10}
 */

interface TrackType {
  version: string;
  author: string;
  name: string;
  mapData: string;
  categories: string;
  scoreInfo: string;
  ratings: string;
  bestTime: string;
  lastTime: string;
}

export function parseTrack(trackData: string): TrackType {
  const entries = trackData.split("\n").map((line) => line.split(" "));
  return entries
    .map(([key, value]) => {
      switch (key) {
        case "V":
          return {
            version: value,
          };
        case "A":
          return {
            author: value,
          };
        case "N":
          return {
            name: value,
          };
        case "T":
          return {
            mapData: value,
          };
        case "C":
          return {
            categories: value,
          };
        case "I":
          return {
            scoreInfo: value,
          };
        case "R":
          return {
            ratings: value,
          };
        case "B":
          return {
            bestTime: value,
          };
        case "L":
          return {
            lastTime: value,
          };
      }
    })
    .reduce(
      (track, cur) => ({
        ...track,
        ...cur,
      }),
      {} as TrackType,
    );
}
