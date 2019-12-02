import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {QuestionType} from '../../shared/consts.js';

import GameHeader from '../game-header/game-header.jsx';
import ArtistQuestion from '../artist-question/artist-question.jsx';
import GenreQuestion from '../genre-question/genre-question.jsx';

class GameScreen extends PureComponent {
  get _question() {
    const {question, step, onAnswer} = this.props;

    switch (question.type) {
      case QuestionType.ARTIST:
        return <ArtistQuestion
          question={question}
          step={step}
          onAnswer={onAnswer}
        />;
      case QuestionType.GENRE:
        return <GenreQuestion
          question={question}
          step={step}
          onAnswer={onAnswer}
        />;
    }

    return null;
  }

  render() {
    const {mistakes, maxMistakes, time, question, onUserRestart} = this.props;
    return (
      <section className={`game game--${question.type}`}>
        <GameHeader
          maxMistakes={maxMistakes}
          mistakes={mistakes}
          time={time}
          onButtonClick={onUserRestart}
        />
        {this._question}
      </section>
    );
  }
}

GameScreen.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  step: PropTypes.number,
  onAnswer: PropTypes.func.isRequired,
  onUserRestart: PropTypes.func.isRequired,
  question: PropTypes.oneOfType([

    PropTypes.exact({
      type: PropTypes.oneOf([`artist`]).isRequired,
      song: PropTypes.exact({
        artist: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
      }).isRequired,
      answers: PropTypes.arrayOf(PropTypes.exact({
        picture: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired
      })).isRequired
    }).isRequired,

    PropTypes.exact({
      type: PropTypes.oneOf([`genre`]).isRequired,
      genre: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(PropTypes.exact({
        src: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired
      })).isRequired
    }).isRequired

  ])
};

export default GameScreen;
