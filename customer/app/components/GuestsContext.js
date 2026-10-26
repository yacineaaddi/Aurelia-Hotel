"use client";

import { createContext, useContext, useState } from "react";

const GuestsContext = createContext();

const initialState = 1;

function GuestsProvider({ children }) {
  const [guests, setGuests] = useState(initialState);

  const resetGuests = () => setGuests(initialState);

  return (
    <GuestsContext.Provider value={{ guests, setGuests, resetGuests }}>
      {children}
    </GuestsContext.Provider>
  );
}

function useGuestsContext() {
  const context = useContext(GuestsContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { GuestsProvider, useGuestsContext };
