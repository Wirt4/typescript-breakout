import {CanvasView} from "../../src/view/CanvasView";
import {Sprite} from "../../src/sprites/Sprite";

describe('CanvasView constructor tests', () => {
    it('Object instantiates without error',()=>{
        new CanvasView('canvasID')
    })
})
describe('CanvasView.clear', () => {
    let canvasView: CanvasView;
    let mockCanvas: HTMLCanvasElement;
    let mockContext: jest.Mocked<CanvasRenderingContext2D>;

    beforeEach(() => {
        mockCanvas = document.createElement('canvas');
        mockCanvas.width = 800;
        mockCanvas.height = 600;

        mockContext = {
            clearRect: jest.fn(),
            drawImage: jest.fn(),
        } as unknown as jest.Mocked<CanvasRenderingContext2D>;

        jest.spyOn(mockCanvas, 'getContext').mockReturnValue(mockContext);
        jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
            if (selector === '#playField') return mockCanvas;
            return null;
        });

        canvasView = new CanvasView('#playField');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should call clearRect with canvas dimensions', () => {
        canvasView.clear();

        expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 800, 600);
        expect(mockContext.clearRect).toHaveBeenCalledTimes(1);
    });

    test('should call clearRect with canvas dimensions, different dimensions', () => {
        mockCanvas.width = 1600;
        mockCanvas.height = 1200;

        canvasView.clear();

        expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 1600, 1200);
        expect(mockContext.clearRect).toHaveBeenCalledTimes(1);
    });

    test('should not throw if context is null', () => {
        jest.spyOn(mockCanvas, 'getContext').mockReturnValue(null);

        const nullContextView = new CanvasView('#playField');
        expect(() => nullContextView.clear()).not.toThrow();
    });
});
describe('CanvasView.initStartButton', () => {
    let canvasElement: HTMLCanvasElement;
    let startButton: HTMLButtonElement;
    let mockStartFunction: jest.Mock;
    beforeEach(() => {
        // Mock DOM elements
        document.body.innerHTML = `
      <canvas id="playField"></canvas>
      <button id="start"></button>
    `;

        canvasElement = document.querySelector('#playField') as HTMLCanvasElement;
        startButton = document.querySelector('#start') as HTMLButtonElement;
        mockStartFunction = jest.fn();

        // Ensure the mocked elements exist
        expect(canvasElement).not.toBeNull();
        expect(startButton).not.toBeNull();
    });
    it('argument to initStartButton is a function that takes a CanvaView type as an argument', () => {
        const func = (arg: CanvasView) => {
        }
        const view = new CanvasView('#playField')
        view.initStartButton(func)
    })
    it('should add a click event listener to the start button', () => {
        const view = new CanvasView('#playField');
        view.initStartButton(mockStartFunction);
        startButton.click();
        expect(mockStartFunction).toHaveBeenCalledTimes(1);
        expect(mockStartFunction).toHaveBeenCalledWith(view);
    });
})

describe('CanvasView.drawScore',()=>{
    let canvasView: CanvasView;
    let scoreDisplay: HTMLObjectElement;

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="playField">
        <button id="start">Start</button>
        <canvas></canvas>
        <div id="score"></div>
      </div>`;
        canvasView = new CanvasView('#playField');
        scoreDisplay = document.querySelector('#score') as HTMLObjectElement;
    })

    it('should draw score of 10 on the canvas', () => {
        const score = 10;
        canvasView.drawScore(score);
        expect(scoreDisplay.innerHTML).toBe(score.toString());
    });

    it('should draw score of 56 on the canvas', () => {
        const score = 56;
        canvasView.drawScore(score);
        expect(scoreDisplay.innerHTML).toBe(score.toString());
    });
})

describe('CanvasView.drawInfo',()=>{
    let canvasView: CanvasView;
    let infoDisplay: HTMLObjectElement;

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="playField">
        <button id="start">Start</button>
        <canvas></canvas>
        <div id="info"></div>
      </div>`;
        canvasView = new CanvasView('#playField');
        infoDisplay = document.querySelector('#info') as HTMLObjectElement;
    })
    it('should write "you win" to screen',()=>{
        canvasView.drawInfo("You win!")
        expect(infoDisplay.innerHTML).toBe("You win!");
    })
    it('should write "you lose" to screen',()=>{
        canvasView.drawInfo("You lose")
        expect(infoDisplay.innerHTML).toBe("You lose");
    })
})

describe('CanvasView.drawSprite',()=>{
    let canvasView: CanvasView;
    let mockCanvas: HTMLCanvasElement;
    let mockContext: jest.Mocked<CanvasRenderingContext2D>;

    beforeEach(()=>{
        mockCanvas = document.createElement('canvas');
        mockContext = {
            clearRect: jest.fn(),
            drawImage: jest.fn(),
        } as unknown as jest.Mocked<CanvasRenderingContext2D>;

        jest.spyOn(mockCanvas, 'getContext').mockReturnValue(mockContext);
        jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
            if (selector === '#playField') return mockCanvas;
            return null;
        });

    })

    afterAll(()=>{
        jest.restoreAllMocks()
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's image",()=>{
        canvasView = new CanvasView('#playField');
        const sprite = new Sprite('image.png', 0, 0)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.objectContaining({src: expect.stringContaining('image.png')}),
            expect.anything() ,expect.anything(), expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's image, different data",()=>{
        canvasView = new CanvasView('#playField');
        const sprite = new Sprite('../../image3.png', 0, 0)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.objectContaining({src: expect.stringContaining('image3.png')}),
            expect.anything() ,expect.anything(), expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's X cord",()=>{
        canvasView = new CanvasView('#playField');
        const sprite = new Sprite('../../image3.png', 3, 0)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(),
            3,
            expect.anything(), expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's X cord, different data",()=>{
        canvasView = new CanvasView('#playField');
        const sprite = new Sprite('../../image3.png', 64, 0)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(),
            64,
            expect.anything(), expect.anything(), expect.anything());
    })

    it("when drawSprites is called, expect drawImage to be called with the sprite's Y cord",()=>{
        canvasView = new CanvasView('#playField');
        const sprite = new Sprite('../../image3.png', 64, 7)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(),
            7,
            expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's Y cord, different data",()=>{
        canvasView = new CanvasView('#playField');
        const sprite = new Sprite('../../image3.png', 64, 89)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(),
            89,
            expect.anything(), expect.anything());
    })
})
