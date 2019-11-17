import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from './audio-player.jsx';

configure({adapter: new Adapter()});

let createRefStub;

beforeAll(() => {
  createRefStub = jest.spyOn(React, `createRef`).mockImplementation(() => ({
    current: {
      play() {},
      pause() {}
    }
  }));
});

afterAll(() => {
  createRefStub.mockRestore();
});

const mock = {
  src: `https://es31-server.appspot.com/guess-melody/static/music/Blue_Whale.mp3`,
  isPlaying: false,
  onPlayButtonClick() {}
};

describe(`AudioPlayer`, () => {
  it(`Must change state isPlaying to true by pressing the play button`, () => {
    const audioPlayer = shallow(<AudioPlayer {...mock} />);
    const button = audioPlayer.find(`button`);

    button.simulate(`click`);
    expect(audioPlayer.state(`isPlaying`)).toBeTruthy();
  });

  it(`Must change state isPlaying to true by click on  the play button
      and change state back to false if clicked again`, () => {
    const audioPlayer = shallow(<AudioPlayer {...mock} />);
    const button = audioPlayer.find(`button`);

    button.simulate(`click`);
    expect(audioPlayer.state(`isPlaying`)).toBeTruthy();

    button.simulate(`click`);
    expect(audioPlayer.state(`isPlaying`)).toBeFalsy();
  });
});
