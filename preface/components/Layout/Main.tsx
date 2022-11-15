import React, { ReactNode } from "react";
import styled from "styled-components";

interface IMainProps {
  children: ReactNode;
}

const Main = ({ children }: IMainProps) => {
  return <Container className="pt-6 px-3">{children}</Container>;
};

export default Main;

const Container = styled.main`
  width: 100%;
  overflow-x: auto;
`;
