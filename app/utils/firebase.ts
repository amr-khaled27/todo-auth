import { getAuth } from "firebase/auth";
import { Todo } from "@/app/dashboard/page";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase";

const addTodoToFirestore = async (todo: Todo): Promise<boolean> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No authenticated user found");
    return false;
  }

  try {
    await addDoc(collection(db, "todos"), {
      ...todo,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

const updateTodoDoneInFirestore = async (id: string, done: boolean) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No authenticated user found");
    return;
  }

  try {
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
      if (doc.data().id === id && doc.data().userId === user.uid) {
        updateDoc(doc.ref, { done });
      }
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

const removeTodoFromFirestore = async (id: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const querySnapshot = await getDocs(collection(db, "todos"));
      querySnapshot.forEach((doc) => {
        if (doc.data().id === id && doc.data().userId === user.uid) {
          deleteDoc(doc.ref);
        }
      });
    } else {
      console.error("No authenticated user found");
    }
  } catch (e) {
    console.error("Error removing document: ", e);
  }
};

const fetchTodosForUser = async (): Promise<Todo[]> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No authenticated user found");
    return [];
  }

  try {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const todos: Todo[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().userId === user.uid) {
        todos.push({ id: doc.id, ...doc.data() } as Todo);
      }
    });
    return todos;
  } catch (e) {
    console.error("Error fetching documents: ", e);
    return [];
  }
};

export {
  addTodoToFirestore,
  updateTodoDoneInFirestore,
  removeTodoFromFirestore,
  fetchTodosForUser,
};
