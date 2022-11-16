import useCreateNewAccount from "lib/hooks/useCreateNewAccount";
import React from "react";

const CreateAccount = () => {
  const { generateNewAccount, mutate } = useCreateNewAccount();
  const handleNewAccount = () => {
    const newAccount = generateNewAccount();
    mutate(newAccount);
  };
  return <div onClick={handleNewAccount}>새로운 계좌 만들기</div>;
};

export default CreateAccount;
