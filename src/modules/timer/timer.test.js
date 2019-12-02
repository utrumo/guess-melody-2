import Timer from './timer.js';

it(`Should return the correct number of remaining milliseconds.`, () => {
  const startTime = new Date(`2019-12-04T18:20:00`).getTime();
  const currentTime = new Date(`2019-12-04T18:20:05`).getTime();
  const timeLimit = 35000;
  const expectedRemainedTime = 30000;
  const remainedTime = Timer._getRemainedTime(timeLimit, startTime, currentTime);

  expect(remainedTime).toEqual(expectedRemainedTime);
});

it(`Should call onTick callback with correct number of remaining milliseconds`, () => {
  const startTime = new Date(`2019-12-04T18:20:00`).getTime();
  const currentTime = new Date(`2019-12-04T18:20:04`).getTime();
  const timeLimit = 30000;
  const expectedRemainedTime = 26000;
  const onTick = jest.fn();
  const mockFn = jest.spyOn(Date, `now`).mockImplementation(() => currentTime);

  Timer._checkTime(timeLimit, startTime, onTick, jest.fn());
  mockFn.mockRestore();

  expect(onTick).toBeCalledWith(expectedRemainedTime);
});

it(`Should call onTick with correct value and stopTimer`, () => {
  const startTime = new Date(`2019-12-04T18:20:00`).getTime();
  const currentTime = new Date(`2019-12-04T18:21:04`).getTime();
  const timeLimit = 30000;
  const expectedRemainedTime = 0;
  const onTick = jest.fn();
  const stopTimer = jest.fn();
  const mockFn = jest.spyOn(Date, `now`).mockImplementation(() => currentTime);

  Timer._checkTime(timeLimit, startTime, onTick, stopTimer);
  mockFn.mockRestore();

  expect(onTick).toBeCalledWith(expectedRemainedTime);
  expect(stopTimer).toBeCalled();
});
