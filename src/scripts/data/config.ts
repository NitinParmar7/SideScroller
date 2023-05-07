import "phaser";
import BootScene from "../scenes/bootScene";
import GameScene from "../scenes/gameScene";
import MenuScene from "../scenes/menuScene";
import PreloadScene from "../scenes/preloadScene";
import UIScene from "../scenes/UIScene";

export const GAME_WIDTH = 2400;
export const GAME_HEIGHT = 1080;
export const HALF_WIDTH = 1200;
export const HALF_HEIGHT = 540;

export const Config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: 0x000000,
  scene: [BootScene, PreloadScene, , MenuScene, GameScene, UIScene],
  parent: "game-canvas",
  dom: {
    createContainer: true,
  },
  scale: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    autoRound: true,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    fullscreenTarget: "game-canvas",
  },
  audio: {
    disableWebAudio: true,
  },
};

export const SCENES = {
  BootScene: "BootScene",
  PreloadScene: "PreloadScene",
  MenuScene: "MenuScene",
  GameScene: "GameScene",
  UIScene: "UIScene",
};
