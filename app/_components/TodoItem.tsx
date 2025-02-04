"use client";
import { useState } from "react";
import { Todo } from "../dashboard/page";
import { BeatLoader } from "react-spinners";
import { removeTodoFromFirestore } from "../utils/firebaseFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type TodoItemProps = {
  todo: Todo;
  index: number;
  updateTodo: (todo: Todo, index: number) => void;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  updateTodo,
  todos,
  setTodos,
}) => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(todo.done);

  const DeleteTodo = async (todo: Todo, index: number) => {
    setDeleting(true);
    await removeTodoFromFirestore(todo.id);
    setTodos(todos.filter((_, i) => i !== index));
    setDeleting(false);
  };

  const handleCheckboxChange = (todo: Todo, index: number) => {
    updateTodo(todo, index);
    setChecked(!checked);
  };

  return (
    <li
      onClick={() => handleCheckboxChange(todo, index)}
      key={index}
      className="cursor-pointer flex justify-between items-center p-2 text-gray-900 border-gray-300 mx-4"
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => handleCheckboxChange(todo, index)}
          className="checkbox checkbox-md rounded-full border-4 outline-green-500 checked:bg-green-500 checked:text-white [--chkbg:theme(colors.green.500)] [--chkfg:white]"
        />
        <p className={` ${todo.done ? "line-through text-gray-400" : ""}`}>
          {todo.text}
        </p>
      </div>

      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            DeleteTodo(todo, index);
          }}
          className="ml-2 p-2 w-10 h-10 z-50 text-center centered text-lg rounded-full text-gray-400"
        >
          {deleting ? (
            <BeatLoader size={5} color="gray" />
          ) : (
            <FontAwesomeIcon icon={faTrash} />
          )}
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
