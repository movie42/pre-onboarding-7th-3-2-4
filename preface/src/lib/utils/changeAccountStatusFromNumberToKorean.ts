export const AccountStatus = {
  9999: "관리자확인필요",
  1: "입금대기",
  2: "운용중",
  3: "투자중지",
  4: "해지"
} as const;

type AccountStatusObject = typeof AccountStatus;
export type TAccountStatusKey = keyof AccountStatusObject;
export type TAccountStatusValue = AccountStatusObject[TAccountStatusKey];

const changeAccountStatusFromNumberToKorean = (status: TAccountStatusKey) => {
  return AccountStatus[status];
};

export default changeAccountStatusFromNumberToKorean;
