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
        return [...accumulated,new Brick(brickImage(element), adjustedCoords(ndx), {width: 0, height: 0}) ]
    },[] as Brick[] );
}

function adjustedCoords(i: number): Vector{
    const x = STAGE_PADDING + (i%STAGE_COLS) * (BRICK_WIDTH + BRICK_PADDING)
    const y = STAGE_PADDING + Math.floor(i/STAGE_COLS) * (BRICK_HEIGHT + BRICK_PADDING)
    return {x, y}
}

function brickImage(energyLevel: number){
    let color: string
    switch (energyLevel){
        case 2:
            color = "green"
            break
        case 3:
            color = "yellow"
            break
        case 4:
            color = "blue"
            break
        default:
            color = "red"
    }
    return `images/brick-${color}.png`
}
