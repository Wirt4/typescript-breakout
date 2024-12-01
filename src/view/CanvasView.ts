export class CanvasView {
    private canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D | null;
    private start: HTMLObjectElement | null;

    constructor(canvasName: string) {
        this.canvas = document.querySelector(canvasName);
        this.context = this.canvas?.getContext('2d') || null;
        this.start = document.querySelector('#start');
    }

    clear(): void{
        if (this.context) {
            this.context?.clearRect(0,0,
                this.canvas.width, this.canvas.height);
        }
    }

    initStartButton(startFunction:(view: CanvasView)=>void){
        this.start?.addEventListener('click', () => startFunction(this));
    }

    drawScore(score: number) {}
}
