import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';
import {QuestionType} from '../../shared/consts.js';

const DEFAULT_VALUE = false;

class GenreQuestion extends PureComponent {
  constructor(props) {
    super(props);

    const {answers} = this.props.question;

    this.state = {
      answers: new Array(answers.length).fill(DEFAULT_VALUE),
      activePlayer: -1
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _getCheckedStatus(index) {
    return this.state.answers[index];
  }

  _handleInputChange(index) {
    const isChecked = this._getCheckedStatus(index);
    this.setState((oldState) => {
      const answers = [...oldState.answers];
      answers[index] = !isChecked;
      return {answers};
    });
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this.props.onAnswer(this.state.answers);
  }

  render() {
    const {question: {genre, answers}, step} = this.props;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={this._handleFormSubmit}>

          {answers.map(({src}, i) => (
            <div key={`${step}-answer-${i}`} className="track">
              <AudioPlayer
                src={src}
                isPlaying={i === this.state.activePlayer}
                onPlayButtonClick={() => this.setState((oldState) => ({
                  activePlayer: i === oldState.activePlayer ? -1 : i
                }))} />
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox"
                  name="answer"
                  id={`answer-${i}`}
                  checked={this._getCheckedStatus(i)}
                  onChange={() => this._handleInputChange(i)}
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          ))};

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestion.propTypes = {
  question: PropTypes.exact({
    type: PropTypes.oneOf([QuestionType.GENRE]),
    genre: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.exact({
      src: PropTypes.string,
      genre: PropTypes.string
    }))
  }),
  step: PropTypes.number,
  onAnswer: PropTypes.func.isRequired
};

export default GenreQuestion;
