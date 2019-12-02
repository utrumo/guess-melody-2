import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen.jsx';

it(`WelcomeScreen correctly renders after relaunch`, () => {
  const mock = {time: 3, maxMistakes: 5, onButtonClick: () => {}};
  const tree = renderer
    .create(<WelcomeScreen {...mock} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
