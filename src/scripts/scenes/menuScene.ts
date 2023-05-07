import { HALF_HEIGHT, HALF_WIDTH, SCENES } from "../data/config";
import GameManager from "../data/const";
import Player from "../player/player";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENES.MenuScene);
  }

  create() {
    this.add.image(0, HALF_HEIGHT, GameManager.GetInstance().AssetData.AssetPath.Background.Sprites[0].Key).setOrigin(0, 0.5).setScale(4);
    this.add.text(HALF_WIDTH, HALF_HEIGHT * 0.25, "Choose your Avatar", { fontStyle: "bold", fontSize: "72px", color: "#000" }).setOrigin(0.5, 0.5);

    new Player(this, HALF_WIDTH * 0.75, HALF_HEIGHT, 0).setInteractive().on("pointerdown", () => {
      this.OnAvataarClicked(0);
    });

    new Player(this, HALF_WIDTH * 1.25, HALF_HEIGHT, 1).setInteractive().on("pointerdown", () => {
      this.OnAvataarClicked(1);
    });
  }

  OnAvataarClicked(CharacterIndex: number) {
    this.scene.start(SCENES.GameScene, { CharacterIndex: CharacterIndex });
  }
}
