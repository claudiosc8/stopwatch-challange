import { useState, useRef } from 'react';



const useTimer = (initialState = 0) => {

  const [timer, setTimer] = useState(initialState)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [laps, setLap] = useState([])
  const countRef = useRef(null)

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 10)
  }

  const handlePause = () => {
    clearInterval(countRef.current)
    setIsPaused(false)
  }

  const handleResume = () => {
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 10)
  }

  const handleLap = () => {
    const sum = laps.reduce((acc, value) => acc + value.current, 0);
    const newlap = {current: timer - sum, total: timer, index: laps.length + 1}
    setLap((laps) => [newlap, ...laps])
  }

  const handleReset = () => {
    clearInterval(countRef.current)
    setLap([])
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
  }

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset, handleLap, laps }

}

export default useTimer;