const { cronParser } = require('./src/parser');
const { formatOutput } = require('./utils/formatOutput');

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

module.exports = { main };
