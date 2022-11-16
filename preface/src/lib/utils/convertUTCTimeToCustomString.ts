const convertUTCTimeToCustomString = (UTC: Date) => {
  const createDate = new Date(UTC);

  const [year, month, date] = [
    createDate.getFullYear(),
    createDate.getMonth() + 1,
    createDate.getDate()
  ];

  return `${year}년 ${month < 10 ? "0" + month : month}월 ${
    date < 10 ? "0" + date : date
  }일`;
};

export default convertUTCTimeToCustomString;
