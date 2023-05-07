export const SameBackgroundCount = 2;

export const gameSpeed = 1;

export const backgroundWidth = 7680;

export default class GameManager {
  private static instance: GameManager = null;

  AssetData: AssetData.AssetData;
  GameData: GameData.GameData;
  static GetInstance(): GameManager {
    if (this.instance == null) this.instance = new GameManager();
    return this.instance;
  }
}

export enum EPlayerControlState {
  None,
  Up,
  Down,
}
