import styled, { css } from "styled-components";

export const Container = styled.div`
  min-width: 1200px;
  font-size: 1.4rem;
  background-color: ${(props) => props.theme.colors.white1};
  line-height: 2rem;
`;

export const ButtonContainer = styled.div`
  button {
    padding: 0rem 0.7rem;
    font-size: 1.8rem;
    color: ${(props) => props.theme.colors.gray5};

    &:hover {
      color: ${(props) => props.theme.colors.second1};
    }
  }
  .hide {
    position: absolute;
    top: -1px;
    left: -1px;
    overflow: hidden;
    width: 1px;
    height: 1px;
    margin: -1px;
  }
`;

export const AccountInfoContainer = styled.div<{
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
    input {
      width: 90%;
      outline: none;
      color: red;
    }
    select {
      color: red;
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
