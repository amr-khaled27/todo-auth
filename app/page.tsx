"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { app } from "@/app/firebase";
import { useAuth } from "@/app/providers/AuthProvider";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import Link from "next/link";
import SignOut from "./_components/SignOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

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
    <div className="min-h-screen bg-gray-50">
      {user && <SignOut authContext={authContext} />}
      <h1 className="pt-4 text-3xl font-semibold text-center text-black">
        Authenticated Todo App
      </h1>
      {user ? (
        <div className="flex flex-col text-2xl justify-center items-center h-[calc(100vh_-_52px)]">
          <div className="bg-white space-y-2 text-black p-4 rounded-xl shadow-2xl">
            <p className="text-center">Welcome, {user.displayName}</p>
            <p>
              <Link
                href="/dashboard"
                className=" bg-[#010104] text-white font-semibold text-center text-colors-text-50 p-2 rounded-xl block"
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
              className="px-4 py-2 w-full flex items-center text-lg gap-2 bg-white text-black border border-black rounded-full"
            >
              <Image
                src="/googleicon.png"
                alt="Google Logo"
                width={34}
                height={34}
              />
              Sign in with Google
            </button>
            <Link
              className="px-4 py-2 w-full grid grid-cols-3 text-center text-lg gap-4 bg-white text-black border border-black rounded-full"
              href="/auth/signup"
            >
              <span className="flex items-center">
                <FontAwesomeIcon className="ml-2" icon={faUserPlus} />
              </span>
              <span>Sign Up</span>
            </Link>
            <Link
              className="px-4 py-2 w-full grid grid-cols-3 text-center text-lg gap-4 bg-white text-black border border-black rounded-full"
              href="/auth/signin"
            >
              <span className="flex items-center">
                <FontAwesomeIcon className="ml-2" icon={faUser} />
              </span>
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
