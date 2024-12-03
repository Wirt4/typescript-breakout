import {Sprite} from "./Sprite";
import {Vector} from "../types";

export class Ball extends Sprite{
    constructor(position: Vector, size: number, speed: number) {
        super('stub', position, {width: size, height: size});
    }
}
