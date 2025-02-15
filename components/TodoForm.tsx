import { FormEvent, useState } from "react"
interface TodoFormProps {
  onSubmit: (item: string) => void;
}
export function TodoForm({ onSubmit }: TodoFormProps) {
  const [newItem, setNewItem] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (newItem === "") return

    onSubmit(newItem)

    setNewItem("")
  }

  return (
    <>
      <form onSubmit={handleSubmit} >
        <div className="input-group mb-3">
          <input
            className="form-control"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
            placeholder="New Task"
          />
          <button className="btn btn-primary" id="button-addon2">Add Task</button>
        </div>
      </form>
    </>
  )
}
