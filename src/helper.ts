import {LEVEL} from "./setup";
import {Brick} from "./sprites/Brick";

export function createBricks(){
    return LEVEL.map(()=> new Brick('stub', {x:4,y:0}, {width: 0, height: 0}));
}
