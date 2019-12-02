import {toMilliseconds} from '../../utils/convert.js';

const CHECK_INTERVAL = 1000;
const MINIMAL_VALUE = 0;

class Timer {
  start(timeLimit, onTick) {
    const limit = toMilliseconds(timeLimit);
    const startTime = Date.now();
    const checkTime = () => Timer._checkTime(limit, startTime, onTick, this.stop);
    this._stop = this.stop.bind(this);

    this.stop();
    this._interval = setInterval(checkTime, CHECK_INTERVAL);
  }

  stop() {
    clearInterval(this._interval);
  }

  static _getRemainedTime(timeLimit, initTime, currentTime) {
    const passedTime = currentTime - initTime;
    return timeLimit - passedTime;
  }

  static _checkTime(timeLimit, startTime, onTick, stop) {
    const currentTime = Date.now();
    const time = Timer._getRemainedTime(timeLimit, startTime, currentTime);

    if (time <= MINIMAL_VALUE) {
      onTick(MINIMAL_VALUE);
      stop();
      return;
    }

    onTick(time);
  }
}

export default Timer;
