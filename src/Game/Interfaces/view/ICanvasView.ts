import {IBrick} from "../sprites/IBrick";
import {ISprite} from "../sprites/ISprite";

export interface ICanvasView {
    canvas: HTMLCanvasElement;
    drawInfo(msg:string):void;
    drawScore(score:number):void;
    drawBricks(bricks: IBrick[]):void;
    drawSprite(sprite: ISprite):void;
    clear():void;
}
