import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import MenuButton from "./MenuButton";
import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";
import { LuMenu } from "react-icons/lu";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledIcon = styled.div`
  font-size: 2.5rem;
  color: #0369a1;
  cursor: pointer;
  display: none;

  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function HeaderMenu({ onClick }) {
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
      <li>
        <StyledIcon>
          <LuMenu onClick={onClick} />
        </StyledIcon>
      </li>
    </StyledHeaderMenu>
  );
}
