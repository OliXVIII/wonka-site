const getCurrentDateTime = (): string => {
  const now = new Date();

  return now.toLocaleString("en-CA", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

export default getCurrentDateTime;
