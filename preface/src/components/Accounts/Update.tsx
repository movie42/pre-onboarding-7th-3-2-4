import {
  TAccountStatusKey,
  TAccountStatusValue
} from "@/lib/utils/changeAccountStatusFromNumberToKorean";
import generateAccountWithHypen from "@/lib/utils/generateAccountNumberWithHyphen";
import { DashboardModel } from "@/model/interface";
import React, { useState } from "react";
import { AccountInfoContainer, ButtonContainer, Container } from "./Styles";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { ACCOUNT_STATUS } from "@/lib/constants/constants";

interface IAccountUpdateProps {
  newAccountDetail: DashboardModel;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Update = ({ newAccountDetail, setIsEdit }: IAccountUpdateProps) => {
  const {
    id,
    user_name,
    user_id,
    broker_name,
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
  } = newAccountDetail;

  const [accountName, setAccountName] = useState(name);
  const [newPayments, setNewPayments] = useState(payments);
  const [newStatus, setNewStatus] = useState(status);
  const [isActive, setIsActive] = useState(is_active);

  const handleEditMutate = () => {
    console.log("hi");
  };

  return (
    <Container data-id={id}>
      <AccountInfoContainer is_profit={is_profit}>
        <div className="flex justify-between items-start">
          <div>
            <div className="account-user-name-info" data-userId={user_id}>
              <div>
                {broker_name}{" "}
                {broker_id &&
                  number &&
                  generateAccountWithHypen(broker_id, number)}
              </div>
            </div>
            <div className="profit">
              {assets} 원 ({is_profit ? "+" : "-"} {profit_rate}%)
            </div>
          </div>
          <ButtonContainer>
            <button onClick={handleEditMutate}>
              <AiOutlineCheck />
              <span className="hide">확인</span>
            </button>
            <button onClick={() => setIsEdit(false)}>
              <AiOutlineClose />
              <span className="hide">취소</span>
            </button>
          </ButtonContainer>
        </div>
      </AccountInfoContainer>
      <AccountInfoContainer>
        <div className="account-detail-info">
          <div>
            <div className="small-title">고객명</div>
            <strong>{user_name} 님</strong>
          </div>
          <div>
            <div className="small-title">계좌 이름</div>{" "}
            <input
              type="text"
              value={accountName}
              placeholder="바꾸고 싶은 계좌 이름을 입력해주세요."
              onChange={(e) => setAccountName(e.currentTarget.value)}
            />
          </div>
          <div>
            <div className="small-title">입금액</div>
            <input
              type="text"
              value={newPayments}
              placeholder="새로운 입금 금액을 입력해주세요."
              onChange={(e) => setNewPayments(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="account-detail-info">
          <div>
            <div className="small-title">계좌 상태</div>
            <select
              id="status"
              value={newStatus}
              onChange={(e) =>
                setNewStatus(Number(e.currentTarget.value) as TAccountStatusKey)
              }
            >
              {ACCOUNT_STATUS.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="small-title">계좌</div>{" "}
            <select
              id="is_active"
              value={String(isActive)}
              onChange={(e) => setIsActive(Boolean(e.currentTarget.value))}
            >
              <option value="true">활성화</option>
              <option value="false">비활성화</option>
            </select>
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

export default Update;
