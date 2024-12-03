import {Sprite} from "./Sprite";
import { Vector} from "../types";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../setup";
import {Ball} from "./Ball";

export class Brick extends Sprite{
    public energy: number;
    private _verticalCollision =  false
    private _cornerTouch = false

    constructor(imgSrc: string,  coords: Vector, energy: number = 1) {
        super(imgSrc, coords, {width: BRICK_WIDTH, height: BRICK_HEIGHT});
        this.energy = energy;
    }

    isCornerCollision():boolean{
        return this._cornerTouch
    }

    private getDiff(a: number, b: number){
        return Math.abs(a- b)
    }

    private setCornerTouch(ball:Ball){
        const yDiff = this.getDiff(ball.bottomMostY, this.y)
        const xDiff = this.getDiff(ball.rightMostX, this.x)
        this._cornerTouch = ball.bottomMostY >= this.y && ball.rightMostX >= this.x && yDiff == xDiff;
    }

    isCollidingWith(ball: Ball){
        this._verticalCollision = ball.centerX >= this.x && ball.centerX <= this.rightMostX
        const inX = this.isInXRange(ball)
        const ans = inX && this.isInYRange(ball);
        if (ans){
            this.setCornerTouch(ball);
            if(this.isInside(ball) ){
               if (ball.centerPoint.y < this.centerPoint.y){
                   ball.y = this.y - ball.height - 1
               }else{
                   ball.y = this.y + this.height + 1
               }
            }
            if (ball.x == this.rightMostX && ball.y== this.bottomMostY){
                ball.x ++
                ball.y ++
            }
        }
        return ans;
    }

    private isInside(ball: Ball){
        if (ball.x < this.rightMostX && ball.rightMostX > this.x){
            return ball.y < this.bottomMostY && ball.bottomMostY > this.y
        }
        return false
    }

    private insideX(ball: Ball){
        return ball.x < this.rightMostX && ball.rightMostX > this.x
    }

    isVerticalCollision(){
        return this._verticalCollision
    }

    isInYRange(ball:Ball):boolean{
        return ball.y <= this.bottomMostY && ball.bottomMostY >= this.y
    }
}


