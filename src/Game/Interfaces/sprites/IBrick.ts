import {ISprite} from "./ISprite";
import {Contact} from "../../../enums";

export interface IBrick extends ISprite{
    detectCollision(ball: ISprite): void
    hasCollision(): Contact;
    reduceEnergy(): Promise<void>;
    collisionOverlapDistance():number
    energy: number
}
