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
      <div className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-3xl font-bold text-primary-500 mb-4 text-gray-900">
          Todo List
        </h1>
        <div className="mb-4 flex justify-center items-center">
          <div className="flex flex-col gap-8 w-fit">
            <div className="flex items-center">
              <input
                type="text"
                value={newTodo.text}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, text: e.target.value })
                }
                className="rounded-l-full p-4 focus:outline-none h-14 bg-gray-200 text-colors-background-950 sm:w-[500px]"
                placeholder="Add a new todo"
              />
              <button
                onClick={addTodo}
                className="w-24 bg-colors-text-200 rounded-r-full text-colors-text-50 bg-primary-500 p-2 h-14 hover:bg-primary-600"
              >
                {adding ? <BeatLoader size={5} color="white" /> : "Add Task"}
              </button>
            </div>

            <ul className="rounded-3xl divide-y-2 bg-gray-200">
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
      </div>
    </>
  );
};

export default Dashboard;
