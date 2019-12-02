import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestion from './genre-question.jsx';
import createAudioNodeMock from '../../mocks/audio-node-mock';

it(`GenreQuestionScreen is rendered correctly`, () => {
  const mockQuestion = {
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
  };
  const step = 3;
  const onUserAnswer = jest.fn();
  const genreQuestionScreen = renderer
    .create(
        <GenreQuestion
          question={mockQuestion}
          step={step}
          onAnswer={onUserAnswer}
        />,
        createAudioNodeMock
    )
    .toJSON();

  expect(genreQuestionScreen).toMatchSnapshot();
});
