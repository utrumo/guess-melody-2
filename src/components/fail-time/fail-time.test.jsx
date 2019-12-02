import React from 'react';
import renderer from 'react-test-renderer';

import FailTime from './fail-time.jsx';

it(`FailTIme renders correctly`, () => {
  const tree = renderer
    .create(<FailTime onButtonClick={jest.fn()}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
