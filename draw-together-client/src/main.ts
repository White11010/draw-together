import "./style.css";
import { DrawerService } from "./services/drawer-service/drawer-service";
import { ApiService } from "./services/api-service/api-service";
import { GameService } from "./services/game-service/game-service";

window.onload = () => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 800;
  canvas.style.border = "1px solid black";

  document.getElementById("app")!.appendChild(canvas);

  const drawerService = new DrawerService(canvas);
  const apiService = new ApiService("http://localhost:8000");

  const gameService = new GameService(drawerService, apiService);

  gameService.init();
};
