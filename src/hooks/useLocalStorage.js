import React from "react"

export const useLocalStorage = (key, fallbackValue) => {
  const [value, setValue] = React.useState(fallbackValue)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(key)
      setValue(stored ? JSON.parse(stored) : fallbackValue)
    }
  }, [fallbackValue, key])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}
