import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { HiOutlineUser } from "react-icons/hi2";

import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
