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
  const [todoDone, setTodoDone] = useState<Set<number>>(new Set());

  const handleSaveEdit = (index: number) => {
    onEdit(index, editText);
    setEditIndex(null);
    setEditText("");
  };
  const handleDone = (index: number) => {
    setTodoDone((prev) => {
      const updateDone = new Set(prev);
      if (updateDone.has(index)) {
        updateDone.delete(index);
      } else {
        updateDone.add(index);
      }
      return updateDone;
    });
  };
  return (
    <div className="w-8/12 mx-auto grid grid-cols-1 xl:grid-cols-2 gap-5">
      {todo.map((item, index) => (
        <div
          className={`rounded-md ${
            todoDone.has(index) ? "bg-green-400" : "bg-[#b9b9b9]"
          }  p-3 flex justify-between`}
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
            <div>{item}</div>
          )}

          <div className="flex items-center gap-3 text-xl cursor-pointer">
            <span>
              {editIndex === index ? (
                <button
                  className="cursor-pointer"
                  onClick={() => handleSaveEdit(index)}
                >
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
            <span onClick={() => handleDone(index)}>
              <FaCheck />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ToDoList;
