import type { IApiService } from "../api-service/api-service.model";
import type { IMouseEventMessage } from "../../models/mouse-event-message.model";
import type { IGameService } from "./game-service.model";

import { DrawerService } from "../drawer-service/drawer-service";
import { EDrawEventType } from "../../enums/draw-event-type.enum";
import { IDrawParams } from "../drawer-service/drawew-service.model";

export class GameService implements IGameService {
  private drawerService: DrawerService;
  private apiService: IApiService;

  constructor(drawerService: DrawerService, apiService: IApiService) {
    this.drawerService = drawerService;
    this.apiService = apiService;
  }

  public init(): void {
    this.initDrawerService();
    this.initApiService();
  }

  private initApiService(): void {
    this.initApiServiceEventListeners();
  }

  private initApiServiceEventListeners(): void {
    this.apiService.setMessageHadnler("draw", (payload: IMouseEventMessage) => {
      this.drawerService.draw(payload);
    });
  }

  private initDrawerService(): void {
    this.drawerService.init();
    this.initDrawerServiceCanvasEventListeners();
  }

  private initDrawerServiceCanvasEventListeners(): void {
    const mouseEventHandler = (event: MouseEvent) => {
      const drawConfig: IDrawParams = {
        coords: [event.offsetX, event.offsetY],
        eventType: event.type as EDrawEventType,
      };

      this.drawerService.draw(drawConfig);

      this.apiService.sendMessage("draw", drawConfig);
    };

    this.setMouseDownEventListener(mouseEventHandler);
    this.setMouseMoveEventListener(mouseEventHandler);
    this.setMouseUpEventListener(mouseEventHandler);
  }

  private setMouseDownEventListener(
    hadnler: (event: MouseEvent) => void
  ): void {
    this.drawerService.setCanvasEventListener(
      EDrawEventType.MOUSE_DOWN,
      hadnler
    );
  }

  private setMouseMoveEventListener(
    hadnler: (event: MouseEvent) => void
  ): void {
    this.drawerService.setCanvasEventListener(
      EDrawEventType.MOUSE_MOVE,
      hadnler
    );
  }

  private setMouseUpEventListener(hadnler: (event: MouseEvent) => void): void {
    this.drawerService.setCanvasEventListener(EDrawEventType.MOUSE_UP, hadnler);
  }
}
