import { useEffect, useState } from "react"
import { TodoForm } from "./components/TodoForm"
import { TodoList } from "./components/TodoList"
import { DragDropContext, DropResult } from "react-beautiful-dnd"



export interface Todo {
  id: string;
  title: string;
  completed: boolean;

}
export type TodoArray = Todo[];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue) as Todo[]
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title: string) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id: string, completed: boolean) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteAllTodo() {
    setTodos([])
  }
  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return

    const items = Array.from(todos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setTodos(items)
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <h1 className="header">Todo List</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <button className="btn-lg btn btn-outline-danger w-100" onClick={deleteAllTodo}>Delete All Tasks</button>
    </DragDropContext>
  )
}