export type IDepositHistory = {
  depositHistoryId: number;
  depositCode: string;
  userAppId: string;
  amount: number;
  method: number;
  gateway: number;
  message: string;
  dateCreate: string;
  newBalance: number;
  bankTransTime: string | null;
  bankTransStatus: string | null;
  bankTransID: string | null;
  bankTransDesc: string | null;
  bankTransCode: string | null;
  currentBalance: number;
  isStatus: string;
  checksum: string | null;
  paymentURL: string | null;
  remoteIPaddress: string;
  remark: string;
};

export type ITransactionDetail = {
  transactionId: number;
  chargePointId: string;
  connectorId: number;
  startTagId: string;
  startTime: string; // Consider using Date if parsing is needed
  meterStart: number;
  startResult: string;
  stopTagId: string;
  stopTime: string; // Consider using Date if parsing is needed
  meterStop: number;
  stopReason: string;
  chargeStationName: string;
  chargeStationAddress: string;
  chargePointName: string;
  amount: number;
  meterValue: number;
  exchangeRate: number;
  stopMethod: string;
  TransactionId: string;
};

export type IAddDeposit = {
  UserAppId: string;
  Amount: number;
  PaymentGateway: 1 | 2;
  AppIpAddr: string;
};
