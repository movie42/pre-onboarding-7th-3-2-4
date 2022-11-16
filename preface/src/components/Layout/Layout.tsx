import React, { ReactNode } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import SideBar from "./SideBar";

interface ILayout {
  pageTitle: string;
  children: ReactNode;
}

const Layout = ({ pageTitle, children }: ILayout) => {
  return (
    <Container className="grid grid-cols-layout h-vh100">
      <SideBar />
      <MainContentContainer className="grid grid-rows-basicContent">
        <Header pageTitle={pageTitle} />
        <Main>{children}</Main>
        <Footer />
      </MainContentContainer>
    </Container>
  );
};

export default Layout;

const Container = styled.div``;

const MainContentContainer = styled.div`
  background-color: ${(props) => props.theme.colors.gray1};
`;
