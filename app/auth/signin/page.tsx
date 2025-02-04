"use client";
import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/app/firebase";
import Error from "@/app/_components/Error";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [displayError, setDisplayError] = useState<boolean>(false);

  useEffect(() => {
    if (displayError) {
      const timer = setTimeout(() => {
        setDisplayError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [displayError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.log(error);
        setError("Wrong email or password");
        setTimeout(() => setError(null), 5000);
      });
  };

  return (
    <>
      {error && <Error message={error} />}
      <div className="flex items-center justify-center min-h-screen bg-colors-background-950">
        <div className="w-full max-w-md p-8 space-y-6 bg-colors-background-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-colors-text-50">
            Log In
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 mt-1 border bg-colors-background-700 border-colors-accent-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 mt-1 border bg-colors-background-700 border-colors-accent-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
