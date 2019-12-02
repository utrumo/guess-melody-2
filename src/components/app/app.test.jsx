import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';
import createAudioNodeMock from '../../mocks/audio-node-mock';

const mockQuestions = [
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

const mockRules = {gameTime: 5, maxMistakes: 3};
const mockState = {step: 0, mistakes: 2, time: 30000};

it(`App correctly renders welcome screen`, () => {
  const tree = renderer
    .create((
      <App
        gameTime={mockRules.gameTime}
        maxMistakes={mockRules.maxMistakes}
        step={mockState.step}
        mistakes={mockState.mistakes}
        time={mockState.time}
        questions={mockQuestions}
        onWelcomeScreenClick={jest.fn()}
        onUserAnswer={jest.fn()}
        onUserRestart={jest.fn()}
      />
    ),
    createAudioNodeMock
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders artist screen`, () => {
  const step = 1;
  const tree = renderer
    .create((
      <App
        gameTime={mockRules.gameTime}
        maxMistakes={mockRules.maxMistakes}
        step={step}
        mistakes={mockState.mistakes}
        time={mockState.time}
        onWelcomeScreenClick={jest.fn()}
        onUserAnswer={jest.fn()}
        questions={mockQuestions}
        onUserRestart={jest.fn()}
      />
    ),
    createAudioNodeMock
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders genre screen`, () => {
  const step = 2;
  const tree = renderer
    .create((
      <App
        gameTime={mockRules.gameTime}
        maxMistakes={mockRules.maxMistakes}
        step={step}
        mistakes={mockState.mistakes}
        time={mockState.time}
        onWelcomeScreenClick={jest.fn()}
        onUserAnswer={jest.fn()}
        questions={mockQuestions}
        onUserRestart={jest.fn()}
      />
    ),
    createAudioNodeMock
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
