export function generateUniqId(prefix = "", length = 10) {
  return (
    prefix +
    parseInt(
      Math.ceil(Math.random() * Date.now())
        .toPrecision(length)
        .toString()
        .replace(".", ""),
    )
  );
}
