import {Sprite} from "./Sprite";
import { Vector} from "../types";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../setup";
import {Ball} from "./Ball";

export class Brick extends Sprite{
    public energy: number;
    private _verticalCollision =  false

    constructor(imgSrc: string,  coords: Vector, energy: number = 1) {
        super(imgSrc, coords, {width: BRICK_WIDTH, height: BRICK_HEIGHT});
        this.energy = energy;
    }

    isCollidingWith(ball: Ball){
        this._verticalCollision = ball.centerX >= this.x && ball.centerX <= this.rightMostX
        const inX = this.isInXRange(ball)
        const ans = inX && this.isInYRange(ball);
        if (ans){
            ball.x = 0
        }
        return ans;
    }

    isVerticalCollision(){
        return this._verticalCollision
    }

    isInYRange(ball:Ball):boolean{
        return ball.y <= this.bottomMostY && ball.bottomMostY >= this.y
    }
}


