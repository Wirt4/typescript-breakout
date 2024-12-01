export class Sprite {
    private readonly _imageSrc: string;

    constructor(imageSrc: string, xCoord: number) {
        this._imageSrc = imageSrc;
    }

    get imageSrc(): string{
        return this._imageSrc;
    }
}
