import {CanvasView} from "../../src/view/CanvasView";
import {Sprite} from "../../src/sprites/Sprite";
import {Brick} from "../../src/sprites/Brick";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../../src/setup";

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
})

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
    it("when drawSprites is called and sprite image is valid, expect drawImage to be called with the sprite's image",()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x:0, y: 0}
        const size={width:0, height:0}
        const sprite = new Sprite('../image.png', pos, size)
        jest.spyOn(sprite, 'hasValidImage').mockReturnValue(true)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.objectContaining({src: expect.stringContaining('image.png')}),
            expect.anything() ,expect.anything(), expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's image, different data",()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x:0, y: 0}
        const size={width:0, height:0}
        const sprite = new Sprite('../../image3.png', pos, size)
        jest.spyOn(sprite, 'hasValidImage').mockReturnValue(true)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.objectContaining({src: expect.stringContaining('image3.png')}),
            expect.anything() ,expect.anything(), expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's X cord",()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x:3, y: 0}
        const size={width:0, height:0}
        const sprite = new Sprite('../../image3.png', pos, size)
        jest.spyOn(sprite, 'hasValidImage').mockReturnValue(true)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(),
            3,
            expect.anything(), expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's X cord, different data",()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x:64, y: 0}
        const size={width:0, height:0}
        const sprite = new Sprite('../../image3.png', pos, size)
        jest.spyOn(sprite, 'hasValidImage').mockReturnValue(true)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(),
            64,
            expect.anything(), expect.anything(), expect.anything());
    })

    it("when drawSprites is called, expect drawImage to be called with the sprite's Y cord",()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x: 64, y:7}
        const size={width:0, height: 0}
        const sprite = new Sprite('../../image3.png', pos, size)
        jest.spyOn(sprite, 'hasValidImage').mockReturnValue(true)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(),
            7,
            expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's Y cord, different data",()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x:64, y:89}
        const size={width:0, height:0}
        const sprite = new Sprite('../../image3.png', pos, size)
        jest.spyOn(sprite, 'hasValidImage').mockReturnValue(true)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(),
            89,
            expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's width",()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x:64, y:89};
        const size={width: 60, height:0}
        const sprite = new Sprite('../../image3.png', pos,size)
        jest.spyOn(sprite, 'hasValidImage').mockReturnValue(true)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(),
            60,
            expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's width, different data",()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x: 64, y: 89};
        const size = {width: 45, height: 100};
        const sprite = new Sprite('../../image3.png', pos, size)
        jest.spyOn(sprite, 'hasValidImage').mockReturnValue(true)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(),
            45,
            expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's height",()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x: 64, y: 89};
        const size = {width: 45, height: 100};
        const sprite = new Sprite('../../image3.png', pos, size)
        jest.spyOn(sprite, 'hasValidImage').mockReturnValue(true)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(), expect.anything(),
            100);
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's height, different data",()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x: 64, y: 89};
        const size = {width: 45, height: 234};
        const sprite = new Sprite('../../image3.png',pos, size)
        jest.spyOn(sprite, 'hasValidImage').mockReturnValue(true)
        canvasView.drawSprite(sprite)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(), expect.anything(),
            234);
    })
})

describe('CanvasView.drawBricks',()=>{
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
    it('if bricks Array has one brick, then draw the contents of that brick to canvas',()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x: 0, y: 0};
        const brick = new Brick('./brick-image.png', pos)
        jest.spyOn(brick, 'hasValidImage').mockReturnValue(true)
        const bricks = [brick]
        canvasView.drawBricks(bricks)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.objectContaining({src: expect.stringContaining('brick-image.png')}), 0, 0, BRICK_WIDTH, BRICK_HEIGHT);
    })
    it('if bricks Array has one brick, then draw the contents of that brick to canvas, different data',()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x: 5, y: 8};
        const brick = new Brick('./brick-image2.png',pos)
        jest.spyOn(brick, 'hasValidImage').mockReturnValue(true)
        const bricks = [brick]
        canvasView.drawBricks(bricks)
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.objectContaining({src: expect.stringContaining('brick-image2.png')}), 5, 8, BRICK_WIDTH, BRICK_HEIGHT);
    })
    it('if bricks Array has three bricks, then draw three bricks to canvas',()=>{
        canvasView = new CanvasView('#playField');
        const pos = {x: 5, y: 8};
        const brick = new Brick('./brick-image2.png',pos)
        jest.spyOn(brick, 'hasValidImage').mockReturnValue(true)
        const bricks = [brick, brick, brick]
        canvasView.drawBricks(bricks)
        expect(mockContext.drawImage).toHaveBeenCalledTimes(3)
    })
})
