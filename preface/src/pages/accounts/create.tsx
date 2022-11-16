import React, { ReactElement, useState } from "react";

import { Layout } from "@/components";
import AccountsContextProvider from "@/lib/contexts/AccountContextProvider";
import useCreateNewAccount from "@/lib/hooks/useCreateNewAccount";
import { generateNewAccount } from "@/lib/utils/generateNewAccount";
import styled from "styled-components";
import { ACCOUNT_STATUS, BROKERS } from "@/lib/constants/constants";
import { TAccountStatusValue } from "@/lib/utils/changeAccountStatusFromNumberToKorean";
import { TBrokersKey } from "@/lib/utils/changeBrokerCodeToKorean";

const CreateAccount = () => {
  const [status, setStatus] = useState<TAccountStatusValue>(9999);
  const [userId, setUserId] = useState(1);
  const [brokerId, setBrokerId] = useState<TBrokersKey>("209");
  const [name, setName] = useState("");
  const [payments, setPayments] = useState("0");
  const [isActive, setIsActive] = useState("false");

  const { mutate } = useCreateNewAccount();
  const handleNewAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAccount = generateNewAccount({
      status,
      user_id: userId,
      broker_id: brokerId,
      name,
      payments,
      is_active: Boolean(isActive)
    });
    mutate(newAccount);
  };
  return (
    <Container>
      <form onSubmit={handleNewAccount}>
        <FormItem>
          <label htmlFor="status">계좌상태</label>
          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(Number(e.currentTarget.value) as TAccountStatusValue);
            }}
          >
            {ACCOUNT_STATUS.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </FormItem>
        <FormItem>
          <label htmlFor="user_id">고객</label>
          <input
            name="user_id"
            id="user_id"
            type="number"
            placeholder="1-100 사이 값 입력"
            min={1}
            max={100}
            value={userId}
            onChange={(e) => setUserId(Number(e.currentTarget.value))}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="broker_id">증권사</label>
          <select
            name="broker_id"
            id="broker_id"
            value={brokerId}
            onChange={(e) => setBrokerId(e.currentTarget.value as TBrokersKey)}
          >
            {BROKERS.map((broker) => (
              <option key={broker.id} value={broker.id}>
                {broker.name}
              </option>
            ))}
          </select>
        </FormItem>
        <FormItem>
          <label htmlFor="name">계좌이름</label>
          <input
            name="name"
            id="name"
            type="text"
            value={name}
            placeholder="계좌 이름을 알려주세요"
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="payments">입금금액</label>
          <input
            name="payments"
            id="payments"
            type="text"
            value={payments}
            onChange={(e) => setPayments(e.currentTarget.value)}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="is_active">활성화</label>
          <select
            name="is_active"
            id="is_active"
            value={isActive}
            onChange={(e) => setIsActive(e.currentTarget.value)}
          >
            <option value="true">활성화</option>
            <option value="false">비활성화</option>
          </select>
        </FormItem>
        <ButtonContainer>
          <button className="confirm">계좌생성</button>
          <button className="cancel">생성취소</button>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default CreateAccount;

CreateAccount.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountsContextProvider>
      <Layout pageTitle="계좌목록">{page}</Layout>
    </AccountsContextProvider>
  );
};

const Container = styled.div`
  font-size: 1.3rem;
  background-color: ${(props) => props.theme.colors.white1};
  line-height: 2rem;
  padding: 2rem;

  form {
    width: 100%;
  }
`;

const FormItem = styled.div`
  padding: 1rem 0;
  display: grid;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray4};
  label {
    padding-left: 0.2rem;
    font-size: 1.1rem;
  }
  input {
    padding-top: 1rem;
    font-weight: bolder;
    outline: none;
  }
  select {
    padding-top: 1rem;
    font-weight: bolder;
  }
  option {
    font-size: 2rem;
    background-color: black;
  }
`;

const ButtonContainer = styled.div`
  padding-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  button {
    padding: 0.5rem 1.4rem;
    border-radius: 2rem;
    margin-left: 1rem;
    color: ${(props) => props.theme.colors.white1};
  }
  button.confirm {
    background-color: ${(props) => props.theme.colors.primary2};
    &:hover {
      background-color: ${(props) => props.theme.colors.primary3};
    }
  }
  button.cancel {
    background-color: ${(props) => props.theme.colors.second1};
    &:hover {
      background-color: ${(props) => props.theme.colors.second2};
    }
  }
`;
