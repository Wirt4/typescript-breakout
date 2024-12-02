import {Sprite} from "./Sprite";
import {Size, Vector} from "../types";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../setup";

export class Brick extends Sprite{
    public energy: number;

    constructor(imgSrc: string,  coords: Vector, energy: number = 1) {
        super(imgSrc, coords, {width: BRICK_WIDTH, height: BRICK_HEIGHT});
        this.energy = energy;
    }
}
