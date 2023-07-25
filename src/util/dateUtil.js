import moment from 'moment';

export function toDisplayDate(date, format = 'yy-MM-DD hh:mm') {
  if (!date) {
    return date;
  }
  return moment(date).format(format);
}

export function toDisplayDateFromDouble(doubleDate, format) {
  if (!doubleDate) {
    return doubleDate;
  }
  return toDisplayDate(doubleDate * 1000, format);
}

export function toApplicationLocalDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

export function toApplicationOffsetDateTime(date) {
  if (!date) {
    return;
  }
  const applicationDate = new Date(date);
  applicationDate.setSeconds(0);
  return applicationDate.toISOString();
}

export function getDate(addSubstractNumberOfDate = 0) {
  if (addSubstractNumberOfDate === 0) {
    return moment();
  } else if (addSubstractNumberOfDate > 0) {
    return moment().add(addSubstractNumberOfDate, 'days');
  } else {
    return moment().subtract(Math.abs(addSubstractNumberOfDate), 'days');
  }
}

export function getUserFriendlyDisplayDate(inputTime1, inputTime2, suffix = '') {
  const time1 = moment(inputTime1);
  const time2 = moment(inputTime2);

  // Calculate the time difference in milliseconds
  const diffMilliseconds = Math.abs(time1.diff(time2));

  // Calculate the time difference in seconds, minutes, hours, and days
  const diffSeconds = moment.duration(diffMilliseconds).asSeconds();
  const diffMinutes = moment.duration(diffMilliseconds).asMinutes();
  const diffHours = moment.duration(diffMilliseconds).asHours();
  const diffDays = moment.duration(diffMilliseconds).asDays();

  // Determine the appropriate time unit and display the result
  let result;
  if (diffSeconds < 60) {
    result = Math.round(diffSeconds) + ' Second';
  } else if (diffMinutes < 60) {
    result = Math.round(diffMinutes) + ' Minute';
  } else if (diffHours < 24) {
    result = Math.round(diffHours) + ' Hour';
  } else {
    result = Math.round(diffDays) + ' Day';
  }
  return result + ' ' + suffix;
}
