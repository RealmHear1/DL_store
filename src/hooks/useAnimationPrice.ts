import React, {useEffect} from "react";

export const useAnimationPrice = (startRef: React.RefObject<number>, animationRef: React.RefObject<number | null>, price: number, setValue: (value: number) => void) => {
  useEffect(() => {
    const startValue = startRef.current
    const targetValue = price
    const duration = 250
    const startTime = performance.now()

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const nextValue = startValue + (targetValue - startValue) * progress
      setValue(nextValue)
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [price])
}