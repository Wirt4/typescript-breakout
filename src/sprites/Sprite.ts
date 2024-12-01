export class Sprite {
    private _imageSrc: string;

    constructor(imageSrc: string) {
        this._imageSrc = imageSrc;
    }

    get imageSrc(): string{
        return this._imageSrc;
    }
}
