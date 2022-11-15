import { Layout } from "components";
import AccountsContextProvider from "lib/contexts/AccountContextProvider";
import useGetAccountDetail from "lib/hooks/useGetAccountDetail";

import React, { ReactElement } from "react";
import styled, { css } from "styled-components";

const AccountDetail = () => {
  const { isLoading, newAccountDetail } = useGetAccountDetail();

  const {
    id,
    user_name,
    user_id,
    broker_id,
    status,
    number,
    name,
    assets,
    payments,
    profit_rate,
    is_active,
    created_at,
    is_profit,
    updated_at
  } = newAccountDetail || {};

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  return (
    <Container data-id={id}>
      <AccountInfoContainer is_profit={is_profit}>
        <div className="account-user-name-info" data-userId={user_id}>
          <div>
            {broker_id} {number}
          </div>
        </div>
        <div className="profit">
          {assets} 원 ({is_profit ? "+" : "-"} {profit_rate}%)
        </div>
      </AccountInfoContainer>
      <AccountInfoContainer>
        <div className="account-detail-info">
          <div>
            <div className="small-title">고객명</div>
            <strong>{user_name} 님</strong>
          </div>
          <div>
            <div className="small-title">계좌 이름</div> <strong>{name}</strong>
          </div>
          <div>
            <div className="small-title">입금액</div>{" "}
            <strong>{payments}</strong> 원
          </div>
        </div>
        <div className="account-detail-info">
          <div>
            <div className="small-title">계좌 상태</div>{" "}
            <strong>{status}</strong>
          </div>
          <div>
            <div className="small-title">계좌</div> <strong>{is_active}</strong>
          </div>
        </div>
      </AccountInfoContainer>
      <AccountInfoContainer className="account-created-updated">
        <div className="small-title">계좌 개설 {created_at}</div>
        <div className="small-title">최근 활동 {updated_at}</div>
      </AccountInfoContainer>
    </Container>
  );
};

export default AccountDetail;

AccountDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountsContextProvider>
      <Layout pageTitle="계좌상세">{page}</Layout>
    </AccountsContextProvider>
  );
};

const AccountInfoContainer = styled.div<{
  is_profit?: boolean | null;
}>`
  padding: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray4};
  .account-detail-info {
    display: grid;
    grid-template-columns: 1fr repeat(2, minmax(20rem, 1.5fr));
    align-items: center;
    justify-content: center;
    &:not(:first-child) {
      padding-top: 1.3rem;
    }
    &:not(:last-child) {
      padding-bottom: 1.3rem;
      border-bottom: 1px solid ${(props) => props.theme.colors.gray4};
    }
  }

  .account-user-name-info {
    div {
      margin: 0;
    }
    margin: 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.gray5};
  }
  .small-title {
    font-size: 1rem;
    margin: 0;
  }
  .profit {
    margin: 0.7rem 0;
    font-size: 2rem;
    font-weight: bold;
    ${({ is_profit, theme }) => {
      if (is_profit) {
        return css`
          color: ${theme.colors.second1};
        `;
      } else if (is_profit === null) {
        return css`
          color: ${theme.colors.gray2};
        `;
      }
      return css`
        color: ${theme.colors.primary4};
      `;
    }}
  }

  strong {
    font-weight: bold;
  }

  &.account-created-updated {
    display: flex;
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.gray5};
    div {
      &:not(:first-child) {
        margin-left: 2rem;
      }
    }
  }
`;

const Container = styled.div`
  font-size: 1.4rem;
  background-color: ${(props) => props.theme.colors.white1};
  line-height: 2rem;
`;
