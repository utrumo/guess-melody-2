import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answer: ``,
      isPlaying: false
    };

    this._getCheckedStatus = this._getCheckedStatus.bind(this);
    this._playButtonClickHandler = this._playButtonClickHandler.bind(this);
    this._changeHandler = this._changeHandler.bind(this);
  }

  _getCheckedStatus(value) {
    return this.state.answer === value;
  }

  _playButtonClickHandler() {
    this.setState(({isPlaying}) => ({isPlaying: !isPlaying}));
  }

  _changeHandler(evt) {
    const {target: {value}} = evt;
    this.setState(() => ({answer: value}), () => {
      this.props.onAnswer(this.state.answer);
    });
  }

  render() {
    const {question: {song: {src}, answers}, screenIndex, children} = this.props;
    const {isPlaying} = this.state;

    return <section className="game game--artist">
      {children}
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
          {answers.map(({picture, artist}, i) => {
            return <div key={`${screenIndex}-answer-${i}`} className="artist">
              <input
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={`answer-${i}`}
                id={`answer-${i}`}
                checked={this._getCheckedStatus(`answer-${i}`)}
                onChange={this._changeHandler}
              />
              <label className="artist__name" htmlFor={`answer-${i}`}>
                <img className="artist__picture" src={picture} alt={artist} />
                {artist}
              </label>
            </div>;
          })}
        </form>
      </section>
    </section>;
  }
}

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.exact({
    type: PropTypes.oneOf([`artist`]),
    song: PropTypes.exact({
      artist: PropTypes.string,
      src: PropTypes.string
    }),
    answers: PropTypes.arrayOf(PropTypes.exact({
      picture: PropTypes.string,
      artist: PropTypes.string
    }))
  }).isRequired,
  screenIndex: PropTypes.number.isRequired,
  children: PropTypes.element
};

export default ArtistQuestionScreen;
