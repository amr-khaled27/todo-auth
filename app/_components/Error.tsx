"use client";
import React from "react";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="bg-red-500" style={styles.errorContainer}>
      {message}
    </div>
  );
};

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  errorContainer: {
    position: "fixed",
    top: "0",
    width: "100%",
    color: "white",
    textAlign: "center" as const,
    padding: "1rem",
    zIndex: 1000,
  },
};

export default Error;
