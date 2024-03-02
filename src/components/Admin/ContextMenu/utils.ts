export const getDate = (data: string) => {
  const date = new Date(data);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.length === 2 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  const day = `${date.getDate().toString().length === 2 ? date.getDate() : `0${date.getDate()}`}`;
  const hour = `${date.getHours().toString().length === 2 ? date.getHours() : `0${date.getHours()}`}`;
  const minutes = `${date.getMinutes()}`;

  return { year, month, day, hour, minutes };
};
