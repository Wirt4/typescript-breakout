import {CanvasView} from "../../src/view/CanvasView";
import {Sprite} from "../../src/sprites/Sprite";
import {Brick} from "../../src/sprites/Brick";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../../src/setup";
import {Position, Size} from "../../src/types";

describe('CanvasView.clear', () => {
    let canvasView: CanvasView;
    let mockCanvas: HTMLCanvasElement;
    let mockContext: jest.Mocked<CanvasRenderingContext2D>;
    let canvasId: string

    beforeEach(() => {
        mockCanvas = document.createElement('canvas');
        mockCanvas.width = 800;
        mockCanvas.height = 600;
        canvasId = '#playField'

        mockContext = {
            clearRect: jest.fn(),
            drawImage: jest.fn(),
        } as unknown as jest.Mocked<CanvasRenderingContext2D>;

        jest.spyOn(mockCanvas, 'getContext').mockReturnValue(mockContext);
        jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
            if (selector === canvasId) return mockCanvas;
            return null;
        });

        canvasView = new CanvasView('#playField');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should call clearRect with canvas dimensions', () => {
        canvasView.clear();
        expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0,   mockCanvas.width,  mockCanvas.height );
    });

    test('should call clearRect with canvas dimensions, different dimensions', () => {
        mockCanvas.width = 1600;
        mockCanvas.height = 1200;
        canvasView.clear();
        expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, mockCanvas.width, mockCanvas.height );
    });

    test('should not throw if context is null', () => {
        jest.spyOn(mockCanvas, 'getContext').mockReturnValue(null);
        const nullContextView = new CanvasView(canvasId);
        expect(() => nullContextView.clear()).not.toThrow();
    });
})

describe('CanvasView.initStartButton', () => {
    let canvasElement: HTMLCanvasElement;
    let startButton: HTMLButtonElement;
    let mockStartFunction: jest.Mock;
    let view: CanvasView;
    beforeEach(() => {
        document.body.innerHTML = `
      <canvas id="playField"></canvas>
      <button id="start"></button>
    `;

        canvasElement = document.querySelector('#playField') as HTMLCanvasElement;
        startButton = document.querySelector('#start') as HTMLButtonElement;
        mockStartFunction = jest.fn();
        expect(canvasElement).not.toBeNull();
        expect(startButton).not.toBeNull();
        view = new CanvasView('#playField');
    });
    it('should add a click event listener to the start button', () => {
        view.initStartButton(mockStartFunction);
        startButton.click();
        expect(mockStartFunction).toHaveBeenCalledWith(view);
    });
})

describe('CanvasView.drawScore',()=>{
    let canvasView: CanvasView;
    let scoreDisplay: HTMLObjectElement;

    const assertScore = (score: number)=>{
        canvasView.drawScore(score);
        expect(scoreDisplay.innerHTML).toBe(score.toString());
    }

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
       assertScore(10)
    });

    it('should draw score of 56 on the canvas', () => {
        assertScore(56)
    });
})


describe('CanvasView.drawInfo',()=>{
    let canvasView: CanvasView;
    let infoDisplay: HTMLObjectElement;

    const assertInfo = (info: string)=>{
        canvasView.drawInfo(info)
        expect(infoDisplay.innerHTML).toBe(info);
    }
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
        assertInfo("You win!")
    })
    it('should write "you lose" to screen',()=>{
        assertInfo("You lose")
    })
})

describe('CanvasView.drawSprite',()=>{
    let canvasView: CanvasView;
    let mockCanvas: HTMLCanvasElement;
    let mockContext: jest.Mocked<CanvasRenderingContext2D>;
    let sprite : Sprite;
    let spritePosition: Position;
    let spriteSize: Size;
    let spriteImage: string

    const drawSpriteOnCanvas = ()=>{
        sprite = new Sprite(spriteImage,spritePosition, spriteSize)
        jest.spyOn(sprite, 'hasValidImage').mockReturnValue(true)
        canvasView.drawSprite(sprite)
    }

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
        spritePosition = {x:0, y: 0}
        spriteSize={width:0, height:0}
        spriteImage = '../image.png'
        canvasView = new CanvasView('#playField');
    })

    afterAll(()=>{
        jest.restoreAllMocks()
    })
    it("when drawSprites is called and sprite image is valid, expect drawImage to be called with the sprite's image",()=>{
       drawSpriteOnCanvas()
        expect(mockContext.drawImage).toHaveBeenCalledWith(
            expect.objectContaining({src: expect.stringContaining('image.png')}),
            expect.anything() ,expect.anything(), expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's image, different data",()=>{
        spriteImage = '../image3.png'
        drawSpriteOnCanvas()
        expect(mockContext.drawImage).toHaveBeenCalledWith(
            expect.objectContaining({src: expect.stringContaining('image3.png')}),
            expect.anything() ,expect.anything(), expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's X cord",()=>{
        spritePosition = {x:3, y: 0}
        drawSpriteOnCanvas()
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(),
            3,
            expect.anything(), expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's X cord, different data",()=>{
        spritePosition = {x:64, y: 0}
        drawSpriteOnCanvas()
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(),
            64,
            expect.anything(), expect.anything(), expect.anything());
    })

    it("when drawSprites is called, expect drawImage to be called with the sprite's Y cord",()=>{
        spritePosition = {x: 64, y:7}
        drawSpriteOnCanvas()
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(),
            7,
            expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's Y cord, different data",()=>{
        spritePosition= {x:64, y:89}
        drawSpriteOnCanvas()
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(),
            89,
            expect.anything(), expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's width",()=>{
        spriteSize={width: 60, height:0}
        drawSpriteOnCanvas()
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(),
            60,
            expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's width, different data",()=>{
        spriteSize = {width: 45, height: 100};
        drawSpriteOnCanvas()
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(),
            45,
            expect.anything());
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's height",()=>{
        spriteSize = {width: 45, height: 100};
        drawSpriteOnCanvas()
        expect(mockContext.drawImage).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(), expect.anything(),
            100);
    })
    it("when drawSprites is called, expect drawImage to be called with the sprite's height, different data",()=>{
        spriteSize = {width: 45, height: 234};
        drawSpriteOnCanvas()
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
