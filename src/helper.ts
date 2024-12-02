import {BRICK_HEIGHT, BRICK_PADDING, BRICK_WIDTH, LEVEL, STAGE_COLS, STAGE_PADDING} from "./setup";
import {Brick} from "./sprites/Brick";

export function createBricks(){
    return LEVEL.map((element, ndx)=> {
        const xCoord =  STAGE_PADDING + ndx * (BRICK_WIDTH + BRICK_PADDING)

        const row =  Math.floor(ndx/STAGE_COLS)
        const yCoord = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING)
        return  new Brick('stub', {x: xCoord, y:yCoord}, {width: 0, height: 0})
    });
}

