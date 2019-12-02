import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FailTime from '../fail-time/fail-time.jsx';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import {QuestionType} from '../../shared/consts.js';
import GameScreen from '../game-screen/game-screen.jsx';

import ActionCreator from '../../store/action-creater.js';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this._handleUserAnswer = this._handleUserAnswer.bind(this);
  }

  get _currentQuestion() {
    const {questions, step} = this.props;
    const index = step - 1;
    return questions[index];
  }

  _handleUserAnswer(userAnswer) {
    const {questions, onUserAnswer, maxMistakes} = this.props;

    onUserAnswer(this._currentQuestion, userAnswer, questions.length, maxMistakes);
  }

  render() {
    const {time, onUserRestart} = this.props;
    if (time === 0) {
      return <FailTime onButtonClick={onUserRestart}/>;
    }

    const question = this._currentQuestion;
    if (!question) {
      const {gameTime, maxMistakes, onWelcomeScreenClick} = this.props;
      return (
        <WelcomeScreen
          time={gameTime}
          maxMistakes={maxMistakes}
          onButtonClick={onWelcomeScreenClick}
        />
      );
    }

    const {type} = question;
    if (type === QuestionType.ARTIST || type === QuestionType.GENRE) {
      const {mistakes, maxMistakes, step} = this.props;
      return (
        <GameScreen
          maxMistakes={maxMistakes}
          mistakes={mistakes}
          time={time}
          question={question}
          step={step}
          onAnswer={this._handleUserAnswer}
          onUserRestart={onUserRestart}
        />
      );
    }

    return null;
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,

  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onUserRestart: PropTypes.func.isRequired,

  questions: PropTypes.arrayOf(PropTypes.oneOfType([
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

  ])).isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
  time: state.time
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => {
    dispatch(ActionCreator.changeScreen());
    dispatch(ActionCreator.startTimer());
  },

  onUserAnswer: (question, userAnswer, questionsCount, maxMistakes) => {
    dispatch(ActionCreator.checkAnswer(question, userAnswer));
    dispatch(ActionCreator.changeScreen(questionsCount, maxMistakes));
  },

  onUserRestart: () => dispatch(ActionCreator.restartGame())
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
