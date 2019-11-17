import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying
    };

    this._audioRef = React.createRef();

    this._canPlayThroughHandler = this._canPlayThroughHandler.bind(this);
    this._playHandler = this._playHandler.bind(this);
    this._pauseHandler = this._pauseHandler.bind(this);
    this._timeUpdateHandler = this._timeUpdateHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
  }

  componentDidMount() {
    const {src} = this.props;
    const {current: audio} = this._audioRef;

    audio.src = src;
    audio.oncanplaythrough = this._canPlayThroughHandler;
    audio.onplay = this._playHandler;
    audio.onpause = this._pauseHandler;
    audio.ontimeupdate = this._timeUpdateHandler;
  }

  componentDidUpdate() {
    const {current: audio} = this._audioRef;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const {current: audio} = this._audioRef;

    audio.src = ``;
    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
  }

  _canPlayThroughHandler() {
    this.setState({isLoading: false});
  }

  _playHandler() {
    this.setState({isPlaying: true});
  }

  _pauseHandler() {
    this.setState({isPlaying: false});
  }

  _timeUpdateHandler({target: audio}) {
    this.setState({progress: audio.currentTime});
  }

  _clickHandler() {
    this.props.onPlayButtonClick();
    this.setState({isPlaying: !this.state.isPlaying});
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this._clickHandler}
        />
        <div className="track__status">
          <audio ref={this._audioRef} />
        </div>
      </Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired
};

export default AudioPlayer;
