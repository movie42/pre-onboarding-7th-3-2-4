import React from "react";
import styled from "styled-components";

import ImageContainer from "components/Image/ImageContainer";
import logo from "public/images/logo.png";
import Link from "next/link";

const SideBar = () => {
  return (
    <Container className="bg-primary2 text-white grid grid-rows-sideContent">
      <div className="flex items-center justify-center">
        <LogoContainer>
          <Logo imageProps={{ src: logo, alt: "디셈버 로고 이미지" }} />
        </LogoContainer>
        <div className="ml-3">
          <h1 className="text-5xl pt-2 text-white font-black">PREFACE</h1>
        </div>
      </div>
      <div>
        <Nav>
          <ul>
            <Item>
              <LinkButton href="/accounts">계좌목록</LinkButton>
            </Item>
            <Item>
              <LinkButton href={"/logout"}>로그아웃</LinkButton>
            </Item>
          </ul>
        </Nav>
      </div>
    </Container>
  );
};

export default SideBar;

const Container = styled.aside``;

const LogoContainer = styled.div`
  width: 4rem;
`;

const Logo = styled(ImageContainer)``;

const LinkButton = styled(Link)``;

const Nav = styled.nav``;

const Item = styled.li`
  background-color: ${(props) => props.theme.colors.primary3};
  padding: 2rem 1.7rem;
  font-size: 1.1rem;
  font-weight: bolder;
`;
