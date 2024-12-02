import {Size, Vector} from "../types";

export class Sprite {
    private readonly _x: number;
    private readonly _y: number;
    private readonly _w: number;
    private readonly _h: number;
    protected _img: HTMLImageElement;

    constructor(imageSrc: string, coords:Vector, size: Size) {
        this._img = new Image();
        this._x = coords.x
        this._y = coords.y
        this._w = size.width;
        this._h = size.height;

        this.loadImage(imageSrc).catch((err: Error) => {
            console.error(err);
        });
    }

    private async loadImage(src: string): Promise<void> {
        try {
            await new Promise<void>((resolve, reject) => {
                this._img.onload = () => {
                    console.log(`Image loaded: ${src}`);
                    resolve();
                };

                this._img.onerror = () => {
                    reject(new Error(`Failed to load image: ${src}`));
                };

                this._img.src = src;
            });
        } catch (error) {
            throw error;
        }
    }

    hasValidImage(): boolean{
        return this._img.complete && this._img.naturalWidth !== 0
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
