import { EventEmitter } from "events"
import { join } from "path"
const lib: AddonExports = require("node-gyp-build")(join(__dirname, ".."))

interface AddonExports {
  start(cb: (e: any, errorCode?: number, errorMsg?: string) => void): void
  stop(): void
  keyTap(key: number, type: KeyToggle): void
}

enum KeyToggle {
  Tap = 0,
  Down = 1,
  Up = 2,
}

export enum EventType {
  EVENT_KEY_PRESSED = 4,
  EVENT_KEY_RELEASED = 5,
  EVENT_MOUSE_CLICKED = 6,
  EVENT_MOUSE_PRESSED = 7,
  EVENT_MOUSE_RELEASED = 8,
  EVENT_MOUSE_MOVED = 9,
  EVENT_MOUSE_WHEEL = 11,
}

export interface UiohookKeyboardEvent {
  type: EventType.EVENT_KEY_PRESSED | EventType.EVENT_KEY_RELEASED
  time: number
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  keycode: number
}

export interface UiohookMouseEvent {
  type:
    | EventType.EVENT_MOUSE_CLICKED
    | EventType.EVENT_MOUSE_MOVED
    | EventType.EVENT_MOUSE_PRESSED
    | EventType.EVENT_MOUSE_RELEASED
  time: number
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  x: number
  y: number
  button: unknown
  clicks: number
}

export interface UiohookWheelEvent {
  type: EventType.EVENT_MOUSE_WHEEL
  time: number
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  x: number
  y: number
  clicks: number
  amount: number
  direction: WheelDirection
  rotation: number
}

export enum WheelDirection {
  VERTICAL = 3,
  HORIZONTAL = 4,
}

export const UiohookKey = {
  Backspace: 0x000e,
  Tab: 0x000f,
  Enter: 0x001c,
  CapsLock: 0x003a,
  Escape: 0x0001,
  Space: 0x0039,
  PageUp: 0x0e49,
  PageDown: 0x0e51,
  End: 0x0e4f,
  Home: 0x0e47,
  ArrowLeft: 0xe04b,
  ArrowUp: 0xe048,
  ArrowRight: 0xe04d,
  ArrowDown: 0xe050,
  Insert: 0x0e52,
  Delete: 0x0e53,
  0: 0x000b,
  1: 0x0002,
  2: 0x0003,
  3: 0x0004,
  4: 0x0005,
  5: 0x0006,
  6: 0x0007,
  7: 0x0008,
  8: 0x0009,
  9: 0x000a,
  A: 0x001e,
  B: 0x0030,
  C: 0x002e,
  D: 0x0020,
  E: 0x0012,
  F: 0x0021,
  G: 0x0022,
  H: 0x0023,
  I: 0x0017,
  J: 0x0024,
  K: 0x0025,
  L: 0x0026,
  M: 0x0032,
  N: 0x0031,
  O: 0x0018,
  P: 0x0019,
  Q: 0x0010,
  R: 0x0013,
  S: 0x001f,
  T: 0x0014,
  U: 0x0016,
  V: 0x002f,
  W: 0x0011,
  X: 0x002d,
  Y: 0x0015,
  Z: 0x002c,
  Numpad0: 0x0052,
  Numpad1: 0x004f,
  Numpad2: 0x0050,
  Numpad3: 0x0051,
  Numpad4: 0x004b,
  Numpad5: 0x004c,
  Numpad6: 0x004d,
  Numpad7: 0x0047,
  Numpad8: 0x0048,
  Numpad9: 0x0049,
  NumpadMultiply: 0x0037,
  NumpadAdd: 0x004e,
  NumpadSubtract: 0x004a,
  NumpadDecimal: 0x0053,
  NumpadDivide: 0x0e35,
  NumpadEnd: 0xee00 | 0x004f,
  NumpadArrowDown: 0xee00 | 0x0050,
  NumpadPageDown: 0xee00 | 0x0051,
  NumpadArrowLeft: 0xee00 | 0x004b,
  NumpadArrowRight: 0xee00 | 0x004d,
  NumpadHome: 0xee00 | 0x0047,
  NumpadArrowUp: 0xee00 | 0x0048,
  NumpadPageUp: 0xee00 | 0x0049,
  NumpadInsert: 0xee00 | 0x0052,
  NumpadDelete: 0xee00 | 0x0053,
  F1: 0x003b,
  F2: 0x003c,
  F3: 0x003d,
  F4: 0x003e,
  F5: 0x003f,
  F6: 0x0040,
  F7: 0x0041,
  F8: 0x0042,
  F9: 0x0043,
  F10: 0x0044,
  F11: 0x0057,
  F12: 0x0058,
  F13: 0x005b,
  F14: 0x005c,
  F15: 0x005d,
  F16: 0x0063,
  F17: 0x0064,
  F18: 0x0065,
  F19: 0x0066,
  F20: 0x0067,
  F21: 0x0068,
  F22: 0x0069,
  F23: 0x006a,
  F24: 0x006b,
  Semicolon: 0x0027,
  Equal: 0x000d,
  Comma: 0x0033,
  Minus: 0x000c,
  Period: 0x0034,
  Slash: 0x0035,
  Backquote: 0x0029,
  BracketLeft: 0x001a,
  Backslash: 0x002b,
  BracketRight: 0x001b,
  Quote: 0x0028,
  Ctrl: 0x001d, // Left
  CtrlRight: 0x0e1d,
  Alt: 0x0038, // Left
  AltRight: 0x0e38,
  Shift: 0x002a, // Left
  ShiftRight: 0x0036,
  Meta: 0x0e5b,
  MetaRight: 0x0e5c,
  NumLock: 0x0045,
  ScrollLock: 0x0046,
  PrintScreen: 0x0e37,
} as const

