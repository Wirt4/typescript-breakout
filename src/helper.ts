import {
    BRICK_HEIGHT,
    BRICK_PADDING,
    BRICK_WIDTH,
    LEVEL,
    STAGE_COLS,
    STAGE_PADDING
} from "./setup";
import {Brick} from "./sprites/Brick";
import {Vector} from "./types";

export function createBricks(): Brick[] {
    return LEVEL.reduce((accumulated, element, ndx)=>{
        if (element <=0) return accumulated
        return [...accumulated,new Brick( element == 1 ? "images/brick-red.png" : "images/brick-green.png", adjustedCoords(ndx), {width: 0, height: 0}) ]
    },[] as Brick[] );
}

function adjustedCoords(i: number): Vector{
    const x = STAGE_PADDING + (i%STAGE_COLS) * (BRICK_WIDTH + BRICK_PADDING)
    const y = STAGE_PADDING + Math.floor(i/STAGE_COLS) * (BRICK_HEIGHT + BRICK_PADDING)
    return {x, y}
}

