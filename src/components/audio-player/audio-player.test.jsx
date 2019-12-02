import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player.jsx';
import createAudioNodeMock from '../../mocks/audio-node-mock';

const mock = {
  src: `https://htmlacademy-react-2.appspot.com/guess-melody/static/music/Azure.mp3`,
  isPlaying: false,
  onPlayButtonClick: jest.fn()
};

it(`AudioPlayer correctly rnders after relaunch`, () => {
  const audioPlayer = renderer
    .create(
        <AudioPlayer {...mock} />,
        createAudioNodeMock
    )
    .toJSON();
  expect(audioPlayer).toMatchSnapshot();
});
