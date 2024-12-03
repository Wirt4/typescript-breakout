import {Sprite} from "../sprites/Sprite";
import {Brick} from "../sprites/Brick";

export class CanvasView {
    canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D | null;
    private start: HTMLObjectElement | null;
    private scoreDisplay: HTMLObjectElement | null;
    private infoDisplay: HTMLObjectElement | null;

    constructor(canvasName: string) {
        this.canvas = this.queryCanvas(canvasName)
        if (typeof this.canvas?.getContext == 'function'){
            this.context = this.canvas?.getContext('2d') || null;
        }else{
            this.context  =null
        }
        this.start = this.queryDocument('start')
        this.scoreDisplay = this.queryDocument('score')
        this.infoDisplay = this.queryDocument('info')
    }

    queryDocument (id: string): HTMLObjectElement {
       return this.query(`#${id}`) as HTMLObjectElement;
    }

    queryCanvas(id: string): HTMLCanvasElement {
        return this.query(id) as HTMLCanvasElement;
    }

    query(id: string):any{
        return  document.querySelector(id)
    }

    clear(): void{
        if (this.context) {
            this.context?.clearRect(0,0,
                this.canvas.width, this.canvas.height);
        }
    }

    initStartButton(startFunction:(view: CanvasView)=>void):void{
        this.start?.addEventListener('click', () => startFunction(this));
    }

    drawScore(score: number):void {
        this.setComponentHTML(this.scoreDisplay, score.toString())
    }

    drawInfo(info: string):void{
        this.setComponentHTML(this.infoDisplay, info)
    }

    setComponentHTML(element: HTMLObjectElement | null, data: string){
        if (element) element.innerHTML = data
    }

    drawSprite(sprite: Sprite):void{
        if (this.context && sprite.hasValidImage()) {
            this.context.drawImage(
                sprite.image,
                sprite.x,
                sprite.y,
                sprite.width,
                sprite.height
            );
        } else {
            console.warn("Cannot draw sprite; image is not ready or broken.", sprite);
        }
    }

    drawBricks(bricks:Brick[]): void{
        bricks.forEach((brick) => {
            this.drawSprite(brick)
        })
    }
}
