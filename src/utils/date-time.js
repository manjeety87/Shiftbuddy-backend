function parseTimeParts(timeString) {
  if (!timeString || typeof timeString !== "string") {
    return { hour: 0, minute: 0 };
  }

  const [h, m] = timeString.split(":").map(Number);

  return {
    hour: Number.isFinite(h) ? h : 0,
    minute: Number.isFinite(m) ? m : 0,
  };
}

function buildIsoDateTimes(date, startTime, endTime) {
  if (!date) {
    return {
      startDateTime: null,
      endDateTime: null,
    };
  }

  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) {
    return {
      startDateTime: null,
      endDateTime: null,
    };
  }

  const start = parseTimeParts(startTime);
  const end = parseTimeParts(endTime);

  const startDate = new Date(
    year,
    month - 1,
    day,
    start.hour,
    start.minute,
    0,
    0,
  );

  const endDate = new Date(year, month - 1, day, end.hour, end.minute, 0, 0);

  // Overnight support
  if (endDate <= startDate) {
    endDate.setDate(endDate.getDate() + 1);
  }

  return {
    startDateTime: startDate.toISOString(),
    endDateTime: endDate.toISOString(),
  };
}

module.exports = { buildIsoDateTimes };
