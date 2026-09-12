import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

const StyledAppLayout = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

  @media (max-width: 900px) {
    padding: 4rem 2rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
const ContainerBox = styled.div`
  margin-left: 230px;

  @media (max-width: 900px) {
    margin-left: 0px;
  }
`;

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setIsOpen((open) => !open);
  }

  return (
    <StyledAppLayout>
      <Sidebar onClick={handleClick} isOpen={isOpen} setIsOpen={setIsOpen} />
      <ContainerBox>
        <Header onClick={handleClick} />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </ContainerBox>
    </StyledAppLayout>
  );
}
export default AppLayout;
