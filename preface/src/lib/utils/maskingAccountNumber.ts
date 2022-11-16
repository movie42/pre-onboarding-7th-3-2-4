const maskingAccountNumber = (account: string) => {
  const list = account.split("");
  const [first, middle, last] = [
    list[0],
    list.splice(1, list.length - 2, ""),
    list[list.length - 1]
  ];

  const starts = "*".repeat(middle.length);

  return `${first}${starts}${last}`;
};

export default maskingAccountNumber;
