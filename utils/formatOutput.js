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

module.exports = { formatOutput };