import GameManager, { EPlayerControlState } from "../data/const";

export type PlayerAnimationState = typeof PlayerAnimationState[keyof typeof PlayerAnimationState];

const PlayerAnimationState = {
  CRASH: "Crash",
  DOWN: "Down",
  EAT: "Eat",
  FALL: "Fall",
  HIT: "Hit",
  IDLE: "Idle",
  JUMP: "Jump",
};

export default class Player extends Phaser.GameObjects.Sprite {
  private playerState: EPlayerControlState;
  private playerAnimationState: PlayerAnimationState;
  private characterIndex: number;
  constructor(scene: Phaser.Scene, x: number, y: number, characterIndex: number) {
    super(scene, x, y, GameManager.GetInstance().AssetData.AssetPath.Character[characterIndex].Key, GameManager.GetInstance().AssetData.AssetPath.Character[characterIndex].Frame);
    this.characterIndex = characterIndex;
    this.playerState = EPlayerControlState.None;
    this.setDepth(1);

    this.scene.add.existing(this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (this.playerAnimationState == PlayerAnimationState.JUMP) {
      this.y -= 0.75 * delta;
    }
  }

  GenerateAnimation() {
    let Character: AssetData.Character = GameManager.GetInstance().AssetData.AssetPath.Character[this.characterIndex];
    for (let i = 0; i < Character.Animation.length; ++i) {
      let currentAnimation: AssetData.Animation = Character.Animation[i];
      let end = currentAnimation.End > 9 ? 9 : currentAnimation.End;
      let frameNames = this.scene.anims.generateFrameNames(Character.Key, {
        prefix: currentAnimation.Prefix,
        start: currentAnimation.Start,
        end: end,
        suffix: currentAnimation.Suffix,
        zeroPad: 2,
      });
      if (currentAnimation.End > 9) {
        this.scene.anims.generateFrameNames(Character.Key, {
          prefix: currentAnimation.Prefix,
          start: 10,
          end: currentAnimation.End,
          suffix: currentAnimation.Suffix,
          outputArray: frameNames,
        });
      }
      this.scene.anims.create({ key: currentAnimation.Key, frameRate: 12, frames: frameNames, repeat: currentAnimation.Repeat });
    }
  }

  PlayInitAnimation(callback: Function, Context?: any) {
    this.play(PlayerAnimationState.EAT);
    this.playerAnimationState = PlayerAnimationState.EAT;
    this.chain([PlayerAnimationState.JUMP, PlayerAnimationState.IDLE]);
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + PlayerAnimationState.EAT, this.OnPlayerJump, this);
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + PlayerAnimationState.EAT, callback, Context);
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + PlayerAnimationState.JUMP, this.OnPlayerJumpEnded, this);
  }

  OnPlayerJump() {
    this.playerAnimationState = PlayerAnimationState.JUMP;
  }
  OnPlayerJumpEnded() {
    this.playerAnimationState = PlayerAnimationState.IDLE;
  }

  SetPlayerControlState(NewState: EPlayerControlState) {
    this.playerState = NewState;
  }

  GetPlayerControlState(): EPlayerControlState {
    return this.playerState;
  }
}
