import {Sprite} from "./Sprite";

export class Brick extends Sprite{
    private readonly _energy: number;
    constructor(imgSrc: string, xPos: number, yPos: number, width: number, height: number, energy: number = 1) {
        super(imgSrc, xPos, yPos, width, height);
        this._energy = energy;
    }

    get energy(){
        return this._energy;
    }
}
