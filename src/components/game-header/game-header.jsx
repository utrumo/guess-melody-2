import React from 'react';
import PropTypes from 'prop-types';
import Timer from '../timer/timer.jsx';

const GameHeader = (props) => {
  const {maxMistakes, mistakes, time, onButtonClick} = props;
  return <header className="game__header">
    <a className="game__back" onClick={onButtonClick}>
      <span className="visually-hidden">Сыграть ещё раз</span>
      <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
    </a>

    <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
      <circle
        className="timer__line"
        cx="390"
        cy="390"
        r="370"
        style={{
          filter: `url(#blur)`,
          transform: `rotate(-90deg) scaleY(-1)`,
          transformOrigin: `center`
        }} />
    </svg>

    <Timer time={time} />

    <div className="game__mistakes">
      {Array(maxMistakes).fill(null).map((it, i) => (
        <div key={i} className={i < mistakes ? `wrong` : `correct`} />
      ))}
    </div>
  </header>;
};

GameHeader.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default GameHeader;
