import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

const init = () => {
  const settings = {
    gameTime: 4,
    errorCount: 3,
  };

  ReactDOM.render(
      <App
        gameTime={settings.gameTime}
        errorCount={settings.errorCount}
      />,
      document.getElementById(`root`)
  );
};

init();
