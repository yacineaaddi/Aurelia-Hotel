import React from "react";
import { styled, keyframes } from "styled-components";
import { IoMdClose } from "react-icons/io";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import MenuButton from "./MenuButton";

const openMenu = keyframes`
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
`;

const closeMenu = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
`;

const StyledSidebar = styled.aside`
  position: fixed;
  background-color: var(--color-grey-0);
  padding: 3.5rem 6rem 2.4rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: fit-content;
  height: 100vh;
  left: 0%;
  z-index: 1000;

  @media (max-width: 900px) {
    width: 100%;
    display: ${(props) => (props.$isOpen ? "flex" : "none")};
  }
`;

export default function Sidebar({ onClick, isOpen, setIsOpen }) {
  return (
    <StyledSidebar $isOpen={isOpen}>
      <Logo />
      <MainNav isOpen={isOpen} setIsOpen={setIsOpen} />
      {/*<Uploader />*/}
      <MenuButton>
        <IoMdClose onClick={onClick} />
      </MenuButton>
    </StyledSidebar>
  );
}
