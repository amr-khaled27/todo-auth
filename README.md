# Authenticated To-Do App

This is an authenticated To-Do app built with **Next.js** that allows users to add, delete, and manage tasks. The app has protected routes, ensuring that only authenticated users can access their tasks and make changes.

## Features

- **Authentication**: Users can sign up, log in, and manage their accounts.
- **Protected Routes**: Routes are protected so that only authenticated users can access their tasks.
- **Task Management**: Users can add and delete tasks for their individual accounts.

## Tech Stack

- **Next.js**: A React framework used to build this app, providing server-side rendering, static site generation, and routing.
- **NextAuth.js**: A library for handling authentication and managing user sessions.
- **Firebase**: Used for authentication (sign up, log in) and storing user data, including tasks.
- **Tailwind CSS**: A utility-first CSS framework used to style the application.

## Features and Usage

### Authentication

- **Sign Up**: New users can sign up with their email and password using Firebase Authentication.
- **Log In**: Existing users can log in with their credentials using Firebase Authentication.
- **Google Sign In**: Google integration to allow seamless login experince 

### Task Management

Once logged in, users can:

- **Add Tasks**: Users can add tasks to their individual accounts.
- **Delete Tasks**: Tasks can be removed when they are completed or no longer needed.
- **Protected Routes**: Users are redirected to the login page if they attempt to access task-related routes without being authenticated.

### Protected Routes

- All routes related to tasks are protected using authentication.
- If a user is not authenticated, they are not allowed to view or modify their tasks.
- The app uses **NextAuth.js** and **Firebase** to handle user authentication and session management.

## Technologies Used

- **Next.js**: Provides a React framework for building fast and scalable web apps with server-side rendering and routing.
- **Firebase**: Provides Firebase Authentication for sign-ups/logins and Firestore to store tasks for each user.
- **Tailwind CSS**: A utility-first CSS framework for fast and flexible UI styling.
