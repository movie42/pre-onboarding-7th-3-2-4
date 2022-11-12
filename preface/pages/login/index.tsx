import React, { useState } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

import logo from "public/images/logo.png";
import ImageContainer from "components/Image/ImageContainer";

import useLogin from "lib/hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      mutate({ email, password });
    }
  };

  return (
    <Container className="grid place-content-center h-vh100">
      <div className="grid w-72">
        <Header className="flex gap-1 items-center h-full justify-center">
          <LogoContainer className="rounded-lg overflow-hidden">
            <Logo imageProps={{ src: logo, alt: "디셈버 로고 이미지" }} />
          </LogoContainer>
          <div>
            <h1 className="text-4xl text-primary2 font-black">PREFACE</h1>
          </div>
        </Header>

        <FormContainer className="shadow-md mt-5">
          <div className="px-4 py-4 bg-gray-100">
            <h2 className="text-gray-800">로그인</h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col py-6 px-3 box-border"
          >
            <input
              className="border p-2 mb-3"
              type="email"
              placeholder="아이디를 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <input
              className="border p-2 mb-3"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <Button disabled={!email && !password}>로그인</Button>
          </form>
        </FormContainer>

        <Copyright className="mt-5 text-center">
          © December and Company
        </Copyright>
      </div>
    </Container>
  );
};

export default Login;

const Container = styled.div``;

const LogoContainer = styled.div`
  width: 3rem;
`;

const Logo = styled(ImageContainer)``;

const Header = styled.header``;

const FormContainer = styled.div``;

const Copyright = styled.h3``;

const Button = tw.button<{ disabled: boolean }>`
  p-2
  ${({ disabled }) => {
    if (disabled) {
      return `
        text-gray-400
        bg-gray-100
        
      `;
    }
    return `
      text-white
      bg-primary2 
    `;
  }}
  
`;
