"use client";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { app } from "@/app/firebase";
import Error from "@/app/_components/Error";
import { useAuth } from "@/app/providers/AuthProvider";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayError, setDisplayError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const authContext = useAuth();
  const user = authContext ? authContext.user : null;

  if (user) {
    window.location.href = "/";
  }

  useEffect(() => {
    if (displayError) {
      const timer = setTimeout(() => {
        setDisplayError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [displayError]);

  const validateForm = (): boolean => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;

    if (!emailRegex.test(email)) {
      setError(
        "Invalid email provider. Only Gmail, Yahoo, and Outlook are allowed."
      );
      setDisplayError(true);
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and contain both letters and numbers."
      );
      setDisplayError(true);
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth(app);
    const valid = validateForm();

    if (valid) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(user);
          const username = email.split("@")[0];
          updateProfile(user, {
            displayName: username,
          }).catch((error) => {
            console.error("Error updating display name:", error);
          });
          window.location.href = "/";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error signing up:", errorCode, errorMessage);
        });
    } else {
    }
  };

  return (
    <>
      {displayError && <Error message={error} />}
      <div className="flex items-center justify-center min-h-screen bg-colors-background-950">
        <div className="w-full max-w-md p-8 space-y-6 bg-colors-background-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-colors-text-50">
            Sign Up
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
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
