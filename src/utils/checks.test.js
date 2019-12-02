import {isArtistAnswerCorrect, isGenreAnswerCorrect} from './checks.js';

describe(`Business logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    const correctAnswer = {artist: `first`, picture: `artist`};
    const incorrectAnswer = {artist: `incorrect-artist`, picture: `incorrect-pic`};
    const question = {
      type: `artist`,
      song: {
        artist: `first`,
        src: `http://test.addr`
      },
      answers: [
        {
          artist: `first`,
          picture: `artist`
        },
        {
          artist: `incorrect-artist`,
          picture: `incorrect-pic`
        },
        {
          artist: `incorrect-artist-2`,
          picture: `incorrect-pic`
        }
      ]
    };

    expect(isArtistAnswerCorrect(question, correctAnswer)).toBeTruthy();
    expect(isArtistAnswerCorrect(question, incorrectAnswer)).toBeFalsy();
  });

  it(`Genre question is checked correctly`, () => {
    const question = {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `jazz`,
          src: `0`
        },
        {
          genre: `blues`,
          src: `1`
        },
        {
          genre: `rock`,
          src: `2`
        },
        {
          genre: `jazz`,
          src: `3`
        }
      ]
    };
    const correctAnswer = [false, false, true, false];
    const incorrectAnswer = [false, false, false, false];

    expect(isGenreAnswerCorrect(question, correctAnswer)).toBeTruthy();
    expect(isGenreAnswerCorrect(question, incorrectAnswer)).toBeFalsy();
  });
});
