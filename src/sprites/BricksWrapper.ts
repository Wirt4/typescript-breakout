import {Brick} from "./Brick";
import {Ball} from "./Ball";

export class BricksWrapper{
    private readonly _bricks: Brick[];
    private  _isVertical = false
    private _isCorner = false

    constructor(bricks: Brick[]){
        this._bricks = bricks;
    }

    detectCollision(ball: Ball):boolean{
        if (!this._bricks?.length) return false
        for (let i=0; i < this._bricks.length; i++){
            this._bricks[i].detectCollision(ball);
            if (this._bricks[i].hasCollision()){
                this._isVertical = this._bricks[i].isVerticalCollision()
                this._isCorner = this._bricks[i].isCornerCollision()
                return true
            }
        }
        return false
    }

    isVerticalCollision():boolean{
        return this._isVertical
    }

    isCornerCollision():boolean{
        return this._isCorner
    }

    get arr(): Brick[]{
        return this._bricks;
    }
}
