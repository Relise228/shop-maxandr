import axios from "axios"
import React, { useEffect, useState } from "react"

const SectionRow = ({ creatableMode, item, endpoint, onEditSuccess, onCreateSuccess, onDeleteSuccess }) => {
  const [input, setInput] = useState(item?.name ?? "")
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState("")

  useEffect(() => {
    setInput(item?.name ?? "")
  }, [item?.name])

  useEffect(() => {
    if (err) {
      console.log(err, "err")
    }
  }, [err])

  const revertHandler = () => setInput(item?.name || "")

  const deleteHandler = async e => {
    e.preventDefault()
    if (!input) return
    try {
      setIsLoading(true)

      await axios.delete(`/api/${endpoint}/${item._id}`)
      onDeleteSuccess(item._id)

      setErr("")
      setIsLoading(false)
    } catch (err) {
      setInput(item?.name || "")
      setErr(err?.response?.data?.message || "Something went wrong")
      setIsLoading(false)
    }
  }

  const submitHandler = async e => {
    e.preventDefault()
    if (!input) return
    try {
      setIsLoading(true)
      const payload = { name: input }
      if (creatableMode) {
        const {
          data: { data: newItem }
        } = await axios.post(`/api/${endpoint}`, payload)
        onCreateSuccess(newItem)
        setInput("")
      } else {
        await axios.put(`/api/${endpoint}/${item._id}`, payload)
        onEditSuccess(input, item._id)
      }

      setErr("")
      setIsLoading(false)
    } catch (err) {
      setInput(item?.name || "")
      setErr(err?.response?.data?.message || "Something went wrong")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-between items-center mb-2">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md px-2 py-1"
        id="name"
        required
        onChange={e => setInput(e.target.value ?? "")}
        value={input}
      />
      <button
        disabled={isLoading || input === (item?.name || "")}
        onClick={submitHandler}
        className="bg-emerald-300 disabled:bg-emerald-100 disabled:opacity-75  py-1 px-2 rounded-lg mx-2"
      >
        {creatableMode ? "Create" : "Submit"}
      </button>
      <button
        disabled={isLoading || input === (item?.name || "")}
        onClick={revertHandler}
        className="bg-orange-300 disabled:bg-orange-100 disabled:opacity-75  py-1 px-2 rounded-lg mx-2"
      >
        Revert
      </button>
      {!creatableMode && (
        <button
          disabled={isLoading}
          onClick={deleteHandler}
          className="bg-red-300 disabled:bg-red-100 disabled:opacity-75 py-1 px-2 rounded-lg mx-2"
        >
          Delete
        </button>
      )}
    </div>
  )
}

export { SectionRow }
