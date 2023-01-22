import { EDrawEventType } from "../enums/draw-event-type.enum";

export interface IMouseEventMessage {
  coords: [number, number],
  eventType: EDrawEventType
}
