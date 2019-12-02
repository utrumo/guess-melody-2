import {ActionType} from '../shared/consts.js';
import {toMilliseconds} from '../utils/convert.js';
import rules from '../mocks/rules.js';

const initialState = {
  step: 0,
  mistakes: 0,
  time: toMilliseconds(rules.gameTime)
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP: return Object.assign({}, state, {
      step: state.step + action.payload
    });

    case ActionType.INCREMENT_MISTAKES: return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload
    });

    case ActionType.RESET: return Object.assign({}, initialState);

    case ActionType.TICK_TIMER: return Object.assign({}, state, {
      time: action.payload
    });
  }

  return state;
};

export default reducer
;
