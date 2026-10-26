import Spinner from "../components/Spinner";
import React from "react";

export default function loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading privacy policy...</p>
    </div>
  );
}
