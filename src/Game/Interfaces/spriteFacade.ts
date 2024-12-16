import {IBricksWrapper} from "./sprites/IBricksWrapper";
import {IBall} from "./sprites/IBall";
import {IPaddle} from "./sprites/IPaddle";
import {IBrick} from "./sprites/IBrick";

export interface SpriteFacade {
    ball: IBall;
    paddle: IPaddle;
    bricks?: IBrick[]
}