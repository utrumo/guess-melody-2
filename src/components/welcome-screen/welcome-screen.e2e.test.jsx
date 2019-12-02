import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

configure({adapter: new Adapter()});

it(`The clickHandler must be called once when the welcome button is pressed`, () => {
  const mock = {time: 3, maxMistakes: 5};
  const clickHandler = jest.fn();
  const welcomeScreen = shallow(<WelcomeScreen
    time={mock.time}
    maxMistakes={mock.maxMistakes}
    onButtonClick={clickHandler}
  />);
  const startButton = welcomeScreen.find(`button`);

  startButton.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it(`Shold not send form if welcome button was clicked`, () => {
  const mock = {time: 3, maxMistakes: 5};
  const clickHandler = (evt) => {
    evt.preventDefault();
  };
  const welcomeScreen = shallow(<WelcomeScreen
    time={mock.time}
    maxMistakes={mock.maxMistakes}
    onButtonClick={clickHandler}
  />);
  const startButton = welcomeScreen.find(`button`);
  const preventDefault = jest.fn();
  const mockEvent = {preventDefault};

  startButton.simulate(`click`, mockEvent);
  expect(preventDefault).toHaveBeenCalledTimes(1);
});
