import { GAME_HEIGHT, GAME_WIDTH, HALF_WIDTH, SCENES } from "../data/config";
import GameManager from "../data/const";
import GameEventEmitter, { GAME_EVENTS } from "../util/gameevent";

export default class UIScene extends Phaser.Scene {
  healthFillMask: Phaser.GameObjects.Image;
  healthBarFill: Phaser.GameObjects.Image;
  currentHealth: number = 0;
  SoundBtn: Phaser.GameObjects.Image;
  constructor() {
    super(SCENES.UIScene);
  }

  create() {
    this.add
      .image(GAME_WIDTH * 0.05, GAME_HEIGHT * 0.9, "Up_Btn")
      .setInteractive()
      .on("pointerdown", this.OnUpPressed, this)
      .on("pointerup", this.OnUpReleased, this);
    this.add
      .image(GAME_WIDTH * 0.95, GAME_HEIGHT * 0.9, "Down_Btn")
      .setInteractive()
      .on("pointerdown", this.OnDownPressed, this)
      .on("pointerup", this.OnDownReleased, this);

    this.add.image(GAME_WIDTH * 0.15, GAME_HEIGHT * 0.05, "HealthBarBG");
    this.healthBarFill = this.add.image(GAME_WIDTH * 0.15, GAME_HEIGHT * 0.05, "HealthBarFill");
    this.healthFillMask = this.add.image(GAME_WIDTH * 0.15, GAME_HEIGHT * 0.05, "HealthBarFill");
    this.healthFillMask.setVisible(false);
    this.healthBarFill.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthFillMask);
    this.UpdateHealth(GameManager.GetInstance().GameData.StartingHealthMeter);

    this.SoundBtn = this.add.image(GAME_WIDTH * 0.65, GAME_HEIGHT * 0.05, "SoundOn");
    this.SoundBtn.setInteractive().on("pointerdown", this.ToggleSound, this);

    this.add
      .image(GAME_WIDTH * 0.75, GAME_HEIGHT * 0.05, "Exit")
      .setInteractive()
      .on("pointerdown", this.OnExit, this);

    this.add.image(GAME_WIDTH * 0.9, GAME_HEIGHT * 0.05, "Score");
  }

  OnUpPressed() {
    GameEventEmitter.GetInstance().emit(GAME_EVENTS.OnUPPressed.key);
  }

  OnUpReleased() {
    GameEventEmitter.GetInstance().emit(GAME_EVENTS.OnUPReleased.key);
  }

  OnDownPressed() {
    GameEventEmitter.GetInstance().emit(GAME_EVENTS.OnDownPressed.key);
  }

  OnDownReleased() {
    GameEventEmitter.GetInstance().emit(GAME_EVENTS.OnDownReleased.key);
  }

  UpdateHealth(value: number) {
    this.currentHealth += value;
    this.healthFillMask.x = this.healthBarFill.x - this.healthBarFill.width + this.currentHealth * this.healthBarFill.width;
  }

  ToggleSound() {
    if (this.SoundBtn.texture.key == "SoundOn") {
      this.SoundBtn.setTexture("SoundOff");
    } else {
      this.SoundBtn.setTexture("SoundOn");
    }
  }

  OnExit() {}
}
