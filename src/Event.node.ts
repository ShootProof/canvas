export default class NodeEvent implements Event {
  constructor(type: string, target: EventTarget) {
    this.bubbles = false;
    this.cancelBubble = false;
    this.cancelBubble = false;
    this.cancelable = false;
    this.composed = false;
    this.currentTarget = target;
    this.defaultPrevented = false;
    this.eventPhase = 0;
    this.isTrusted = false;
    this.returnValue = true;
    this.srcElement = target;
    this.target = target;
    this.timeStamp = Date.now();
    this.type = type;
    this.AT_TARGET = 2;
    this.BUBBLING_PHASE = 3;
    this.CAPTURING_PHASE = 1;
    this.NONE = 0;
  }

  bubbles: boolean;

  cancelBubble: boolean;

  cancelable: boolean;

  composed: boolean;

  currentTarget: EventTarget;

  defaultPrevented: boolean;

  eventPhase: number;

  isTrusted: boolean;

  returnValue: boolean;

  srcElement: EventTarget;

  target: EventTarget;

  timeStamp: number;

  type: string;

  composedPath(): EventTarget[] {
    throw new Error("Method not implemented.");
  }
  initEvent(_type: string, _bubbles?: boolean, _cancelable?: boolean): void {
    throw new Error("Method not implemented.");
  }

  preventDefault(): void {
    throw new Error("Method not implemented.");
  }

  stopImmediatePropagation(): void {
    throw new Error("Method not implemented.");
  }

  stopPropagation(): void {
    throw new Error("Method not implemented.");
  }

  AT_TARGET: number;
  BUBBLING_PHASE: number;
  CAPTURING_PHASE: number;
  NONE: number;
}
