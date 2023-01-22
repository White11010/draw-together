import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const port = process.env.PORT;
const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const socketList: Array<Socket> = [];

io.on("connection", (socket: Socket) => {
  console.log(socket.id);
  if (!socketList.map(({ id }) => id).includes(socket.id)) {
    socketList.push(socket);
  }

  socket.on("draw", (payload: any) => {
    socketList
      .filter(({ id }) => id !== socket.id)
      .forEach((connectedSocket: Socket) => {
        connectedSocket.emit("draw", payload);
      });
  });

  // socket.emit("connect", { message: "a new client connected" });
});
