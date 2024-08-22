const numbersBetweenRange = (start, end, step = 1) => {
  const values = [];
  for (let i = start; i <= end; i += step) {
    values.push(i);
  }
  return values;
};

module.exports = { numbersBetweenRange };