import React from 'react';
import Renderer from 'react-test-renderer';
import App from './app.jsx';

it(`App correctly renders after relaunch`, () => {
  const tree = Renderer
    .create(<App
      gameTime={5}
      errorCount={2}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
