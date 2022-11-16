import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled, { css } from "styled-components";

import logo from "public/images/logo.png";
import ImageContainer from "@/components/Image/ImageContainer";

const SideBar = () => {
  const { route } = useRouter();

  const isActiveLink = (path: string) => {
    const match = route.match(`${path}`);

    if (match !== null) {
      return true;
    }

    return false;
  };

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
            <Item isActive={isActiveLink("/accounts")}>
              <LinkButton href="/accounts">계좌목록</LinkButton>
            </Item>
            <Item isActive={isActiveLink("/logout")}>
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

const Item = styled.li<{ isActive: boolean }>`
  ${({ isActive }) => {
    if (isActive) {
      return css`
        font-weight: 700;
        background-color: ${(props) => props.theme.colors.primary3};
      `;
    }
    return css`
      font-weight: 700;
      background-color: ${(props) => props.theme.colors.primary2};
    `;
  }}

  padding: 2rem 1.7rem;
  font-size: 1.1rem;
`;
