import React, { ReactNode } from "react";
import styled from "styled-components";

interface IMainProps {
  children: ReactNode;
}

const Main = ({ children }: IMainProps) => {
  return <Container>{children}</Container>;
};

export default Main;

const Container = styled.main``;
