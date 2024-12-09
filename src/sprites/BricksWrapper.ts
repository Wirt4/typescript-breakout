import {Brick} from "./Brick";
import {Ball} from "./Ball";
import {Contact} from "../enums";

export class BricksWrapper{
    private readonly _bricks: Brick[];
    private _collisionOverlap = 0
    private _collisiontype = Contact.NO_CONTACT

    constructor(bricks: Brick[]){
        this._bricks = bricks;
    }

    detectCollision(ball: Ball):void{
        this._collisiontype = Contact.NO_CONTACT
        if (!this._bricks?.length) {return }
        for (let i=0; i < this._bricks.length; i++){
            this._bricks[i].detectCollision(ball);
            const hasCollision: Contact = this._bricks[i].hasCollision();
            if (hasCollision!== Contact.NO_CONTACT){
                this._collisionOverlap = this._bricks[i].collisionOverlapDistance()
                this._collisiontype = this._bricks[i].hasCollision()
                if (this._bricks[i].energy==1){
                    this._bricks.splice(i,1);
                    return
                }
                this._bricks[i].reduceEnergy()
                return
            }
        }
    }

    collisionType(): Contact{
        return this._collisiontype
    }

    collisionOverlap():number{
        return this._collisionOverlap;
    }

    get arr(): Brick[]{
        return this._bricks;
    }
}
