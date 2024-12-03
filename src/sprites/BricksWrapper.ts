import {Brick} from "./Brick";
import {Ball} from "./Ball";

export class BricksWrapper{
    private readonly _bricks: Brick[];

    constructor(bricks: Brick[]){
        this._bricks = bricks;
    }

    detectCollision(ball: Ball):boolean{
        if (!this._bricks?.length) return false
        for (let i=0; i < this._bricks.length; i++){
            if (this._bricks[i].isCollidingWith(ball)){
                return true
            }
        }
        return false
    }

    get arr(): Brick[]{
        return this._bricks;
    }
}
