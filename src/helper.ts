import {BRICK_PADDING, BRICK_WIDTH, LEVEL, STAGE_PADDING} from "./setup";
import {Brick} from "./sprites/Brick";

export function createBricks(){
    return LEVEL.map((element, ndx)=> {
        const xCoord=  STAGE_PADDING + ndx * (BRICK_WIDTH + BRICK_PADDING)
        return  new Brick('stub', {x: xCoord, y:10}, {width: 0, height: 0})
    });
}

