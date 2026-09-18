import { styled } from "styled-components";
import { IoMdClose } from "react-icons/io";
import MenuButton from "./MenuButton";
import Uploader from "../data/Uploader";
import MainNav from "./MainNav";
import Logo from "./Logo";

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
    padding: 14rem 6rem 2.4rem 2.4rem;
    width: 100%;
    display: ${(props) => (props.$isOpen ? "flex" : "none")};
  }
`;

export default function Sidebar({ onClick, isOpen, setIsOpen }) {
  return (
    <StyledSidebar $isOpen={isOpen}>
      <Logo />
      <MainNav isOpen={isOpen} setIsOpen={setIsOpen} />
      <Uploader />
      <MenuButton>
        <IoMdClose onClick={onClick} />
      </MenuButton>
    </StyledSidebar>
  );
}
