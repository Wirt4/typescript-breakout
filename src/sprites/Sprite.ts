export class Sprite {
    private readonly _x: number;
    private readonly _y: number;
    private readonly _w: number;
    private readonly _h: number;
    private _img: HTMLImageElement;

    constructor(imageSrc: string, xCoord: number, yCoord: number, width: number, height: number) {
        this._img = new Image();
        this._img.src = imageSrc;
        this._x = xCoord
        this._y = yCoord
        this._w = width;
        this._h = height;
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
