import {toMilliseconds} from './convert.js';

it(`Should coorect converting minutes to milliseconds`, () => {
  const MinutesCount = 5;
  const expectedValueMs = 5 * 60 * 1000;

  expect(toMilliseconds(MinutesCount)).toEqual(expectedValueMs);
});
