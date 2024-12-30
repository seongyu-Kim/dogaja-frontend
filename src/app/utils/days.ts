export default function days(date: string) {
  const splitDay = date.split("~");
  const start = new Date(splitDay[0]);
  const end = new Date(splitDay[1]);
  return [
    splitDay[0],
    splitDay[1],
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  ];
}
