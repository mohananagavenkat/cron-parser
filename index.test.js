const { main } = require('./index');
const { cronParser, parseField } = require('./src/parser');
const { RANGES } = require('./constants');
const { formatOutput } = require('./utils/formatOutput');

describe('Cron Expression Parser', () => {

  let consoleErrorMock;

  beforeEach(() => {
      consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
      consoleErrorMock.mockRestore();
  });

  test('should log an error when no input is provided', () => {
    process.argv = ['node', 'index.js'];
    main();
    expect(consoleErrorMock).toHaveBeenCalledWith('Please provide a cron string to parse');
  });

  test('should log an error when extra fields are provided in input', () => {
    cronParser('*/15 0 1,15 * 1-5 /usr/bin/find something');
    expect(consoleErrorMock).toHaveBeenCalledWith('Invalid cron string format. Expected 6 fields');
  });

  test('should parse minute field with */15', () => {
      const result = parseField('*/15', RANGES.minute);
      expect(result).toEqual([0, 15, 30, 45]);
  });

  test('should parse minute field with 0-30/10', () => {
    const result = parseField('0-30/10', RANGES.minute);
    expect(result).toEqual([0, 10, 20, 30]);
  });

  test('should parse hour field with 0', () => {
      const result = parseField('0', RANGES.hour);
      expect(result).toEqual([0]);
  });

  test('should parse day of month field with 1,15', () => {
      const result = parseField('1,15', RANGES.dayOfMonth);
      expect(result).toEqual([1, 15]);
  });

  test('should parse month field with *', () => {
      const result = parseField('*', RANGES.month);
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  test('should parse day of week field with 1-5', () => {
      const result = parseField('1-5', RANGES.dayOfWeek);
      expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('should parse full cron string correctly', () => {
      const result = cronParser('*/15 0 1,15 * 1-5 /usr/bin/find');
      expect(result).toEqual({
          minute: [0, 15, 30, 45],
          hour: [0],
          dayOfMonth: [1, 15],
          month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          dayOfWeek: [1, 2, 3, 4, 5],
          command: '/usr/bin/find',
      });
  });

  test('should output the parsed results in correct format', () => {
    const result = formatOutput({
      minute: [0, 15, 30, 45],
      hour: [0],
      dayOfMonth: [1, 15],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dayOfWeek: [1, 2, 3, 4, 5],
      command: '/usr/bin/find',
    });
    expect(result).toEqual(`minute        0 15 30 45\nhour          0\nday of month  1 15\nmonth         1 2 3 4 5 6 7 8 9 10 11 12\nday of week   1 2 3 4 5\ncommand       /usr/bin/find`);
  });

});
