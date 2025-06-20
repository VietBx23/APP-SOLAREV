export type IHistoryCharging = {
  transactionId: number;
  chargePointId: string;
  connectorId: number;
  startTagId: string;
  startTime: string; // Consider using Date if parsing is needed
  meterStart: number;
  startResult: "Accepted" | string; // Adjust if there are other possible values
  stopTagId: string;
  stopTime: string; // Consider using Date if parsing is needed
  meterStop: number;
  stopReason: string | null; // Adjust if there are other possible values
  chargeStationName: string;
  chargeStationAddress: string;
  chargePointName: string;
  amount: number;
  meterValue: number;
  exchangeRate: number;
  stopMethod: string | null;
};
