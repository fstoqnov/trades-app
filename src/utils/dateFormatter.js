import dateFormat from "dateformat";

export const formatDateForTable = (date) => {
  const rawDate = new Date(date);

  const formattedToDate = dateFormat(rawDate, `yyyymmdd`);

  return formattedToDate;
};
