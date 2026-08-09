import React from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
