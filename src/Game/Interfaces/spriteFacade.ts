import {IBricks} from "./sprites/IBricks";
import {IBall} from "./sprites/IBall";
import {IPaddle} from "./sprites/IPaddle";

export interface SpriteFacade {
    ball: IBall;
    bricks: IBricks;
    paddle: IPaddle;
}
