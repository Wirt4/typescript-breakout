import {BRICK_HEIGHT, BRICK_PADDING, BRICK_WIDTH, LEVEL, STAGE_COLS, STAGE_PADDING} from "./setup";
import {Brick} from "./sprites/Brick";
import {Vector} from "./types";

export function createBricks(){
    return LEVEL.map((element, ndx)=> {
        return new Brick('stub', adjustedCoords(ndx), {width: 0, height: 0})
    });
}

function adjustedCoords(i: number): Vector{
    const x = STAGE_PADDING + (i%STAGE_COLS) * (BRICK_WIDTH + BRICK_PADDING)
    const y = STAGE_PADDING + Math.floor(i/STAGE_COLS) * (BRICK_HEIGHT + BRICK_PADDING)
    return {x, y}
}
