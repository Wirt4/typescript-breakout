export class Sprite {
    private readonly _imageSrc: string;
    private readonly _x: number;

    constructor(imageSrc: string, xCoord: number) {
        this._imageSrc = imageSrc;
        this._x = xCoord
    }

    get imageSrc(): string{
        return this._imageSrc;
    }

    get x(): number {
        return this._x
    }
}
