declare module AssetData {
  export interface Background {
    Path: string;
    Sprites: Sprite[];
  }

  export interface Animation {
    Key: string;
    Prefix: string;
    Suffix: string;
    Start: number;
    End: number;
    Repeat: number;
  }

  export interface Character {
    Key: string;
    Data: string;
    Path: string;
    Frame: string;
    Animation: Animation[];
  }

  export interface UI {
    Path: string;
    Sprites: Sprite[];
  }

  export interface Sprite {
    Key: string;
    Data: string;
    Collide: boolean;
    FlipX: boolean;
    Name: string;
  }

  export interface GroundObstacle {
    path: string;
    Sprites: Sprite[];
  }

  export interface AirObstacle {
    path: string;
    Sprites: Sprite[];
  }

  export interface AssetPath {
    Background: Background;
    Character: Character[];
    UI: UI;
    Ground_Obstacle: GroundObstacle;
    Air_Obstacle: AirObstacle;
  }

  export interface AssetData {
    AssetPath: AssetPath;
  }
}

declare module GameData {
  export interface GameData {
    GameSpeed: number;
    PlayerVerticalSpeed: number;
    StartingHealthMeter: number;
    TimeToSpawnObstacle: number;
  }
}
