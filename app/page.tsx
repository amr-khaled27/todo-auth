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
import Link from "next/link";

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
        <div className="flex flex-col text-3xl justify-center items-center h-[calc(100vh_-_52px)]">
          <div className="bg-white text-colors-text-950 p-4 rounded-xl">
            <p className="text-center">Welcome, {user.displayName}</p>
            <p>
              <Link
                href="/dashboard"
                className=" bg-[#010104] text-colors-text-50 p-2 rounded-xl block"
              >
                Go to Dashboard
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[calc(100vh_-_52px)]">
          <div className="flex flex-col gap-2">
            <button
              onClick={signInWithGoogle}
              className="px-4 py-2 w-full bg-blue-500 text-white duration-300 rounded hover:bg-blue-600"
            >
              Sign in with Google
            </button>

            <p className="text-center">Or</p>

            <div className="grid grid-cols-2 gap-4">
              <Link
                className="py-2 text-center bg-blue-500 text-white duration-300 rounded hover:bg-blue-600"
                href="/auth/signup"
              >
                Sign Up
              </Link>
              <Link
                className="py-2 text-center bg-blue-500 text-white duration-300 rounded hover:bg-blue-600"
                href="/auth/signin"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
