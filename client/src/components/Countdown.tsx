import { useCallback, useEffect, useState } from 'react'
import { PARAGRAPH_CLASS } from '../constants/paragraph'
import useCountdown from '../hooks/useCountdown'

const COUNTDOWN_SECONDS = 10

const Countdown = () => {
	const [seconds, setSeconds] = useState<number>(COUNTDOWN_SECONDS)
	const { timer, onStop } = useCountdown()

	const timerFormatter = useCallback((seconds: number) => {
		const minutes = Math.floor(seconds / 60)
		const remainder = Math.floor(seconds - minutes * 60)
		return `${minutes < 10 ? 0 + minutes.toString() : minutes.toString()}:${
			remainder < 10 ? 0 + remainder.toString() : remainder.toString()
		}`
	}, [])

	const countdown = useCallback(
		() => setInterval(() => setSeconds(prev => prev - 1), 1000),
		[],
  )
  
  const reset = useCallback(() => {
    onStop()
    setSeconds(COUNTDOWN_SECONDS)
  } , [onStop])

	useEffect(() => {
    if(!timer) return

		const interval = countdown()

		if (seconds === 0) {
			clearInterval(interval)
			reset()
		}

		return () => {
			reset()
			clearInterval(interval)
		}
	}, [timer, reset, countdown, seconds])

	return <span className={PARAGRAPH_CLASS}>{timerFormatter(seconds)}</span>
}

export default Countdown
