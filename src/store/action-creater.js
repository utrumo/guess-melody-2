import {isArtistAnswerCorrect, isGenreAnswerCorrect} from '../utils/checks.js';
import {ActionType, QuestionType} from '../shared/consts.js';
import Timer from '../modules/timer/timer.js';
import rules from '../mocks/rules.js';

const timer = new Timer();

const ActionCreator = {
  changeScreen(questionsCount, maxMistakes) {
    return (dispatch, getState) => {
      if (!questionsCount) {
        return dispatch({type: ActionType.INCREMENT_STEP, payload: 1});
      }

      const {mistakes, step} = getState();

      if (mistakes < maxMistakes && step < questionsCount) {
        return dispatch({
          type: ActionType.INCREMENT_STEP,
          payload: 1
        });
      }

      return dispatch({type: ActionType.RESET});
    };
  },

  checkAnswer(question, userAnswer) {
    let answerIsCorrect = false;

    switch (question.type) {
      case QuestionType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case QuestionType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1
    };
  },

  startTimer() {
    return (dispatch) => {
      timer.start(
          rules.gameTime,
          (time) => dispatch({type: ActionType.TICK_TIMER, payload: time}));
    };
  },

  restartGame() {
    timer.stop();
    return {type: ActionType.RESET};
  }

};

export default ActionCreator;
