import {Sprite} from "./Sprite";
import {Size, Vector} from "../types";

export class Brick extends Sprite{
    public energy: number;

    constructor(imgSrc: string,  coords: Vector,  size: Size,energy: number = 1) {
        super(imgSrc, coords, size);
        this.energy = energy;
    }
}
