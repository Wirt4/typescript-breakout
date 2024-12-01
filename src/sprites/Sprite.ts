export class Sprite {
    private readonly _imageSrc: string;
    private readonly _x: number;
    private readonly _y: number;
    private readonly _w: number;
    private readonly _h: number;

    constructor(imageSrc: string, xCoord: number, yCoord: number, width: number, height: number = 0) {
        this._imageSrc = imageSrc;
        this._x = xCoord
        this._y = yCoord
        this._w = width;
        this._h = height;
    }

    get imageSrc(): string{
        return this._imageSrc;
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
