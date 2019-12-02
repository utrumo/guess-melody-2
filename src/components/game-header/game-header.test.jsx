import React from 'react';
import renderer from 'react-test-renderer';

import GameHeader from './game-header.jsx';

it(`Game header correctly renders after relaunch`, () => {
  const mistakes = 1;
  const maxMistakes = 3;
  const time = 30000;
  const gameHeader = renderer
    .create(<GameHeader
      maxMistakes={maxMistakes}
      mistakes={mistakes}
      time={time}
      onButtonClick={jest.fn()}
    />)
    .toJSON();

  expect(gameHeader).toMatchSnapshot();
});
