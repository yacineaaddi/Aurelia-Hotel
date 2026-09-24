import UserAvatar from "../features/authentication/UserAvatar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  top: 0%;
  width: 100%;
  z-index: 1000;

  @media (max-width: 900px) {
    display: flex;
    justify-content: space-between;
    padding: 1.2rem 2rem;
  }
`;

const LogoContainer = styled.span`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

function Header({ onClick, isOpen, setIsOpen }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/dashboard");
  }

  return (
    <StyledHeader>
      <LogoContainer onClick={handleClick}>
        <Logo width="6rem" />
      </LogoContainer>
      <UserAvatar />
      <HeaderMenu onClick={onClick} isOpen={isOpen} setIsOpen={setIsOpen} />
    </StyledHeader>
  );
}

export default Header;
