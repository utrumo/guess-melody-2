import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from './genre-question-screen.jsx';

it(`GenreQuestionScreen correctly renders after relaunch`, () => {
  const onUserAnswer = jest.fn();
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
  const questionIndex = 3;
  const genreQuestionScreen = renderer
    .create(<GenreQuestionScreen
      onAnswer={onUserAnswer}
      question={mockQuestion}
      screenIndex={questionIndex}
    />)
  .toJSON();

  expect(genreQuestionScreen).toMatchSnapshot();
});
