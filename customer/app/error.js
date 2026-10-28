"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex-style gap-6">
      <h1 className="error-message">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button className="error-button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
