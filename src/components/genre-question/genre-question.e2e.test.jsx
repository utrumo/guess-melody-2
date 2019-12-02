import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestion from './genre-question.jsx';

configure({adapter: new Adapter()});

const question = {
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
const step = 2;

describe(`GenreQuestionScreen tests:`, () => {
  it(`Rendered checkboxes are synchronized with state`, () => {
    const onUserAnswer = jest.fn();

    const screen = shallow(<GenreQuestion
      question={question}
      step={step}
      onAnswer={onUserAnswer}
    />);

    const inputs = screen.find(`input`);
    const inputOne = inputs.at(0);
    const inputTwo = inputs.at(1);
    const inputThree = inputs.at(2);
    const inputFour = inputs.at(3);

    expect(screen.state(`answers`)).toEqual([false, false, false, false]);

    inputOne.simulate(`change`);
    expect(screen.state(`answers`)).toEqual([true, false, false, false]);

    inputTwo.simulate(`change`);
    expect(screen.state(`answers`)).toEqual([true, true, false, false]);

    inputThree.simulate(`change`);
    expect(screen.state(`answers`)).toEqual([true, true, true, false]);

    inputFour.simulate(`change`);
    expect(screen.state(`answers`)).toEqual([true, true, true, true]);
  });

  it(`User answer passed to callback is consistent with internal component state`, () => {
    const onUserAnswer = jest.fn();

    const screen = shallow(<GenreQuestion
      question={question}
      step={step}
      onAnswer={onUserAnswer}
    />);
    const form = screen.find(`form`);
    const inputTwo = screen.find(`input`).at(1);
    const mockSubmitEvent = {preventDefault() {}};

    expect(screen.state(`answers`)).toEqual([false, false, false, false]);
    inputTwo.simulate(`change`);
    expect(screen.state(`answers`)).toEqual([false, true, false, false]);
    form.simulate(`submit`, mockSubmitEvent);
    expect(onUserAnswer).toHaveBeenNthCalledWith(1, [false, true, false, false]);
  });
});
