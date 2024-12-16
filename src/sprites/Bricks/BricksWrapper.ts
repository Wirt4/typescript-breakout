import {Brick} from "./Brick";
import {Ball} from "../Ball";
import {Contact} from "../../enums";
import {IBricksWrapper} from "../../Game/Interfaces/sprites/IBricksWrapper";

export class BricksWrapper implements  IBricksWrapper{
    private readonly _bricks: Brick[];
    private _collisionOverlap = 0
    private _collisionType = Contact.NO_CONTACT
    private _alteredBrickIndex = -1
    constructor(bricks: Brick[]){
        this._bricks = bricks;
    }

    isEmpty():boolean{
        if (this._bricks){
            return this._bricks.length == 0
        }
        return true
    }

    adjustBricks():void{
        if (this._alteredBrickIndex<0){
            return
        }

        if (this._bricks[this._alteredBrickIndex].energy==1){
            this._bricks.splice(this._alteredBrickIndex,1);
            return
        }

        this._bricks[this._alteredBrickIndex].reduceEnergy()
    }

    detectCollision(ball: Ball):void{
        this._collisionType = Contact.NO_CONTACT
        if (!this._bricks?.length) {
            return
        }
        for (let i=0; i < this._bricks.length; i++){
            this._bricks[i].detectCollision(ball);
            const hasCollision: Contact = this._bricks[i].hasCollision();
            if (hasCollision !== Contact.NO_CONTACT){
                this._collisionOverlap = this._bricks[i].collisionOverlapDistance()
                this._collisionType = this._bricks[i].hasCollision()
                this._alteredBrickIndex = i
                return
            }
        }
    }

    collisionType(): Contact{
        return this._collisionType
    }

    collisionOverlap():number{
        return this._collisionOverlap;
    }

    get arr(): Brick[]{
        return this._bricks;
    }
}
