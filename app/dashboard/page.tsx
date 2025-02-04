"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import {
  addTodoToFirestore,
  updateTodoDoneInFirestore,
  removeTodoFromFirestore,
  fetchTodosForUser,
} from "@/app/utils/firebase";
import PleaseSignIn from "@/app/_components/PleaseSignIn";
import PleaseVerifyYourEmail from "@/app/_components/PleaseVerifyYourEmail";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const initialTodo = {
  id: "",
  text: "",
  done: false,
};

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>(initialTodo);
  const [clickedSignOut, setClickedSignOut] = useState<boolean>(false);
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setIsEmailVerified(user.emailVerified);
    }
  }, [user]);

  const addTodo = async () => {
    if (newTodo.text.trim() !== "") {
      const todoWithId = { ...newTodo, id: new Date().toISOString() };
      const successful = await addTodoToFirestore(todoWithId);
      if (successful) {
        setTodos([...todos, todoWithId]);
        setNewTodo(initialTodo);
      }
    }
  };

  const updateTodo = (todo: Todo, index: number) => {
    const updatedTodos = todos.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t
    );
    updateTodoDoneInFirestore(todo.id, !todo.done);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    if (!user) {
      console.log("please signin");
    } else {
      console.log("authenticated user");
      fetchTodosForUser().then((fetchedTodos) => {
        setTodos(fetchedTodos);
      });
    }
  }, [user]);

  return (
    <>
      {!user && !clickedSignOut ? <PleaseSignIn /> : null}
      {user && !isEmailVerified ? <PleaseVerifyYourEmail /> : null}
      <div className="fixed top-4 right-4">
        <button
          onClick={() => {
            setClickedSignOut(true);
            authContext?.signOut();
          }}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
      <div className="min-h-screen bg-[#010104] p-4">
        <h1 className="text-3xl font-bold text-primary-500 mb-4">Todo List</h1>
        <div className="mb-4">
          <input
            type="text"
            value={newTodo.text}
            onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
            className="border border-primary-500 p-2 rounded text-colors-background-950"
            placeholder="Add a new todo"
          />
          <button
            onClick={addTodo}
            className="ml-2 bg-primary-500 text-white p-2 rounded hover:bg-primary-600"
          >
            Add
          </button>
        </div>
        <div className="container mx-auto">
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className="bg-background-200 flex justify-between items-center p-2 mb-2 rounded"
              >
                <p className={`${todo.done ? "line-through" : ""}`}>
                  {todo.text}
                </p>
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
                    onClick={async () => {
                      await removeTodoFromFirestore(todo.id);
                      setTodos(todos.filter((_, i) => i !== index));
                    }}
                    className="ml-2 p-2 rounded bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
