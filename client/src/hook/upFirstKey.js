export const upFirstName = (str) => {
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
};
export const getFirstKey = (str) => {
  if (str) {
    return str.split("")[0].toUpperCase();
  }
  return "";
};
