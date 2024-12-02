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
        const stats = brickStats(element)
        return [...accumulated,new Brick(stats.img, adjustedCoords(ndx), {width: 0, height: 0}, stats.energyLevel) ]
    },[] as Brick[] );
}

function adjustedCoords(i: number): Vector{
    const x = STAGE_PADDING + (i%STAGE_COLS) * (BRICK_WIDTH + BRICK_PADDING)
    const y = STAGE_PADDING + Math.floor(i/STAGE_COLS) * (BRICK_HEIGHT + BRICK_PADDING)
    return {x, y}
}

function brickStats(energyLevel: number){
    let color: string
    let level = -1
    switch (energyLevel){
        case 2:
            color = "green"
            level = 1
            break
        case 3:
            color = "yellow"
            level = 2
            break
        case 4:
            color = "blue"
            level = 2
            break
        case 5:
            color = "purple"
            break
        default:
            color = "red"
            level = 1
    }
    return { img:`images/brick-${color}.png`, energyLevel: level };
}
