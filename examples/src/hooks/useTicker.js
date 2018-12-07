import { useEffect, useState } from 'react'

const useTicker = () => {
  const [delta, setDelta] = useState(0)
  const [timestamp, setTimestamp] = useState(0)
  useEffect(() => {
    let loopId = null
    let oldTimestamp = 0
    function onFrame(newTimestamp) {
      setTimestamp(newTimestamp)
      let interval = newTimestamp - oldTimestamp
      setDelta(interval ? 16.67 / (newTimestamp - oldTimestamp) : interval)
      oldTimestamp = newTimestamp
      loopId = requestAnimationFrame(onFrame)
    }
    onFrame(0)
    return () => {
      window.cancelAnimationFrame(loopId)
    }
  }, [])
  return { timestamp, delta }
}

export default useTicker
