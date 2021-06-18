export default function threeDots(string, limit) {
  if (string !== null) {
    var dots = '...';
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
  }
  return string;
}
