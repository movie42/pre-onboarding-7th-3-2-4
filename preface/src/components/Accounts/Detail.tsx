import React from "react";
import { AccountInfoContainer, ButtonContainer, Container } from "./Styles";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { DashboardModel } from "@/model/interface";
import generateAccountWithHypen from "@/lib/utils/generateAccountNumberWithHyphen";

interface IAccountDetailProps {
  newAccountDetail: DashboardModel;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Detail = ({ newAccountDetail, setIsEdit }: IAccountDetailProps) => {
  const {
    id,
    user_name,
    user_id,
    broker_name,
    broker_id,
    status_kr,
    number,
    name,
    assets,
    payments,
    profit_rate,
    is_active_kr,
    created_at,
    is_profit,
    updated_at
  } = newAccountDetail;

  const handleEditMode = () => {
    setIsEdit(true);
  };

  const handleDelete = () => {
    // setIsDelete(true);
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
            <button onClick={handleEditMode}>
              <AiFillEdit />
              <span className="hide">업데이트</span>
            </button>
            <button onClick={handleDelete}>
              <AiFillDelete />
              <span className="hide">삭제</span>
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
            <div className="small-title">계좌 이름</div> <strong>{name}</strong>
          </div>
          <div>
            <div className="small-title">입금액</div>
            <strong>{payments}</strong> 원
          </div>
        </div>
        <div className="account-detail-info">
          <div>
            <div className="small-title">계좌 상태</div>
            <strong>{status_kr}</strong>
          </div>
          <div>
            <div className="small-title">계좌</div>{" "}
            <strong>{is_active_kr}</strong>
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

export default Detail;
