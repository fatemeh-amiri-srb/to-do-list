
interface TodoItemProps {
    completed: boolean;
    id: string;
    title: string;
    toggleTodo: (id: string, completed: boolean) => void;

}
export function TodoItem({
    completed,
    id,
    title,
    toggleTodo,

}: TodoItemProps) {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <label className="form-check-label">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={e => toggleTodo(id, e.target.checked)}
                        className="form-check-input"
                    />
                    <span className={completed ? 'text-decoration-line-through' : ''}>
                        {title}
                    </span>
                </label>
            </div>
        </>
    )
}