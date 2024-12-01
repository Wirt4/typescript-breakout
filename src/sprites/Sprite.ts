export class Sprite {
    private readonly _imageSrc: string;
    private readonly _x: number;
    private readonly _y: number;

    constructor(imageSrc: string, xCoord: number, yCoord: number, width: number=0) {
        this._imageSrc = imageSrc;
        this._x = xCoord
        this._y = yCoord
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
}
