import React from "react";

import styled from "styled-components";

interface IHeader {
  pageTitle: string;
}

const Header = ({ pageTitle }: IHeader) => {
  return (
    <Container className="bg-white shadow-lg flex justify-between items-center p-5 box-border">
      <h1 className="text-xl font-bold">{pageTitle}</h1>
      <div>
        <span>userName</span>
        <span>?</span>
        <span>alams</span>
        <span>user avatar</span>
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.header``;
