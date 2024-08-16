const ranges = require('./config').ranges;

const parseField = (field, range) => {

  if(!field) return [];

  if (field === '*') {
      return Array.from({ length: range.max - range.min + 1 }, (_, i) => i + range.min);
  }

  return field.split(',').flatMap(part => {
      if (part.includes('/')) {
          const [rangePart, step] = part.split('/');
          const stepValue = parseInt(step);
          let [start, end] = [range.min, range.max];
          if (rangePart !== '*') {
              [start, end] = rangePart.split('-').map(Number);
          }
          return Array.from({ length: Math.floor((end - start) / stepValue) + 1 }, (_, i) => start + i * stepValue);
      }

      if (part.includes('-')) {
          const [start, end] = part.split('-').map(Number);
          return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      }

      return parseInt(part);
  })
};

const cronParser = (stringToParse) => {
  const [minuteField, hourField, dayOfMonthField, monthField, dayOfWeekField, command] = stringToParse.split(' ');

  const minute = parseField(minuteField, ranges.minute);
  const hour = parseField(hourField, ranges.hour);
  const dayOfMonth = parseField(dayOfMonthField, ranges.dayOfMonth);
  const month = parseField(monthField, ranges.month);
  const dayOfWeek = parseField(dayOfWeekField, ranges.dayOfWeek);

  return {
      minute,
      hour,
      dayOfMonth,
      month,
      dayOfWeek,
      command,
  };
};

const formatOutput = (parsedCron) => {
  const formatted = [
      `minute        ${parsedCron.minute.join(' ')}`,
      `hour          ${parsedCron.hour.join(' ')}`,
      `day of month  ${parsedCron.dayOfMonth.join(' ')}`,
      `month         ${parsedCron.month.join(' ')}`,
      `day of week   ${parsedCron.dayOfWeek.join(' ')}`,
      `command       ${parsedCron.command}`,
  ];

  return formatted.join('\n');
};

const main = () => {
  const input = process.argv[2];
  if (!input) {
      console.error('Please provide a cron string to parse');
      return;
  }

  const parsedCron = cronParser(input);
  console.log(formatOutput(parsedCron));
};

main();

module.exports = { cronParser, formatOutput, parseField, main };
