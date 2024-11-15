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

export function closeByAnyClick(cb, elem) {
  document.addEventListener("click", (ev) => {
    if (!elem.contains(ev.target)) {
      cb();
      return;
    }
  });
}
