import { GAME_HEIGHT, GAME_WIDTH, HALF_HEIGHT, HALF_WIDTH, SCENES } from "../data/config";
import GameManager, { backgroundWidth, EPlayerControlState, gameSpeed, SameBackgroundCount } from "../data/const";
import Player from "../player/player";
import GameEventEmitter, { GAME_EVENTS } from "../util/gameevent";

export default class GameScene extends Phaser.Scene {
  currentBackgroundIndex: number = 0;
  AssetData: AssetData.AssetData;
  currentCharacterIndex: number = 0;
  currentGameSpeed: number = gameSpeed;
  BackgroundCount: number = 0;
  xOffset: number = 0;
  player: Player;
  isSecondBackground: boolean = false;
  backgrounds: Phaser.GameObjects.Image[] = [];
  cameraFollow: Phaser.GameObjects.Image;
  bGameHasStarted: boolean = false;
  bFollow: boolean = false;
  ObstacleSpawnRate: number;
  currentObstacleTime: number;
  constructor() {
    super(SCENES.GameScene);
  }

  init(data: any) {
    this.currentCharacterIndex = data.CharacterIndex;
    let gameEvents = [
      {
        name: GAME_EVENTS.OnUPPressed.key,
        callback: this.OnUpPressed,
      },
      {
        name: GAME_EVENTS.OnUPReleased.key,
        callback: this.OnUpReleased,
      },
      {
        name: GAME_EVENTS.OnDownPressed.key,
        callback: this.OnDownPressed,
      },
      {
        name: GAME_EVENTS.OnDownReleased.key,
        callback: this.OnDownReleased,
      },
    ];

    gameEvents.forEach((gameEvent: { name: string; callback: (...args: any[]) => void }) => {
      GameEventEmitter.GetInstance().addListener(gameEvent.name, gameEvent.callback, this);
    });

    this.events.on("shutdown", () => {
      gameEvents.forEach((gameEvent: { name: string; callback: (...args: any[]) => void }) => {
        GameEventEmitter.GetInstance().removeListener(gameEvent.name, gameEvent.callback);
      });
    });
  }

  create() {
    this.AssetData = GameManager.GetInstance().AssetData;
    this.ObstacleSpawnRate = GameManager.GetInstance().GameData.TimeToSpawnObstacle;
    this.AddBackground();
    this.AddBackground();
    this.AddBackground();

    this.player = new Player(this, GAME_WIDTH * 0.5, GAME_HEIGHT * 0.8, this.currentCharacterIndex);
    this.player.GenerateAnimation();

    this.cameraFollow = this.add.image(GAME_WIDTH * 0.15, this.player.y, "").setVisible(false);
    this.cameras.main.startFollow(this.cameraFollow, false, 1, 1, -HALF_WIDTH + this.cameraFollow.x, -HALF_HEIGHT + this.cameraFollow.y);

    var upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    upKey.on("up", () => {
      this.OnUpReleased();
    });
    upKey.on("down", () => {
      this.OnUpPressed();
    });

    var downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    downKey.on("up", () => {
      this.OnDownReleased();
    });
    downKey.on("down", () => {
      this.OnDownPressed();
    });

    this.time.delayedCall(1000, this.StartGame, null, this);
  }

  update(time: number, delta: number) {
    if (this.bGameHasStarted) {
      if (this.cameraFollow.x > this.player.x) {
        this.player.x += GameManager.GetInstance().GameData.GameSpeed * delta;
      }
      this.cameraFollow.x += GameManager.GetInstance().GameData.GameSpeed * delta;
      this.xOffset += GameManager.GetInstance().GameData.GameSpeed * delta;
      if (this.xOffset > backgroundWidth) {
        this.xOffset = 0;
        this.AddBackground();
      }
      switch (this.player.GetPlayerControlState()) {
        case EPlayerControlState.Up:
          this.player.y -= GameManager.GetInstance().GameData.PlayerVerticalSpeed * delta;
          break;
        case EPlayerControlState.Down:
          this.player.y += GameManager.GetInstance().GameData.PlayerVerticalSpeed * delta;
          break;
      }

      this.player.y = Phaser.Math.Clamp(this.player.y, this.player.height * 0.5 + HALF_HEIGHT * 0.1, GAME_HEIGHT - this.player.height * 0.5);
    }
    this.currentObstacleTime += delta;
    if (this.currentObstacleTime >= this.ObstacleSpawnRate) {
      let number = Phaser.Math.Between(1, 100);
      if (number <= 50) {
      } else {
      }
    }
  }

  StartGame() {
    this.player.PlayInitAnimation(this.OnPlayerAtePerk, this);
  }

  OnPlayerAtePerk() {
    this.bGameHasStarted = true;
    this.scene.launch(SCENES.UIScene);
  }

  AddBackground() {
    if (this.backgrounds.length > 3) {
      let bg = this.backgrounds.shift();
      bg.setTexture(this.AssetData.AssetPath.Background.Sprites[this.currentBackgroundIndex].Key);
      bg.setPosition(this.BackgroundCount * backgroundWidth, HALF_HEIGHT);
      this.backgrounds.push(bg);
    } else {
      let bg = this.add
        .image(this.BackgroundCount * backgroundWidth, HALF_HEIGHT, this.AssetData.AssetPath.Background.Sprites[this.currentBackgroundIndex].Key)
        .setOrigin(0, 0.5)
        .setScale(4);
      this.backgrounds.push(bg);
    }
    this.BackgroundCount++;
    this.currentBackgroundIndex = this.BackgroundCount % this.AssetData.AssetPath.Background.Sprites.length;
  }

  OnUpPressed() {
    if (this.player.GetPlayerControlState() == EPlayerControlState.None) this.player.SetPlayerControlState(EPlayerControlState.Up);
  }

  OnUpReleased() {
    this.player.SetPlayerControlState(EPlayerControlState.None);
  }

  OnDownPressed() {
    if (this.player.GetPlayerControlState() == EPlayerControlState.None) this.player.SetPlayerControlState(EPlayerControlState.Down);
  }

  OnDownReleased() {
    this.player.SetPlayerControlState(EPlayerControlState.None);
  }
}
