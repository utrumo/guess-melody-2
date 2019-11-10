import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
const mockQuestions = [
  {
    type: `artist`,
    song: {
      artist: `Quincas Moreira`,
      src: `https://es31-server.appspot.com/guess-melody/static/music/Blue_Whale.mp3`
    },
    answers: [
      {
        picture: `https://es31-server.appspot.com/guess-melody/static/artist/Quincas_Moreira.jpg`,
        artist: `Quincas Moreira`
      },
      {
        picture: `https://es31-server.appspot.com/guess-melody/static/artist/Density_n_Time.jpg`,
        artist: `Density & Time`
      },
      {
        picture: `https://es31-server.appspot.com/guess-melody/static/artist/Endless_Love.jpg`,
        artist: `Endless Love`
      }
    ]
  },
  {
    type: `genre`,
    genre: `reggae`,
    answers: [
      {
        src: `https://es31-server.appspot.com/guess-melody/static/music/Addis_Ababa.mp3`,
        genre: `reggae`
      },
      {
        src: `https://es31-server.appspot.com/guess-melody/static/music/Azure.mp3`,
        genre: `electronic`
      },
      {
        src: `https://es31-server.appspot.com/guess-melody/static/music/Whaling_City.mp3`,
        genre: `country`
      },
      {
        src: `https://es31-server.appspot.com/guess-melody/static/music/Skanada.mp3`,
        genre: `reggae`
      }
    ]
  }
];

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
      gameTime={5}
      errorCount={2}
      questions={mockQuestions}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
