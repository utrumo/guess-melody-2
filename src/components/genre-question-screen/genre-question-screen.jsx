import React, {PureComponent} from 'react';
import AudioPlayer from '../audio-player/audio-player.jsx';
import PropTypes from 'prop-types';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      activePLayer: -1
    };

    this._handleChange = this._handleChange.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  _getCheckedStatus(value) {
    return this.state.answers.includes(value);
  }

  _handleChange(evt) {
    const {target: {value}} = evt;
    const checked = this._getCheckedStatus(value);

    if (!checked) {
      this.setState((oldState) => ({
        answers: oldState.answers.concat(value)
      }));
    } else {
      this.setState((oldState) => ({
        answers: oldState.answers.filter((it) => it !== value)
      }));
    }
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this.props.onAnswer(this.state.answers);
  }

  render() {
    const {question: {genre, answers}, screenIndex, children} = this.props;

    return <section className="game game--genre">
      {children}
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={this._submitHandler}>

          {answers.map(({src}, i) => (
            <div key={`${screenIndex}-answer-${i}`} className="track">
              <AudioPlayer
                src={src}
                isPlaying={i === this.state.activePlayer}
                onPlayButtonClick={() => this.setState({
                  activePlayer: i === this.state.activePlayer ? -1 : i
                })}/>
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox"
                  name="answer"
                  value={`answer-${i}`}
                  id={`answer-${i}`}
                  checked={this._getCheckedStatus(`answer-${i}`)}
                  onChange={this._handleChange}
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          ))};

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>;
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.exact({
    type: PropTypes.oneOf([`genre`]),
    genre: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.exact({
      src: PropTypes.string,
      genre: PropTypes.string
    }))
  }),
  screenIndex: PropTypes.number,
  children: PropTypes.element
};

export default GenreQuestionScreen;
