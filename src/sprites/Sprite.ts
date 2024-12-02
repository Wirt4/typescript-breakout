import {Size, Vector} from "../types";

export class Sprite {
    private readonly _x: number;
    private readonly _y: number;
    private readonly _w: number;
    private readonly _h: number;
    private readonly _img: HTMLImageElement;


    constructor(imageSrc: string, coords:Vector, size: Size) {
        this._img = new Image();
        this._img.src = imageSrc;
        this._x = coords.x
        this._y = coords.y
        this._w = size.width;
        this._h = size.height;
    }

    get image():HTMLImageElement{
        return this._img
    }

    get x(): number {
        return this._x
    }

    get y(): number{
        return this._y
    }

    get width(): number{
        return this._w
    }

    get height(): number{
        return this._h
    }
}
