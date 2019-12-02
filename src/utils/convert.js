const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;

const toMilliseconds = (minutesCount) => {
  return minutesCount * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
};

export {
  toMilliseconds
};
