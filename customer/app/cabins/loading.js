import Spinner from "../components/Spinner";
import React from "react";

export default function loading() {
  return (
    <div className="loading-style">
      <Spinner />
      <p className="loading-text">Loading rooms...</p>
    </div>
  );
}
