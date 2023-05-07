require("./main.css");
import { Config } from "./scripts/data/config";
import Player from "./scripts/player/player";

export const game = new Phaser.Game(Config);
Phaser.GameObjects.GameObjectFactory.register("player", function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, characterIndex: number) {
  const player = new Player(this.scene, x, y, characterIndex);
  this.displayList.add(player);
  this.updateList.add(player);
  return player;
});
