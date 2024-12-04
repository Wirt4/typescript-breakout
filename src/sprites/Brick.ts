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

    private upperLeftTouch(ball: Ball):boolean{
        const yDiff = this.getDiff(ball.bottomMostY, this.y)
        const xDiff = this.getDiff(ball.rightMostX, this.x)
        return ball.bottomMostY >= this.y && ball.rightMostX >= this.x && yDiff == xDiff
    }

    private upperRightTouch(ball: Ball):boolean{
        const yDiff = this.getDiff(ball.bottomMostY, this.y)
        const xDiff = this.getDiff(ball.x, this.rightMostX)
        return ball.bottomMostY >= this.y && ball.x <= this.rightMostX && yDiff == xDiff
    }

    private lowerLeftTouch(ball: Ball):boolean{
        const yDiff = this.getDiff(ball.y, this.bottomMostY)
        const xDiff = this.getDiff(ball.rightMostX, this.x)
        return ball.y <= this.bottomMostY && ball.rightMostX >= this.x && yDiff == xDiff
    }

    private lowerRightTouch(ball: Ball):boolean{
        const xDiff = this.getDiff(ball.x, this.rightMostX)
        const yDiff = this.getDiff(ball.y, this.bottomMostY)
        return ball.x <= this.rightMostX && ball.y <= this.bottomMostY && xDiff == yDiff
    }

    private setCornerTouch(ball:Ball):void{
        this._cornerTouch = this.upperLeftTouch(ball) || this.upperRightTouch(ball) ||
            this.lowerLeftTouch(ball) || this.lowerRightTouch(ball)
    }

    isCollidingWith(ball: Ball):boolean{
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
        console.log('brick.isCollidingWith:', ans)
        return ans;
    }

    private isInside(ball: Ball){
        if (ball.x < this.rightMostX && ball.rightMostX > this.x){
            return ball.y < this.bottomMostY && ball.bottomMostY > this.y
        }
        return false
    }

    isVerticalCollision(){
        return this._verticalCollision
    }

    isInYRange(ball:Ball):boolean{
        return ball.y <= this.bottomMostY && ball.bottomMostY >= this.y
    }
}


