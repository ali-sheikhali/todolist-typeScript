import { useState } from "react";
import FormFiled from "./components/FormFiled";
import ToDoList from "./components/ToDoList";

function App() {
  const [todo, setTodo] = useState<string[]>([])
  const handleTodo = (newTodo:string)=>{
    setTodo((prevTodos)=> [...prevTodos, newTodo])
  }
  return (
    <main className="main">
      <div className="flex justify-center items-center h-60">
        <h1 className="text-2xl font-bold">my todo-s</h1>
      </div>
      <FormFiled onTodo={handleTodo} />
      <ToDoList todo={todo} />
    </main>
  );
}

export default App;
