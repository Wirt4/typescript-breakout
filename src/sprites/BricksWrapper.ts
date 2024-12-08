import {Brick} from "./Brick";
import {Ball} from "./Ball";
import {Contact} from "../enums";

export class BricksWrapper{
    private readonly _bricks: Brick[];

    constructor(bricks: Brick[]){
        this._bricks = bricks;
    }

    detectCollision(ball: Ball):Contact{
        if (!this._bricks?.length) return Contact.NO_CONTACT
        for (let i=0; i < this._bricks.length; i++){
            this._bricks[i].detectCollision(ball);
            const hasCollision: Contact = this._bricks[i].hasCollision();
            if (hasCollision!== Contact.NO_CONTACT){
                return hasCollision
            }
        }
        return Contact.NO_CONTACT
    }

    get arr(): Brick[]{
        return this._bricks;
    }
}
