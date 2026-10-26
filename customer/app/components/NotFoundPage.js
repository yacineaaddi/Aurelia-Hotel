import Link from "next/link";
import React from "react";

function NotFoundPage() {
  return (
    <main className="w-10/12 mx-auto py-24 text-center space-y-10 mt-4">
      <h1 className="text-2xl md:text-3xl ">
        {"This page could not be found "}
      </h1>
      <Link
        href="/"
        className="inline-block text-base bg-accent-500 px-6 py-4 text-primary-800 rounded-full font-semibold hover:bg-accent-600 transition-all duration-300"
      >
        {"Go back home"}
      </Link>
    </main>
  );
}

export default NotFoundPage;
