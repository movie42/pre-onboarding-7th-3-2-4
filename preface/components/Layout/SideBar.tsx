import React from "react";
import styled from "styled-components";

type ISideBar = React.HTMLAttributes<HTMLElement>;

const SideBar = (props: ISideBar) => {
  return <Container {...props}>SideBar</Container>;
};

export default SideBar;

const Container = styled.aside`
  background-color: red;
`;
