import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import GameHeader from '../game-header/game-header.jsx';

class App extends PureComponent {
  static getScreen(index, props, onUserAnswer) {
    if (index === -1) {
      const {gameTime, errorCount} = props;

      return <WelcomeScreen
        time={gameTime}
        errorCount={errorCount}
        onWelcomeButtonClick={onUserAnswer}
      />;
    }

    const {questions} = props;
    const currentQuestion = questions[index];

    switch (currentQuestion.type) {
      case `artist`:
        return <ArtistQuestionScreen
          onAnswer={onUserAnswer}
          question={currentQuestion}
          screenIndex={index}
        >
          <GameHeader />
        </ArtistQuestionScreen>;
      case `genre`:
        return <GenreQuestionScreen
          onAnswer={onUserAnswer}
          question={currentQuestion}
          screenIndex={index}
        >
          <GameHeader />
        </GenreQuestionScreen>;
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      questionIndex: -1
    };

    this._changeScreen = this._changeScreen.bind(this);
  }

  _changeScreen() {
    this.setState((prevState) => {
      const nextIndex = prevState.questionIndex + 1;
      const isEnd = nextIndex >= this.props.questions.length;

      return {
        questionIndex: !isEnd ? nextIndex : -1
      };
    });
  }

  render() {
    return App.getScreen(this.state.questionIndex, this.props, this._changeScreen);
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.oneOfType([

    PropTypes.exact({
      type: PropTypes.oneOf([`artist`]),
      song: PropTypes.exact({
        artist: PropTypes.string,
        src: PropTypes.string
      }),
      answers: PropTypes.arrayOf(PropTypes.exact({
        picture: PropTypes.string,
        artist: PropTypes.string
      }))
    }),

    PropTypes.exact({
      type: PropTypes.oneOf([`genre`]),
      genre: PropTypes.string,
      answers: PropTypes.arrayOf(PropTypes.exact({
        src: PropTypes.string,
        genre: PropTypes.string
      }))
    })

  ])).isRequired
};

export default App;
