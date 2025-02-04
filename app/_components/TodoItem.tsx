"use client";
import { useState } from "react";
import { Todo } from "../dashboard/page";
import { BeatLoader } from "react-spinners";
import { removeTodoFromFirestore } from "../utils/firebaseFunctions";

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

  const DeleteTodo = async (todo: Todo, index: number) => {
    setDeleting(true);
    await removeTodoFromFirestore(todo.id);
    setTodos(todos.filter((_, i) => i !== index));
    setDeleting(false);
  };

  return (
    <li
      key={index}
      className="bg-background-200 flex justify-between items-center p-2 mb-2 rounded"
    >
      <p className={`${todo.done ? "line-through" : ""}`}>{todo.text}</p>
      <div>
        <button
          onClick={() => {
            updateTodo(todo, index);
          }}
          className={`ml-2 p-2 rounded duration-300 ${
            todo.done ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {todo.done ? "Undo" : "Done"}
        </button>

        <button
          onClick={() => DeleteTodo(todo, index)}
          className="ml-2 p-2 w-16 text-center rounded bg-red-500 text-white"
        >
          {deleting ? <BeatLoader size={5} /> : "Delete"}
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
