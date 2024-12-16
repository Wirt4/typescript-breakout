import {ISprite} from "./ISprite";

export interface IPaddle extends ISprite {
    isCollidedWith(sprite: ISprite): boolean;
    detectMove():void
}
