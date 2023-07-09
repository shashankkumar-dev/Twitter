export const formatDate = (_date: Date): string => {
  const date = new Date(_date);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear().toString();
  return `${day} ${month} ${year}`;
};
