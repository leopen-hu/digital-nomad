const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 1000 / 3600)
  const minutes = Math.floor(((duration / 1000) % 3600) / 60)
  const seconds = Math.floor((duration / 1000) % 60)

  const toString = (n: number) => (n < 10 ? `0${n}` : n)

  console.log(hours, minutes, seconds)

  return {
    hours: toString(hours),
    minutes: toString(minutes),
    seconds: toString(seconds),
  }
}

export default formatDuration
