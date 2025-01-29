import { useEffect, useState } from "react";
import FormFiled from "./components/FormFiled";
import ToDoList from "./components/ToDoList";

function App() {
  const [todo, setTodo] = useState<string[]>(()=>{
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(()=>{
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      setTodo(JSON.parse(savedTodos));
    }
  }, [])
  useEffect(()=>{
    localStorage.setItem("todos" , JSON.stringify(todo))
  },[todo])

  const handleEdit = (index : number , newTodo:string)=>{
    const updateTodo = [...todo]
    updateTodo[index] = newTodo
    setTodo(updateTodo)   
  }
  const handleDelete = (index : number)=>{
    const updateTodo = todo.filter((_,i) => i !== index)
    setTodo(updateTodo)
  }

  const handleTodo = (newTodo: string) => {
    setTodo((prevTodos) => [...prevTodos, newTodo]);
  };
  return (
    <main className="main">
      <div className="flex justify-center items-center h-60">
        <h1 className="text-2xl font-bold">my todo-s</h1>
      </div>
      <div className="w-10/12 mx-auto flex flex-col gap-10">
        <FormFiled onTodo={handleTodo} />
        <ToDoList todo={todo} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </main>
  );
}

export default App;
