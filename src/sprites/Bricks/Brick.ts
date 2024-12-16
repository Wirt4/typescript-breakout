import {Sprite} from "../Sprite";
import {Position, Size} from "../../types";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../../setup";
import {Ball} from "../Ball";
import {BrickImages, Contact} from "../../enums";
import {BrickEnergy} from "./BrickEnergy";
import {IBrick} from "../../Game/Interfaces/sprites/IBrick";

interface overlapRange{
    start: number,
    end: number
}
export class Brick extends Sprite implements IBrick{
    private _energy: BrickEnergy;
    private _contactType = Contact.NO_CONTACT
    private _collisionOverlapDistance = 0

    constructor(coords: Position, energy: number = 1, size: Size = {width: BRICK_WIDTH, height: BRICK_HEIGHT}) {
        const brickEnergy = new BrickEnergy("../../images/brick-purple.png",energy)

        super(brickEnergy.imagePath as string, coords, size);
        this._energy = brickEnergy;
    }

    get imageSource():BrickImages{
        return BrickImages.RED
    }

    get energy(): number {
        return this._energy.energy;
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

    async reduceEnergy():Promise<void>{
        this._energy.decrementScore()
        this.loadImage(this._energy.imagePath as string).catch((err: Error) => {
            console.error(err);
        });
    }

    hasCollision():Contact{
        return this._contactType
    }
}


