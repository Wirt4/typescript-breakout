import {Sprite} from "./Sprite";
import {Position} from "../types";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../setup";
import {Ball} from "./Ball";
import {Contact} from "../enums";

export class Brick extends Sprite{
    public energy: number;
    private _contactType = Contact.NO_CONTACT

    constructor(imgSrc: string, coords: Position, energy: number = 1) {
        super(imgSrc, coords, {width: BRICK_WIDTH, height: BRICK_HEIGHT});
        this.energy = energy;
    }



    detectCollision(ball: Ball):void{
        if (!this.isInXRange(ball) || !this.isInYRange(ball)) {
            this._contactType = Contact.NO_CONTACT
            return
        }
        if (ball.position.y >= this.position.y && ball.bottomMostY <= this.bottomMostY) {
            this._contactType = Contact.SIDE
            return
        }
        this._contactType = Contact.TOP_OR_BOTTOM
    }


    isInYRange(ball:Ball):boolean{
        return ball.position.y <= this.bottomMostY && ball.bottomMostY >= this.position.y
    }

    hasCollision():Contact{
        return this._contactType
    }
}


