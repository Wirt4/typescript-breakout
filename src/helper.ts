import {
    BRICK_HEIGHT,
    BRICK_PADDING,
    BRICK_WIDTH,
    LEVEL,
    STAGE_COLS,
    STAGE_PADDING
} from "./setup";
import RED_BRICK_IMAGE from "./images/brick-red.png";
import BLUE_BRICK_IMAGE from "./images/brick-blue.png";
import GREEN_BRICK_IMAGE from "./images/brick-green.png";
import YELLOW_BRICK_IMAGE from "./images/brick-yellow.png";
import PURPLE_BRICK_IMAGE from "./images/brick-purple.png";
import {Brick} from "./sprites/Brick";
import {Vector} from "./types";

export function createBricks(): Brick[] {
    return LEVEL.reduce((accumulated, element, ndx)=>{
        if (element <=0) return accumulated
        const stats = brickStats(element)
        return [...accumulated,new Brick(stats.img, adjustedCoords(ndx), stats.energyLevel) ]
    },[] as Brick[] );
}

function adjustedCoords(i: number): Vector{
    const x = STAGE_PADDING + (i%STAGE_COLS) * (BRICK_WIDTH + BRICK_PADDING)
    const y = STAGE_PADDING + Math.floor(i/STAGE_COLS) * (BRICK_HEIGHT + BRICK_PADDING)
    return {x, y}
}

function brickStats(energyLevel: number){
    let color = RED_BRICK_IMAGE
    let level = 1
    switch (energyLevel){
        case 2:
            color = GREEN_BRICK_IMAGE
            level = 1
            break
        case 3:
            color = YELLOW_BRICK_IMAGE
            level = 2
            break
        case 4:
            color = BLUE_BRICK_IMAGE
            level = 2
            break
        case 5:
            color = PURPLE_BRICK_IMAGE
            level = 3
            break
    }
    return { img:color, energyLevel: level };
}
