import { TodoItem } from "./TodoItem"
import { Droppable, Draggable } from "react-beautiful-dnd"

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: string, completed: boolean) => void;
}

export function TodoList({
    todos,
    toggleTodo,
}: TodoListProps) {
    return (
        <Droppable droppableId="todos">
            {(provided) => (
                <ul className="list list-group" {...provided.droppableProps} ref={provided.innerRef}
                    style={{ listStyleType: 'none', padding: 0 }}
                >
                    {todos.map((todo, index) => (
                        <Draggable key={todo.id} draggableId={todo.id} index={index}>
                            {(provided) => (
                                <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        margin: '10px 0',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <TodoItem
                                        {...todo}
                                        toggleTodo={toggleTodo}
                                    />
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    )
}