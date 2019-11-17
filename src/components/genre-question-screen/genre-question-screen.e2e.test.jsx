import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from './genre-question-screen.jsx';

configure({adapter: new Adapter()});

// AudioPlayer - Error: Not implemented: HTMLMediaElement.prototype.pause
let pauseStub;

beforeAll(() => {
  pauseStub = jest.spyOn(window.HTMLMediaElement.prototype, `pause`)
    .mockImplementation(() => {});
});

afterAll(() => {
  pauseStub.mockRestore();
});

describe(`GenreQuestionScreen tests:`, () => {
  it(`Component shold return correct input values on form submit in callback`, () => {
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
    const questionIndex = 2;

    const genreQuestionScreen = mount(<GenreQuestionScreen
      onAnswer={onUserAnswer}
      question={mockQuestion}
      screenIndex={questionIndex}
    />);

    const inputs = genreQuestionScreen.find(`input`);
    inputs.at(0).simulate(`change`);
    inputs.at(1).simulate(`change`);
    inputs.at(2).simulate(`change`);
    inputs.at(3).simulate(`change`);

    const form = genreQuestionScreen.find(`form`);
    form.simulate(`submit`);

    const expectedValue = [`answer-0`, `answer-1`, `answer-2`, `answer-3`];
    expect(onUserAnswer).toBeCalledWith(expectedValue);
  });
});
