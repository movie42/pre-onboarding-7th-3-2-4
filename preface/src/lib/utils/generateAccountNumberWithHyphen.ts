import { TBrokersKey } from "./changeBrokerCodeToKorean";

const accountCode = {
  209: { role: /^(\d{2})(\d{8})(\d+)$/g, match: "$1-$2-$3" },
  218: { role: /^(\d{2})(\d{7})(\d+)$/g, match: "$1-$2-$3" },
  230: { role: /^(\d{2})(\d{6})(\d+)$/g, match: "$1-$2-$3" },
  238: { role: /^(\d{2})(\d{3})(\d{4})(\d+)$/g, match: "$1-$2-$3-$4" },
  240: { role: /^(\d{2})(\d{4})(\d+)$/g, match: "$1-$2-$3" },
  243: { role: /^(\d{2})(\d{9})(\d+)$/g, match: "$1-$2-$3" },
  247: { role: /^(\d{2})(\d{4})(\d+)$/g, match: "$1-$2-$3" },
  261: { role: /^(\d{2})(\d{2})(\d+)$/g, match: "$1-$2-$3" },
  262: { role: /^(\d{2})(\d{7})(\d+)$/g, match: "$1-$2-$3" },
  263: { role: /^(\d{2})(\d{4})(\d+)$/g, match: "$1-$2-$3" },
  264: { role: /^(\d{2})(\d{4})(\d{2})(\d+)$/g, match: "$1-$2-$3-$4" },
  265: { role: /^(\d{2})(\d{3})(\d{3})(\d+)$/g, match: "$1-$2-$3-$4" },
  266: { role: /^(\d{2})(\d{5})(\d+)$/g, match: "$1-$2-$3" },
  267: { role: /^(\d{2})(\d{3})(\d+)$/g, match: "$1-$2-$3" },
  268: { role: /^(\d{2})(\d{6})(\d+)$/g, match: "$1-$2-$3" },
  269: { role: /^(\d{2})(\d{5})(\d+)$/g, match: "$1-$2-$3" },
  270: { role: /^(\d{2})(\d{4})(\d+)$/g, match: "$1-$2-$3" },
  279: { role: /^(\d{2})(\d{5})(\d+)$/g, match: "$1-$2-$3" },
  280: { role: /^(\d{2})(\d{4})(\d+)$/g, match: "$1-$2-$3" },
  288: { role: /^(\d{2})(\d{8})(\d+)$/g, match: "$1-$2-$3" },
  287: { role: /^(\d{2})(\d{4})(\d{5})(\d+)$/g, match: "$1-$2-$3-$4" },
  290: { role: /^(\d{2})(\d{6})(\d+)$/g, match: "$1-$2-$3" },
  291: { role: /^(\d{2})(\d{4})(\d+)$/g, match: "$1-$2-$3" },
  292: { role: /^(\d{2})(\d{5})(\d+)$/g, match: "$1-$2-$3" },
  271: { role: /^(\d{2})(\d{3})(\d+)$/g, match: "$1-$2-$3" }
} as const;

type TAccountCodeKey = TBrokersKey;

function generateAccountWithHypen(code: TAccountCodeKey, account: string) {
  const { match, role } = accountCode[code];
  return account.replace(role, match);
}

export default generateAccountWithHypen;
