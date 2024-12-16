import {IBall} from "./IBall";
import {Contact} from "../../../enums";
import {IBrick} from "./IBrick";

export interface IBricksWrapper {
    arr: IBrick[]
    detectCollision(ball :IBall):void
    collisionType(): Contact
    adjustBricks():void
    collisionOverlap():number
    isEmpty():boolean
}
