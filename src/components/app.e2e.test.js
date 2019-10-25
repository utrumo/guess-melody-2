import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`The clickHandler must be called once when the welcome button is pressed`, () => {
  const clickHandler = jest.fn();
  const welcomeScreen = shallow(<WelcomeScreen
    time={5}
    errorCount={2}
    onWelcomeButtonClick={clickHandler}
  />);
  const startButton = welcomeScreen.find(`button`);

  startButton.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it(`Shold not send form if welcome button was clicked`, () => {
  const clickHandler = (evt) => {
    evt.preventDefault();
  };
  const welcomeScreen = shallow(<WelcomeScreen
    time={4}
    errorCount={3}
    onWelcomeButtonClick={clickHandler}
  />);
  const startButton = welcomeScreen.find(`button`);
  const preventDefault = jest.fn();
  const mockEvent = {preventDefault};

  startButton.simulate(`click`, mockEvent);
  expect(preventDefault).toHaveBeenCalledTimes(1);
});
