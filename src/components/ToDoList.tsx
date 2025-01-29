import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";

interface TodoListProps {
  todo: string[];
  onEdit: (index: number, newTodo: string) => void;
  onDelete: (index: number) => void;
}
function ToDoList({ todo, onEdit, onDelete }: TodoListProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [todoDone , setTodoDone] = useState<boolean>(false)
  const [todoIndexDone , setTodoIndexDone] = useState<number>()

  const handleSaveEdit = (index: number) => {
    onEdit(index, editText);
    setEditIndex(null);
    setEditText("");
  };
  const handleDone = (index:number)=>{
    setTodoDone(true)
    setTodoIndexDone(index)
  }
  return (
    <div className="w-8/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
      {todo.map((item, index) => (
        <div
          className={` ${todoDone && todoIndexDone===index ? "bg-green-600" : "bg-[#b9b9b9]"}  rounded-md p-3 flex justify-between`}
          key={index}
        >
          {editIndex === index ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border-b border-[#e2e2e2] focus:outline-0 "
            />
          ) : (
            <div className={`${todoDone ? "" : ""}`}>{item}</div>
          )}

          <div className="flex items-center gap-3 text-xl cursor-pointer">
            <span>
              {editIndex === index ? (
                <button className="cursor-pointer" onClick={() => handleSaveEdit(index)}>
                  <TiTick />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setEditText(item);
                  }}
                  className="cursor-pointer"
                >
                  <MdEdit />
                </button>
              )}
            </span>
            <span onClick={() => onDelete(index)}>
              <MdDelete />
            </span>
            <span onClick={()=> handleDone(index)}>
              <FaCheck  />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ToDoList;
