import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import reducer from './store/reducer.js';
import App from './components/app/app.jsx';
import rules from './mocks/rules.js';
import questions from './mocks/questions.js';

const init = (gameQuestions, gameRules) => {
  const {gameTime, maxMistakes} = gameRules;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
      reducer,
      composeEnhancers(applyMiddleware(thunk))
  );

  ReactDOM.render((
    <Provider store={store}>
      <App
        gameTime={gameTime}
        maxMistakes={maxMistakes}
        questions={gameQuestions}
      />
    </Provider>
  ),
  document.getElementById(`root`)
  );
};

init(questions, rules);
