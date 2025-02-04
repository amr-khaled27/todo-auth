"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import {
  addTodoToFirestore,
  updateTodoDoneInFirestore,
  fetchTodosForUser,
} from "@/app/utils/firebaseFunctions";
import PleaseSignIn from "@/app/_components/PleaseSignIn";
import PleaseVerifyYourEmail from "@/app/_components/PleaseVerifyYourEmail";
import SignOut from "../_components/SignOut";
import TodoItem from "../_components/TodoItem";
import { BeatLoader } from "react-spinners";

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
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(true);
  const [adding, setAdding] = useState<boolean>(false);

  const authContext = useAuth();
  const user = authContext ? authContext.user : null;

  useEffect(() => {
    if (user) {
      setIsEmailVerified(user.emailVerified);
    }
  }, [user]);

  const addTodo = async () => {
    if (newTodo.text.trim() !== "") {
      setAdding(true);
      const todoWithId = { ...newTodo, id: new Date().toISOString() };
      const successful = await addTodoToFirestore(todoWithId);
      if (successful) {
        setTodos([...todos, todoWithId]);
        setNewTodo(initialTodo);
        setAdding(false);
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
      <SignOut
        authContext={authContext}
        setClickedSignOut={setClickedSignOut}
      />
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
            className="ml-2 w-24 bg-colors-text-50 text-colors-text-950 bg-primary-500 p-2 rounded hover:bg-primary-600"
          >
            {adding ? <BeatLoader size={5} /> : "Add Task"}
          </button>
        </div>
        <div className="container mx-auto">
          <ul>
            {todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                index={index}
                updateTodo={updateTodo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
