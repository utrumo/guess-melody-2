import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestionScreen from './artist-question-screen.jsx';

configure({adapter: new Adapter()});

describe(`ArtistQuestionScreen tests:`, () => {
  it(`ArtistQuestionScreen shold return correct input value of user choice in callback`, () => {
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

    const artistQuestionScreen = mount(<ArtistQuestionScreen
      onAnswer={onUserAnswer}
      question={mockQuestion}
      screenIndex={questionIndex}
    />);
    const inputs = artistQuestionScreen.find(`input`);

    const firstInputValue = `answer-0`;
    const firstAnswerInput = inputs.at(0);
    firstAnswerInput.simulate(`change`);
    expect(onUserAnswer).toBeCalledWith(firstInputValue);

    const secondInputValue = `answer-1`;
    const secondAnswerInput = inputs.at(1);
    secondAnswerInput.simulate(`change`);
    expect(onUserAnswer).toBeCalledWith(secondInputValue);

    const thirdInputValue = `answer-2`;
    const thirdAnswerInput = inputs.at(2);
    thirdAnswerInput.simulate(`change`);
    expect(onUserAnswer).toBeCalledWith(thirdInputValue);
  });
});
