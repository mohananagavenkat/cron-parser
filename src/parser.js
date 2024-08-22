const { RANGES, CRON_SPECIAL_STRINGS } = require('../constants');
const { numbersBetweenRange } = require('../utils/numbersBetweenRange');
const parseField = (field, range) => {

  if(!field) return [];

  if (field === CRON_SPECIAL_STRINGS.WILDCARD) {
    return numbersBetweenRange(range.min, range.max);
  }

  return field.split(CRON_SPECIAL_STRINGS.LIST).flatMap(part => {

    if (part.includes(CRON_SPECIAL_STRINGS.STEP)) {
      const [rangePart, step] = part.split(CRON_SPECIAL_STRINGS.STEP);
      let [start, end] = ( rangePart === CRON_SPECIAL_STRINGS.WILDCARD ) ? [range.min, range.max] : rangePart.split(CRON_SPECIAL_STRINGS.RANGE).map(Number);
      return numbersBetweenRange(start, end, parseInt(step));
    }

    if (part.includes(CRON_SPECIAL_STRINGS.RANGE)) {
      const [start, end] = part.split(CRON_SPECIAL_STRINGS.RANGE).map(Number);
      return numbersBetweenRange(start, end);
    }

    return parseInt(part);

  })
};

const cronParser = (stringToParse) => {
  const fields = stringToParse.split(' ');

  if (fields.length !== 6) {
    console.error('Invalid cron string format. Expected 6 fields');
  }

  const [minuteField, hourField, dayOfMonthField, monthField, dayOfWeekField, command] = fields;

  const minute = parseField(minuteField, RANGES.minute);
  const hour = parseField(hourField, RANGES.hour);
  const dayOfMonth = parseField(dayOfMonthField, RANGES.dayOfMonth);
  const month = parseField(monthField, RANGES.month);
  const dayOfWeek = parseField(dayOfWeekField, RANGES.dayOfWeek);

  return {
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek,
    command,
  };
};

module.exports = { cronParser, parseField };