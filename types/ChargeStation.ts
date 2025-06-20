export type IChargeStation = {
  address: string;
  chargeStationId: number;
  createDate: string;
  images: string;
  lat: string;
  long: string;
  name: string;
  ownerId: number;
  ownerVtl: null;
  position: string;
  qtyChargePoint: string;
  status: number;
  type: number;
};

export type IChargeStationInfo = {
  chargePointId: string;
  name: string;
  comment: string;
  username: string | null;
  password: string | null;
  clientCertThumb: string | null;
  ownerId: number;
  chargeStationId: number;
  chargePointModel: string;
  ocppVersion: string;
  chargePointState: string;
  chargePointSerial: string;
  chargerPower: string;
  outputType: string;
  connectorType: string;
  chargeStationVtl: string | null;
  ownerVtl: string | null;
  transactions: any[];
};
