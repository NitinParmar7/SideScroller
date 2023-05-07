export const GAME_EVENTS = {
  OnUPPressed: { key: "OnUPPressed", clear: true },
  OnUPReleased: { key: "OnUPReleased", clear: true },
  OnDownPressed: { key: "OnDownPressed", clear: true },
  OnDownReleased: { key: "OnDownReleased", clear: true },
};

type gameEvent = { key: string; clear: boolean };

export default class GameEventEmitter extends Phaser.Events.EventEmitter {
  private static instance: GameEventEmitter;

  private constructor() {
    super();
  }

  public static GetInstance(): GameEventEmitter {
    if (!GameEventEmitter.instance) {
      GameEventEmitter.instance = new GameEventEmitter();
    }
    return GameEventEmitter.instance;
  }

  clearEvents() {
    for (let eventName in GAME_EVENTS) {
      const event = GAME_EVENTS[eventName] as gameEvent;
      if (event.clear) {
        this.removeAllListeners(event.key);
      }
    }
  }
}
