import React from 'react';
import PropTypes from 'prop-types';
import {WelcomeScreen} from './welcome-screen.jsx';

export const App = (props) => {
  const {gameTime, errorCount} = props;
  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
  />;
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
};
