import {LEVEL, STAGE_PADDING} from "./setup";
import {Brick} from "./sprites/Brick";

export function createBricks(){
    return LEVEL.map(()=> new Brick('stub', {x:STAGE_PADDING,y:0}, {width: 0, height: 0}));
}
