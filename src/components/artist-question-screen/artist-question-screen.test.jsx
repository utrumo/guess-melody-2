import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './artist-question-screen.jsx';
import createAudioNodeMock from '../../mocks/audio-node-mock';

it(`ArtistQuestionScreen correctly renders after relaunch`, () => {
  const onUserAnswer = jest.fn();
  const mockQuestion = {
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
  };
  const questionIndex = 2;

  const artistQuestionScreen = renderer
    .create(
        <ArtistQuestionScreen
          onAnswer={onUserAnswer}
          question={mockQuestion}
          screenIndex={questionIndex}
        />,
        createAudioNodeMock
    )
    .toJSON();

  expect(artistQuestionScreen).toMatchSnapshot();
});
