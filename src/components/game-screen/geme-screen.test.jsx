import React from 'react';
import renderer from 'react-test-renderer';
import createAudioNodeMock from '../../mocks/audio-node-mock';
import GameScreen from './game-screen.jsx';

const questions = [
  {
    type: `artist`,
    song: {
      artist: `Quincas Moreira`,
      src: `https://es31-server.appspot.com/guess-melody/static/music/Blue_Whale.mp3`
    },
    answers: [
      {
        picture: `https://es31-server.appspot.com/guess-melody/static/artist/Quincas_Moreira.jpg`,
        artist: `Quincas Moreira`
      },
      {
        picture: `https://es31-server.appspot.com/guess-melody/static/artist/Density_n_Time.jpg`,
        artist: `Density & Time`
      },
      {
        picture: `https://es31-server.appspot.com/guess-melody/static/artist/Endless_Love.jpg`,
        artist: `Endless Love`
      }
    ]
  },
  {
    type: `genre`,
    genre: `reggae`,
    answers: [
      {
        src: `https://es31-server.appspot.com/guess-melody/static/music/Addis_Ababa.mp3`,
        genre: `reggae`
      },
      {
        src: `https://es31-server.appspot.com/guess-melody/static/music/Azure.mp3`,
        genre: `electronic`
      },
      {
        src: `https://es31-server.appspot.com/guess-melody/static/music/Whaling_City.mp3`,
        genre: `country`
      },
      {
        src: `https://es31-server.appspot.com/guess-melody/static/music/Skanada.mp3`,
        genre: `reggae`
      }
    ]
  }
];
const maxMistakes = 3;
const mistakes = 2;
const step = 0;
const time = 30000;
const artistQuestion = questions[0];
const genreQuestion = questions[1];

it(`GameScreen renders artist question`, () => {
  const tree = renderer
    .create((
      <GameScreen
        maxMistakes={maxMistakes}
        mistakes={mistakes}
        time={time}
        step={step}
        question={artistQuestion}
        onAnswer={jest.fn()}
        onUserRestart={jest.fn()}
      />
    ),
    createAudioNodeMock
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`GameScreen renders genre question`, () => {
  const tree = renderer
    .create((
      <GameScreen
        maxMistakes={maxMistakes}
        mistakes={mistakes}
        time={time}
        step={step}
        question={genreQuestion}
        onAnswer={jest.fn()}
        onUserRestart={jest.fn()}
      />
    ),
    createAudioNodeMock
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
