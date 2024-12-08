import {Sprite} from "./Sprite";
import {Position} from "../types";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../setup";
import {Ball} from "./Ball";
import {Contact} from "../enums";
interface overlapRange{
    start: number,
    end: number
}
export class Brick extends Sprite{
    private _energy: number;
    private _contactType = Contact.NO_CONTACT
    private _collisionOverlapDistance = 0

    constructor(imgSrc: string, coords: Position, energy: number = 1) {
        super(imgSrc, coords, {width: BRICK_WIDTH, height: BRICK_HEIGHT});
        this._energy = energy;
    }

    get energy(): number {
        return this._energy;
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
            this._collisionOverlapDistance = this.xOverlapDistance({start: ball.position.x, end: ball.rightMostX})
            this._contactType = Contact.SIDE
            return
        }
        this._collisionOverlapDistance = this.YOverlapDistance({start: ball.position.y, end: ball.bottomMostY})
        this._contactType = Contact.TOP_OR_BOTTOM
    }

    private overlapTemplate(ballRange: overlapRange, currentRange: overlapRange):number{
        if (ballRange.start < currentRange.start) {
            return ballRange.end  - currentRange.start
        }
        if (ballRange.end > currentRange.end) {
            return currentRange.end  - ballRange.start
        }
        return ballRange.end - ballRange.start
    }

    private YOverlapDistance(ballRange: overlapRange):number{
        return this.overlapTemplate(ballRange, {start: this.position.y, end: this.bottomMostY})
    }

    private xOverlapDistance(ballRange: overlapRange): number{
        return this.overlapTemplate(ballRange, {start: this.position.x, end: this.rightMostX})
    }

    isInYRange(ball:Ball):boolean{
        return ball.position.y <= this.bottomMostY && ball.bottomMostY >= this.position.y
    }

    reduceEnergy():void{
        this._energy --
    }

    hasCollision():Contact{
        return this._contactType
    }
}


