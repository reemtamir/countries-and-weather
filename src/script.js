export const getTime = (date) => {
  let time = '';
  for (let i = 17; i < 21; i++) {
    time += date[i];
  }
  return time;
};
