import { useCallback, useState } from 'react'

const useCountdown = () => {
  const [disabledButton, setDisabledButton] = useState<boolean>(false)
  const [timer, setTimer] = useState<boolean>(false)

	const onStop = useCallback(() => {
    setDisabledButton(false)
    setTimer(false)
  }, [])
  
  const startTimer = useCallback(() => {
    setTimer(true)
    setDisabledButton(true)
  }, [])

	return { disabledButton, timer, onStop, startTimer}
}

export default useCountdown
