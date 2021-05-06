const moment = require("moment");

const getHoursDifference = (date) => {
  const now = moment();
  const difference = now.diff(date, "hours");

  return difference;
};

module.exports = getHoursDifference;
