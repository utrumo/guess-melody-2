import reducer from './reducer.js';
import {ActionType} from '../shared/consts.js';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const state = undefined;
    const initState = {step: 0, mistakes: 0, time: 300000};
    expect(reducer(state, {})).toEqual(initState);
  });

  it(`Reducer should increment current step by a given value`, () => {
    const state = {step: 0, mistakes: 0, time: 1000};
    const newState = {step: 1, mistakes: 0, time: 1000};
    const enotherNewState = {step: 0, mistakes: 0, time: 1000};

    expect(reducer(state, {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    })).toEqual(newState);

    expect(reducer(state, {
      type: ActionType.INCREMENT_STEP,
      payload: 0
    })).toEqual(enotherNewState);
  });

  it(`Reducer should increment number of mistakes by a given value`, () => {
    const state = {step: 0, mistakes: 0, time: 2000};
    const newState = {step: 0, mistakes: 1, time: 2000};
    const enotherNewState = {step: 0, mistakes: 0, time: 2000};

    expect(reducer(state, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    })).toEqual(newState);

    expect(reducer(state, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0
    })).toEqual(enotherNewState);
  });

  it(`Reducer should correctly reset application state`, () => {
    const state = {step: 4, mistakes: 2, time: 2000};
    const initialState = {step: 0, mistakes: 0, time: 300000};

    expect(reducer(state, {
      type: ActionType.RESET
    })).toEqual(initialState);
  });

  it(`Reducer should increment time by a given value`, () => {
    const state = {step: 2, mistakes: 1, time: 2000};
    const newState = {step: 2, mistakes: 1, time: 5000};

    expect(reducer(state, {
      type: ActionType.TICK_TIMER,
      payload: 5000
    })).toEqual(newState);
  });
});
