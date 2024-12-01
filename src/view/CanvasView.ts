export class CanvasView {
    private canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D | null;
    private start: HTMLObjectElement | null;
    private scoreDisplay: HTMLObjectElement | null;

    constructor(canvasName: string) {
        this.canvas = document.querySelector(canvasName);
        if (typeof this.canvas?.getContext == 'function'){
            this.context = this.canvas?.getContext('2d') || null;
        }
        this.start = document.querySelector('#start');
        this.scoreDisplay = document.querySelector('#score');
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

    drawScore(score: number) {
        this.scoreDisplay.innerHTML = "10"
    }
}
