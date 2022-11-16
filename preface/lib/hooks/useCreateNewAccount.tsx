import { useMutation, useQueryClient } from "@tanstack/react-query";
import brokers from "../../../server/brokers.json";
import accountStatus from "../../../server/accountStatus.json";
import { useRecoilState } from "recoil";
import { totalItemsAtom } from "lib/atoms/totalItems";
import { faker } from "@faker-js/faker";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { AccountModel } from "model/interface";
import { TBrokersKey } from "lib/utils/changeBrokerCodeToKorean";
import { TAccountStatusValue } from "lib/utils/changeAccountStatusFromNumberToKorean";

const useCreateNewAccount = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const [totalItems, setTotalItems] = useRecoilState(totalItemsAtom);

  const generateNewAccount = () => {
    const brokercode = Object.keys(brokers);
    const accountStatusCode = Object.values(accountStatus);
    const accountBrokerCode = brokercode.sort(
      () => 0.5 - Math.random()
    )[0] as TBrokersKey;
    const status = accountStatusCode.sort(
      () => 0.5 - Math.random()
    )[0] as TAccountStatusValue;
    const account = {
      id: totalItems + 1,
      user_id: 102,
      uuid: faker.datatype.uuid(),
      broker_id: accountBrokerCode,
      status,
      number: faker.finance.account(12),
      name: faker.finance.accountName(),
      assets: faker.finance.amount(200000, 1000000000),
      payments: faker.finance.amount(200000, 1000000000),
      is_active: faker.datatype.boolean(),
      created_at: faker.date.between("2019-04-01", "2022-08-01"),
      updated_at: faker.date.between("2019-04-01", "2022-08-01")
    };
    return account;
  };

  const createNewAccountMutation = useMutation<
    AxiosResponse,
    AxiosError,
    AccountModel
  >(async (account) => await axios.post("/api/accounts/create", account), {
    onSuccess: () => {
      setTotalItems((pre) => pre + 1);
      queryClient.invalidateQueries(["accounts"]);
      push("/accounts");
    }
  });
  return { generateNewAccount, ...createNewAccountMutation };
};

export default useCreateNewAccount;
