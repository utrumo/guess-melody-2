import ActionCreator from './action-creater.js';
import {ActionType} from '../shared/consts.js';

describe(`ActionCreator: changeScreen`, () => {
  const INCREMENT_STEP_ACTION = {type: ActionType.INCREMENT_STEP, payload: 1};
  const RESET_ACTION = {type: ActionType.RESET};

  it(`Must return INCREMENT_STEP action if questionsCount didn't pass`, () => {
    const dispatch = jest.fn();
    const getState = () => ({step: 0, mistakes: 0});

    ActionCreator.changeScreen()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(INCREMENT_STEP_ACTION);
  });

  it(`Must return INCREMENT_STEP, if mistakes < maxMistakes and question isn't last`, () => {
    const questionsCount = 4;
    const maxMistakes = 3;
    const dispatch = jest.fn();
    const getState = () => ({step: 0, mistakes: 0});

    ActionCreator.changeScreen(questionsCount, maxMistakes)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(INCREMENT_STEP_ACTION);
  });

  it(`Must return RESET, if mistakes = maxMistakes`, () => {
    const questionsCount = 4;
    const maxMistakes = 3;
    const dispatch = jest.fn();
    const getState = () => ({step: 0, mistakes: 3});

    ActionCreator.changeScreen(questionsCount, maxMistakes)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(RESET_ACTION);
  });

  it(`Must return RESET, if current question is last`, () => {
    const questionsCount = 4;
    const maxMistakes = 3;
    const dispatch = jest.fn();
    const getState = () => ({step: 4, mistakes: 0});

    ActionCreator.changeScreen(questionsCount, maxMistakes)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(RESET_ACTION);
  });
});

describe(`ActionCreator: checkAnswer`, () => {
  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    const question = {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``
      },
      answers: [
        {
          artist: `correct`,
          picture: ``
        },
        {
          artist: `incorrect`,
          picture: ``
        },
        {
          artist: `incorrect-2`,
          picture: ``
        }
      ]
    };
    const answer = {artist: `correct`, picture: ``};
    expect(ActionCreator.checkAnswer(question, answer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    const question = {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``
      },
      answers: [
        {
          artist: `correct`,
          picture: ``
        },
        {
          artist: `incorrect`,
          picture: ``
        },
        {
          artist: `incorrect-2`,
          picture: ``
        }
      ]
    };
    const answer = {
      artist: `incorrect`,
      picture: ``
    };
    expect(ActionCreator.checkAnswer(question, answer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    const question = {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``
        },
        {
          genre: `jazz`,
          src: ``
        },
        {
          genre: `blues`,
          src: ``
        },
        {
          genre: `blues`,
          src: ``
        }
      ]
    };
    const answer = [false, true, false, false];
    expect(ActionCreator.checkAnswer(question, answer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    const question = {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `blues`,
          src: ``
        },
        {
          genre: `blues`,
          src: ``
        },
        {
          genre: `blues`,
          src: ``
        },
        {
          genre: `blues`,
          src: ``
        }
      ]
    };
    const answer = [true, true, true, true];

    expect(ActionCreator.checkAnswer(question, answer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    });
  });
});
