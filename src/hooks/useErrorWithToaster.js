import React from "react"
import { toast } from "react-toastify"

const useErrorWithToaster = ({ withToaster }) => {
  const [errorMessage, setErrorMessage] = React.useState("")

  React.useEffect(() => {
    if (errorMessage && withToaster) {
      toast.error(errorMessage)
    }
  }, [errorMessage, withToaster])

  return { setErrorMessage, errorMessage }
}

export { useErrorWithToaster }
