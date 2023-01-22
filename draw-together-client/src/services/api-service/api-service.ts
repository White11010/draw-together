import { io, Socket } from "socket.io-client";
import { IApiService } from "./api-service.model";

export class ApiService implements IApiService {
  private socket: Socket;
  
  constructor(url: string | URL) {
    this.socket = io(url);
  }

  public sendMessage(message: string, payload: any): void {
    this.socket.emit(message, payload);
  }

  public setMessageHadnler(
    message: string,
    handler: (...args: any[]) => void
  ): void {
    this.socket.on(message, handler);
  }
}
