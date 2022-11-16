export const SERVER_BASE_URL = "http://localhost:4000";
export const CLIENT_BASE_URL = "http://localhost:3000";
export const COOKIE_KEY = "preface-cookies";
export const BROKERS = [
  { id: "209", name: "유안타증권" },
  { id: "218", name: "현대증권" },
  { id: "230", name: "미래에셋증권" },
  { id: "238", name: "대우증권" },
  { id: "240", name: "삼성증권" },
  { id: "243", name: "한국투자증권" },
  { id: "247", name: "우리투자증권" },
  { id: "261", name: "교보증권" },
  { id: "262", name: "하이투자증권" },
  { id: "263", name: "HMC투자증권" },
  { id: "264", name: "키움증권" },
  { id: "265", name: "이베스트투자증권" },
  { id: "266", name: "SK증권" },
  { id: "267", name: "대신증권" },
  { id: "268", name: "아이엠투자증권" },
  { id: "269", name: "한화투자증권" },
  { id: "270", name: "하나대투자증권" },
  { id: "279", name: "동부증권" },
  { id: "280", name: "유진투자증권" },
  { id: "288", name: "카카오페이증권" },
  { id: "287", name: "메리츠종합금융증권" },
  { id: "290", name: "부국증권" },
  { id: "291", name: "신영증권" },
  { id: "292", name: "LIG투자증권" },
  { id: "271", name: "토스증권" }
] as const;

export const ACCOUNT_STATUS = [
  { name: "관리자확인필요", id: 9999 },
  { name: "입금대기", id: 1 },
  { name: "운용중", id: 2 },
  { name: "투자중지", id: 3 },
  { name: "해지", id: 4 }
] as const;
