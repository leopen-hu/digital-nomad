const formatSeconds = (_seconds: number) => {
  const minutes = Math.floor((_seconds % 3600) / 60)
  const seconds = Math.floor(_seconds % 60)

  const toString = (n: number) => (n < 10 ? `0${n}` : n)

  return {
    minutes: toString(minutes),
    seconds: toString(seconds),
  }
}

export default formatSeconds
