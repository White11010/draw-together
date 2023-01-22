export interface IApiService {
  sendMessage: (message: string, payload: any) => void;
  setMessageHadnler: (
    message: string,
    handler: (...args: any[]) => void
  ) => void;
}
