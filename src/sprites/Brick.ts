import {Sprite} from "./Sprite";

export class Brick extends Sprite{
    public energy: number;

    constructor(imgSrc: string, xPos: number, yPos: number, width: number, height: number, energy: number = 1) {
        super(imgSrc, xPos, yPos, width, height);
        this.energy = energy;
    }
}
