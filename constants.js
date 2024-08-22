const CRON_SPECIAL_STRINGS = {
  WILDCARD: '*',
  RANGE: '-',
  STEP: '/',
  LIST: ',',
};

const RANGES = {
  minute: { min: 0, max: 59 },
  hour: { min: 0, max: 23 },
  dayOfMonth: { min: 1, max: 31 },
  month: { min: 1, max: 12 },
  dayOfWeek: { min: 1, max: 7 },
};

module.exports = { CRON_SPECIAL_STRINGS, RANGES };