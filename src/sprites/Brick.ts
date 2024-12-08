import {Sprite} from "./Sprite";
import {Position} from "../types";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../setup";
import {Ball} from "./Ball";
import {Contact} from "../enums";

export class Brick extends Sprite{
    public energy: number;
    private _contactType = Contact.NO_CONTACT
    private _collisionOverlapDistance = 0

    constructor(imgSrc: string, coords: Position, energy: number = 1) {
        super(imgSrc, coords, {width: BRICK_WIDTH, height: BRICK_HEIGHT});
        this.energy = energy;
    }

    collisionOverlapDistance():number {
        return this._collisionOverlapDistance
    }

    detectCollision(ball: Ball):void{
        if (!this.isInXRange(ball) || !this.isInYRange(ball)) {
            this._contactType = Contact.NO_CONTACT
            return
        }
        if (ball.position.y >= this.position.y && ball.bottomMostY <= this.bottomMostY) {
            this._collisionOverlapDistance = this.xOverlapDistance(ball.rightMostX)
            this._contactType = Contact.SIDE
            return
        }
        this._collisionOverlapDistance = this.YOverlapDistance(ball.position.y, ball.bottomMostY)
        this._contactType = Contact.TOP_OR_BOTTOM
    }

    private YOverlapDistance(ballYStart: number, ballYEnd: number):number{
       if (ballYStart < this.position.y) {
           return ballYEnd - this.position.y
       }
       if (ballYEnd > this.bottomMostY) {
           return this.bottomMostY - ballYStart
       }
        return ballYEnd - ballYStart
    }

    private xOverlapDistance(ballXEnd: number): number{
        return Math.abs( this.position.x - ballXEnd)
    }

    isInYRange(ball:Ball):boolean{
        return ball.position.y <= this.bottomMostY && ball.bottomMostY >= this.position.y
    }

    hasCollision():Contact{
        return this._contactType
    }
}


