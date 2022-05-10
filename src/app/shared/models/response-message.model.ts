export interface ResponseMessage {
  // status: 'success' | 'fail';
  status: ResponseMessageStatus;
  body: string;
}

export type ResponseMessageStatus = 'Success' | 'Fail';
