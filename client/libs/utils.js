const utils = (function () {
  function increment (count) {
    if (!isNaN(count)) {
      return ++count
    } else {
      return 0
    }
  }

  function decrement (count) {
    return --count
  }
  return {
    increment,
    decrement
  }
})();

export default utils
