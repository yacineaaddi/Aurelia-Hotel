"use client";

import { useFormStatus } from "react-dom";
import React from "react";

function SubmitButton({ children, pendingLabel, disabled = false }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="rounded-2xl bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending || disabled}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
