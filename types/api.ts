export type IResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};
