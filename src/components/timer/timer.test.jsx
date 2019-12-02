import React from 'react';
import renderer from 'react-test-renderer';

import Timer from './timer.jsx';

it(`Timer correctly renders`, () => {
  const tree = renderer.create(<Timer time={30000} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Timer correctly renders if time < 30 sec`, () => {
  const tree = renderer.create(<Timer time={29000} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Timer correctly renders if minutes and seconds < 10`, () => {
  const time = 9 * 60 * 1000 + 9000;
  const tree = renderer.create(<Timer time={time} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Timer correctly renders if time over`, () => {
  const tree = renderer.create(<Timer time={0} />).toJSON();
  expect(tree).toMatchSnapshot();
});
