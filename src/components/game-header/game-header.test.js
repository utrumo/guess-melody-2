import React from 'react';
import renderer from 'react-test-renderer';
import GameHeader from './game-header.jsx';

it(`Game header correctly renders after relaunch`, () => {
  const gameHeader = renderer
    .create(<GameHeader />)
    .toJSON();

  expect(gameHeader).toMatchSnapshot();
});
