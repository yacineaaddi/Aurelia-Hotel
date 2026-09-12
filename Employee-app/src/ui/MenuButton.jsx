import React from "react";
import styled from "styled-components";

const StyledIcon = styled.div`
  position: absolute;
  right: 3%;
  top: 3%;
  font-size: 3rem;
  color: #0369a1;
  cursor: pointer;
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

export default function MenuButton({ children }) {
  return <StyledIcon>{children}</StyledIcon>;
}
