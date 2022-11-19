export const apiKey = 'ca7e9ec969ad1cce407a30f2829b0e9f';
export const getTime = (date) => {
  let time = '';
  for (let i = 17; i < 21; i++) {
    time += date[i];
  }
  return time;
};
