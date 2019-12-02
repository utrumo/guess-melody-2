import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';
import {QuestionType} from '../../shared/consts.js';

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {isPlaying: false};

    this._playButtonClickHandler = this._playButtonClickHandler.bind(this);
  }

  _playButtonClickHandler() {
    this.setState(({isPlaying}) => ({isPlaying: !isPlaying}));
  }

  render() {
    const {question: {song: {src}, answers}, step, onAnswer} = this.props;
    const {isPlaying} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <AudioPlayer
              src={src}
              isPlaying={isPlaying}
              onPlayButtonClick={this._playButtonClickHandler}
            />
          </div>
        </div>

        <form className="game__artist">
          {answers.map((it, i) => (
            <div key={`${step}-answer-${i}`} className="artist">
              <button
                className="artist__input visually-hidden"
                type="button"
                name="answer"
                id={`answer-${i}`}
                onClick={() => onAnswer(it)}
              />
              <label className="artist__name" htmlFor={`answer-${i}`}>
                <img className="artist__picture" src={it.picture} alt={it.artist} />
                {it.artist}
              </label>
            </div>
          ))}
        </form>
      </section>
    );
  }
}

ArtistQuestionScreen.propTypes = {
  question: PropTypes.exact({
    type: PropTypes.oneOf([QuestionType.ARTIST]),
    song: PropTypes.exact({
      artist: PropTypes.string,
      src: PropTypes.string
    }),
    answers: PropTypes.arrayOf(PropTypes.exact({
      picture: PropTypes.string,
      artist: PropTypes.string
    }))
  }).isRequired,
  step: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default ArtistQuestionScreen;
