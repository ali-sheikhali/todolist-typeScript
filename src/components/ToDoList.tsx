interface TodoListProps {
    todo: string[];
  }
function ToDoList({todo}:TodoListProps) {
    return (
        <div>
            {todo.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    );
}

export default ToDoList