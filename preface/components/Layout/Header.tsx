import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const NAV = [
  { title: "계좌목록", path: "/accounts" },
  { title: "사용자", path: "/users" }
];

const Header = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const [filterValue] = NAV.filter((value) => value.path === pathname);

  return (
    <Container className="bg-white shadow-lg flex justify-between items-center p-5 box-border">
      <h1 className="text-xl font-bold">{filterValue.title}</h1>
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
