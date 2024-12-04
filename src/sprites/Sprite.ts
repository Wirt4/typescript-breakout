import {Size, Vector} from "../types";

export class Sprite {
    public position: Vector;
    private readonly _w: number;
    private readonly _h: number;
    protected _img: HTMLImageElement;

    constructor(imageSrc: string, startPosition:Vector, size: Size) {
        this._img = new Image();
        this.position = startPosition
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

    isInXRange(s: Sprite):boolean{
        return s.position.x <= this.rightMostX && s.rightMostX >= this.position.x
    }

    get image():HTMLImageElement{
        return this._img
    }

    get rightMostX():number{
        return this.position.x + this.width
    }

    get bottomMostY() : number{
        return this.position.y  + this.height
    }

    get width(): number{
        return this._w
    }

    get height(): number{
        return this._h
    }

    get centerPoint():Vector{
        return {x: this.position.x + this.width/2, y: this.position.y + this.height/2};
    }
}
