import { SCENES } from "../data/config";
import Player from "../player/player";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super(SCENES.BootScene);
  }

  init() {}

  preload() {
    this.load.json("AssetData", "assets/data/assetpaths.json");
    this.load.json("GameData", "assets/data/gameData.json");
  }

  create() {
    this.scene.start(SCENES.PreloadScene);
  }
}
