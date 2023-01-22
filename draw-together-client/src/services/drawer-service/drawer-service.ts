import { EDrawEventType } from "../../enums/draw-event-type.enum";
import type { IDrawerService, IDrawParams } from "./drawew-service.model";

export class DrawerService implements IDrawerService {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private isMouseDown: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
  }

  public init() {
    this.setDefaultConfig();
  }

  public draw(drawConfig: IDrawParams) {
    if (drawConfig.eventType === EDrawEventType.MOUSE_DOWN) {
      this.setIsMouseDown(true);
      this.context.beginPath();
      this.context.moveTo(drawConfig.coords[0], drawConfig.coords[1]);
    } else if (
      drawConfig.eventType === EDrawEventType.MOUSE_MOVE &&
      this.isMouseDown
    ) {
      this.context.lineTo(drawConfig.coords[0], drawConfig.coords[1]);
      this.context.stroke();
    } else if (drawConfig.eventType === EDrawEventType.MOUSE_UP) {
      this.setIsMouseDown(false);
      this.context.closePath();
    }
  }

  public setCanvasEventListener(
    event: EDrawEventType,
    handler: (event: MouseEvent) => void
  ): void {
    this.canvas.addEventListener(event as any, handler);
  }

  public setLineColor(color: string) {
    this.context.strokeStyle = color;
  }

  private setDefaultConfig(): void {
    this.context.lineWidth = 5;
    this.context.lineCap = "round";
  }

  private setIsMouseDown(isMouseDown: boolean) {
    this.isMouseDown = isMouseDown;
  }
}
