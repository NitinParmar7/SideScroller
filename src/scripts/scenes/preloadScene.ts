import { GAME_HEIGHT, GAME_WIDTH, HALF_HEIGHT, HALF_WIDTH, SCENES } from "../data/config";
import GameManager from "../data/const";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SCENES.PreloadScene);
  }

  init() {}

  preload() {
    let data: JSON = this.cache.json.get("AssetData");
    let GameData: JSON = this.cache.json.get("GameData");
    GameManager.GetInstance().AssetData = <AssetData.AssetData>(<unknown>data);
    let AssetData: AssetData.AssetData = GameManager.GetInstance().AssetData;
    console.log(AssetData);
    GameManager.GetInstance().GameData = <GameData.GameData>(<unknown>GameData);
    for (let i = 0; i < AssetData.AssetPath.Background.Sprites.length; ++i) {
      this.load.image(AssetData.AssetPath.Background.Sprites[i].Key, AssetData.AssetPath.Background.Path + AssetData.AssetPath.Background.Sprites[i].Name);
    }

    for (let i = 0; i < AssetData.AssetPath.Character.length; ++i) {
      this.load.multiatlas(AssetData.AssetPath.Character[i].Key, AssetData.AssetPath.Character[i].Data, AssetData.AssetPath.Character[i].Path);
    }

    for (let i = 0; i < AssetData.AssetPath.UI.Sprites.length; ++i) {
      this.load.image(AssetData.AssetPath.UI.Sprites[i].Key, AssetData.AssetPath.UI.Path + AssetData.AssetPath.UI.Sprites[i].Name);
    }

    for (let i = 0; i < AssetData.AssetPath.Ground_Obstacle.Sprites.length; ++i) {
      this.load.multiatlas(
        AssetData.AssetPath.Ground_Obstacle.Sprites[i].Key,
        AssetData.AssetPath.Ground_Obstacle.path + AssetData.AssetPath.Ground_Obstacle.Sprites[i].Data,
        AssetData.AssetPath.Ground_Obstacle.path
      );
    }

    for (let i = 0; i < AssetData.AssetPath.Air_Obstacle.Sprites.length; ++i) {
      this.load.multiatlas(
        AssetData.AssetPath.Air_Obstacle.Sprites[i].Key,
        AssetData.AssetPath.Air_Obstacle.path + AssetData.AssetPath.Air_Obstacle.Sprites[i].Data,
        AssetData.AssetPath.Air_Obstacle.path
      );
    }

    let text = this.add.text(HALF_WIDTH, HALF_HEIGHT, "Loading...", { fontSize: "72px" }).setOrigin(0.5);

    this.load.on("progress", (value: number) => {
      text.setText("Loading... " + Phaser.Math.RoundTo(value * 100));
    });
  }

  create() {
    this.scene.start(SCENES.MenuScene);
  }
}
