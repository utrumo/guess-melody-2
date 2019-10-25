import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from './welcome-screen.jsx';

const clickHandler = (evt) => {
  evt.preventDefault();
};

const App = (props) => {
  const {gameTime, errorCount} = props;

  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
    onWelcomeButtonClick={clickHandler}
  />;
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
};

export default App;
