import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestion from './artist-question.jsx';
import createAudioNodeMock from '../../mocks/audio-node-mock';

it(`ArtistQuestionScreen is rendered correctly`, () => {
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
        artist: `Density & Time`,
        picture: `https://es31-server.appspot.com/guess-melody/static/artist/Density_n_Time.jpg`
      },
      {
        artist: `Endless Love`,
        picture: `https://es31-server.appspot.com/guess-melody/static/artist/Endless_Love.jpg`
      }
    ]
  };
  const step = 2;
  const onUserAnswer = jest.fn();
  const artistQuestionScreen = renderer
    .create(
        <ArtistQuestion
          question={mockQuestion}
          step={step}
          onAnswer={onUserAnswer}
        />,
        createAudioNodeMock
    )
    .toJSON();

  expect(artistQuestionScreen).toMatchSnapshot();
});
