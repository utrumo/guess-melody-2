import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import rules from './mocks/rules';
import questions from './mocks/questions.js';

const init = (gameQuestions) => {
  const {gameTime, errorCount} = rules;

  ReactDOM.render(
      <App
        gameTime={gameTime}
        errorCount={errorCount}
        questions={gameQuestions}
      />,
      document.getElementById(`root`)
  );
};

init(questions);
