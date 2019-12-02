import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const WARNING_TIME = 30000;
const ClassNames = {
  WARNING: `timer__value--warning`,
  FINISHED: `timer__value--finished`
};

class Timer extends PureComponent {
  render() {
    const className = Timer._getAdditionalClassName(this.props.time);
    const {minutes, seconds} = Timer._getFormattedTime(this.props.time);
    return (
      <div
        className={`timer__value${className}`}
        xmlns="http://www.w3.org/1999/xhtml"
      >
        <span className="timer__mins">{minutes}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">{seconds}</span>
      </div>
    );
  }

  static _getAdditionalClassName(time) {
    const {WARNING, FINISHED} = ClassNames;
    let className = ``;

    if (time < WARNING_TIME && time > 0) {
      className = ` ${WARNING}`;
    } else if (time === 0) {
      className = ` ${FINISHED}`;
    }

    return className;
  }

  static _format(value) {
    return value < 10 ? `0${value}` : `${value}`;
  }

  static _getFormattedTime(time) {
    const date = new Date(time);
    return {
      minutes: Timer._format(date.getMinutes()),
      seconds: Timer._format(date.getSeconds())
    };
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired
};

export default Timer;