declare interface UiohookNapi {
  on(event: "input", listener: (e: UiohookKeyboardEvent | UiohookMouseEvent | UiohookWheelEvent) => void): this

  on(event: "keydown", listener: (e: UiohookKeyboardEvent) => void): this
  on(event: "keyup", listener: (e: UiohookKeyboardEvent) => void): this

  on(event: "mousedown", listener: (e: UiohookMouseEvent) => void): this
  on(event: "mouseup", listener: (e: UiohookMouseEvent) => void): this
  on(event: "mousemove", listener: (e: UiohookMouseEvent) => void): this
  on(event: "click", listener: (e: UiohookMouseEvent) => void): this

  on(event: "wheel", listener: (e: UiohookWheelEvent) => void): this
}

class UiohookNapi extends EventEmitter {
  private handler(e: UiohookKeyboardEvent | UiohookMouseEvent | UiohookWheelEvent) {
    this.emit("input", e)
    switch (e.type) {
      case EventType.EVENT_KEY_PRESSED:
        this.emit("keydown", e)
        break
      case EventType.EVENT_KEY_RELEASED:
        this.emit("keyup", e)
        break
      case EventType.EVENT_MOUSE_CLICKED:
        this.emit("click", e)
        break
      case EventType.EVENT_MOUSE_MOVED:
        this.emit("mousemove", e)
        break
      case EventType.EVENT_MOUSE_PRESSED:
        this.emit("mousedown", e)
        break
      case EventType.EVENT_MOUSE_RELEASED:
        this.emit("mouseup", e)
        break
      case EventType.EVENT_MOUSE_WHEEL:
        this.emit("wheel", e)
        break
    }
  }

  start() {
    lib.start((e, errorCode, errorMsg) => {
      if (errorCode) {
        console.error(`C code error: Code - ${errorCode}, Message - ${errorMsg}`)
        // You can also emit an 'error' event instead of just logging the error
        this.emit("error", new Error(`C code error: Code - ${errorCode}, Message - ${errorMsg}`))
      } else {
        this.handler(e)
      }
    })
  }

  stop() {
    lib.stop()
  }

  keyTap(key: number, modifiers: number[] = []) {
    if (!modifiers.length) {
      lib.keyTap(key, KeyToggle.Tap)
      return
    }

    for (const modKey of modifiers) {
      lib.keyTap(modKey, KeyToggle.Down)
    }
    lib.keyTap(key, KeyToggle.Tap)
    let i = modifiers.length
    while (i--) {
      lib.keyTap(modifiers[i], KeyToggle.Up)
    }
  }

  keyToggle(key: number, toggle: "down" | "up") {
    lib.keyTap(key, toggle === "down" ? KeyToggle.Down : KeyToggle.Up)
  }
}

export const uIOhook = new UiohookNapi()
