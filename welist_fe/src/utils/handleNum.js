function doubleDigits (num) {
  if (num < 10) {
    num = '0' + num
  }
  return num
}

export { doubleDigits }
