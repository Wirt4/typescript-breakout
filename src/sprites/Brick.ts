import {Sprite} from "./Sprite";
import { Vector} from "../types";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../setup";
import {Ball} from "./Ball";

export class Brick extends Sprite{
    public energy: number;

    constructor(imgSrc: string,  coords: Vector, energy: number = 1) {
        super(imgSrc, coords, {width: BRICK_WIDTH, height: BRICK_HEIGHT});
        this.energy = energy;
    }

    isCollidingWith(ball: Ball){
        return this.isInXRange(ball) && this.isInYRange(ball);
    }

    isInYRange(ball:Ball):boolean{
        return ball.y < this.bottomMostY && ball.bottomMostY > this.y
    }
}


