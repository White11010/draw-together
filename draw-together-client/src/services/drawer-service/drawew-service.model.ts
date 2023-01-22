import { EDrawEventType } from "../../enums/draw-event-type.enum";

export interface IDrawParams {
  coords: [number, number];
  eventType: EDrawEventType;
}

export interface IDrawerService {
  init: () => void;
  draw: (drawConfig: IDrawParams) => void;
  setLineColor: (color: string) => void,
  setCanvasEventListener: (
    event: EDrawEventType,
    handler: (event: MouseEvent) => void
  ) => void;
}
