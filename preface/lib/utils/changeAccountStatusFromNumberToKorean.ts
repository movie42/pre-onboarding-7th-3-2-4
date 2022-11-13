export const AccountStatus = {
  관리자확인필요: 9999,
  입금대기: 1,
  운용중: 2,
  투자중지: 3,
  해지: 4
} as const;

type AccountStatusObject = typeof AccountStatus;
export type TAccountStatusKey = keyof AccountStatusObject;
export type TAccountStatusValue = AccountStatusObject[TAccountStatusKey];

const changeAccountStatusFromNumberToKorean = (status: TAccountStatusValue) => {
  for (const key in AccountStatus) {
    const accountKey = key as TAccountStatusKey;
    if (AccountStatus[accountKey] === status) {
      return accountKey;
    }
  }
};

export default changeAccountStatusFromNumberToKorean;
