// src/interfaces/IBall.ts
import { Position } from "../../types"

export interface IBall {
    position: Position;
    speed: number;
    rewind(distance: number): void;
    move(): void;
    bounceY(): void;
    bounceX(): void;
}
