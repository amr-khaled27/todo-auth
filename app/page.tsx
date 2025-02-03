"use client";
import { useEffect, useState } from "react";
import { app } from "@/app/firebaseConfig";
import { useAuth } from "@/app/providers/AuthProvider";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const authContext = useAuth();
  const currentUser = authContext ? authContext.user : null;

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#010104]">
      <h1 className="pt-4 text-3xl font-semibold text-center">
        Authenticated Todo App
      </h1>
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <p>
            <a href="/dashboard" className="text-blue-500 underline">
              Go to Dashboard
            </a>
          </p>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
}
