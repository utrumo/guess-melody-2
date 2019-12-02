import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestion from './artist-question.jsx';

configure({adapter: new Adapter()});

describe(`ArtistQuestionScreen tests:`, () => {
  it(`ArtistQuestionScreen shold return correct input value of user choice in callback`, () => {
    const question = {
      type: `artist`,
      song: {
        artist: `Quincas Moreira`,
        src: `music/Blue_Whale.mp3`
      },
      answers: [
        {
          picture: `static/artist/Quincas_Moreira.jpg`,
          artist: `Quincas Moreira`
        },
        {
          picture: `static/artist/Density_n_Time.jpg`,
          artist: `Density & Time`
        },
        {
          picture: `static/artist/Endless_Love.jpg`,
          artist: `Endless Love`
        }
      ]
    };
    const step = 2;
    const onUserAnswer = jest.fn();

    const artistQuestionScreen = shallow(<ArtistQuestion
      question={question}
      step={step}
      onAnswer={onUserAnswer}
    />);

    const firstInputValue = {
      picture: `static/artist/Quincas_Moreira.jpg`,
      artist: `Quincas Moreira`
    };
    const secondInputValue = {
      picture: `static/artist/Density_n_Time.jpg`,
      artist: `Density & Time`
    };
    const thirdInputValue = {
      picture: `static/artist/Endless_Love.jpg`,
      artist: `Endless Love`
    };

    const inputs = artistQuestionScreen.find(`button`);
    const firstAnswerInput = inputs.at(0);
    const secondAnswerInput = inputs.at(1);
    const thirdAnswerInput = inputs.at(2);

    firstAnswerInput.simulate(`click`);
    secondAnswerInput.simulate(`click`);
    thirdAnswerInput.simulate(`click`);

    expect(onUserAnswer).toHaveBeenNthCalledWith(1, firstInputValue);
    expect(onUserAnswer).toHaveBeenNthCalledWith(2, secondInputValue);
    expect(onUserAnswer).toHaveBeenNthCalledWith(3, thirdInputValue);
  });
});
