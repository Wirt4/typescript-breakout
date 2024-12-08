import {Game} from "../src/Game";
import {CanvasView} from "../src/view/CanvasView";
import {createBricks} from "../src/helper";
import {Brick} from "../src/sprites/Brick";
import {Paddle} from "../src/sprites/Paddle";
import {BALL_SIZE, BALL_SPEED, BALL_STARTX, BALL_STARTY, PADDLE_SPEED, PADDLE_STARTX} from "../src/setup";
import {Ball} from "../src/sprites/Ball";
import {Contact} from "../src/enums";

jest.mock("../src/helper");
jest.mock("../src/sprites/Paddle");
jest.mock("../src/sprites/Ball");

describe('Game.setGameOver tests',()=>{
    let view: CanvasView
    let spy: jest.SpyInstance
    let game: Game
    beforeEach(()=>{
        view = new CanvasView('#playField')
        spy = jest.spyOn(view, 'drawInfo').mockImplementation(()=>{})
        game = new Game(view)
    })
    afterEach(()=>{
        jest.resetAllMocks()
    })
    it('when Game.setGameOver is called, CanvasView.setInfo is called with message "Game Over"',()=>{
        game.setGameOver()
        expect(spy).toHaveBeenCalledWith("Game Over!")
    })
    it('when Game.setGameOver is not called, CanvasView.setInfo is not called with message "Game Over"',()=>{
        expect(spy).not.toHaveBeenCalledWith("Game Over!")
    })
})

describe('Game.isGameOver',()=>{
    let view: CanvasView
    let game: Game
    beforeEach(()=>{
        view = new CanvasView('#playField')
        game = new Game(view)
    })
    afterEach(()=>{
        jest.resetAllMocks()
    })
    it('when game is created, Game.isGameOver is false',()=>{
        expect(game.isGameOver).toEqual(false)
    })
})

describe('Game.setGameWin tests',()=>{
    let view: CanvasView
    let game: Game
    let spy: jest.SpyInstance
    beforeEach(()=>{
        view = new CanvasView('#playField')
        spy = jest.spyOn(view, 'drawInfo').mockImplementation(()=>{})
        game = new Game(view)
    })
    afterEach(()=>{
        jest.resetAllMocks()
    })
    it('when Game.setGameOver is called, CanvasView.setInfo is called with message "Game Won"',()=>{
        game.setGameWin()
        expect(spy).toHaveBeenCalledWith("Game Won!")
    })
    it('when Game.setGameOver is not called, CanvasView.setInfo is not called with message "Game Won',()=>{
        expect(spy).not.toHaveBeenCalledWith("Game Won!")
    })
})

describe('Game.start tests',()=>{
    let view: CanvasView
    let game: Game
    beforeEach(()=>{
        view = new CanvasView('#playField');
        game = new Game(view);
        (createBricks as jest.Mock).mockReturnValue([]);
    })
    afterEach(()=>{
        jest.resetAllMocks()
    })
    it('after game.start is called, score is set to zero',()=>{
        game.start()
        expect(game.score).toEqual(0)
    })
    it('expect view.drawInfo to have been called with an empty string',()=>{
        const drawInfoSpy = jest.spyOn(view, 'drawInfo').mockImplementation(()=>{})
        game = new Game(view)
        game.start()
        expect(drawInfoSpy).toHaveBeenCalledWith("")
    })
    it('expect view.drawScore to have been called with 0',()=>{
        const drawScoreSpy = jest.spyOn(view, 'drawScore').mockImplementation(()=>{})
        game = new Game(view)
        game.start()
        expect(drawScoreSpy).toHaveBeenCalledWith(0)
    })
    it('expect game.start to finish by calling game.loop',()=>{
        const loopSpy = jest.spyOn(game, 'loop')
        game.start()
        expect(loopSpy).toHaveBeenCalled()
    })
})

describe('Game.loop tests',()=>{
    let view: CanvasView
    let game: Game
    let clearSpy: jest.SpyInstance
    let drawBricksSpy: jest.SpyInstance
    let drawSpriteSpy: jest.SpyInstance
    let animationSpy: jest.SpyInstance
    let drawScoreSpy: jest.SpyInstance
    let ballRewindSpy: jest.SpyInstance
    function mockGetter(ball: Ball, property: string, value: number){
        Object.defineProperty(ball, property, {
            get: () => value,
        });
    }
    beforeEach(()=>{
        document.body.innerHTML = `<canvas id="playField" width="1000" height="600"></canvas><button id="start"></button>`
        view = new CanvasView('#playField');
        clearSpy = jest.spyOn(view, 'clear')
        drawBricksSpy = jest.spyOn(view, 'drawBricks')
        drawSpriteSpy = jest.spyOn(view, 'drawSprite')
        animationSpy = jest.spyOn(global, 'requestAnimationFrame').mockReturnValue(1)
        drawScoreSpy = jest.spyOn(view, 'drawScore')
        game = new Game(view);
        ballRewindSpy = jest.spyOn(game.ball, 'rewind')
    })
    afterEach(()=>{
        jest.resetAllMocks()
    })
    it('Game.loop calls view.clear()', ()=>{
        game.loop()
        expect(clearSpy).toHaveBeenCalled()
    })
    it('game loop calls view.drawBricks', ()=>{
        drawBricksSpy = jest.spyOn(view, 'drawBricks').mockImplementation(()=>{})
        game = new Game(view)
        jest.spyOn(game, 'detectEvents').mockImplementation(()=>{})
        game.loop()
        expect(drawBricksSpy).toHaveBeenCalled()
    })
    it('Game.loop calls view.drawSprite with the paddle argument',()=>{
        game.loop();
        expect(drawSpriteSpy).toHaveBeenCalledWith(game.paddle);
    })
    it('Game.loop calls view.drawSprite with the ball argument',()=>{
        game.loop();
        expect(drawSpriteSpy).toHaveBeenCalledWith(game.ball);
    })
    it('Game.loop calls ball.move',()=>{
        const moveSpy = jest.spyOn(game.ball, 'move')
        game.loop();
        expect(moveSpy).toHaveBeenCalled()
    })
    it('Game.loop calls Game.paddle.detectMove()',()=>{
        const moveSpy = jest.spyOn(game.paddle, 'detectMove')
        game.loop();
        expect(moveSpy).toHaveBeenCalled()
    })
    it('if paddle has detected collision with ball, then bounceY is called',()=>{
        jest.spyOn(game.paddle, 'isCollidedWith').mockReturnValue(true)
        const bounceSpy = jest.spyOn(game.ball, 'bounceY')
        game.loop()
        expect(bounceSpy).toHaveBeenCalled()
    })
    it('if bricks.detectCollision() returns a TOP_OR_BOTTOM contact, update the score', ()=>{
        game = new Game(view)
        jest.spyOn(game.bricks, 'detectCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
        game.loop();
        expect(drawScoreSpy).toHaveBeenCalledWith(1)
        game.loop()
        expect(drawScoreSpy).toHaveBeenCalledWith(2)
    })
    it('if bricks.detectCollision returns a SIDE contact, update the score',()=>{
        game = new Game(view)
        jest.spyOn(game.bricks, 'detectCollision').mockReturnValue(Contact.SIDE)
        game.loop();
        expect(drawScoreSpy).toHaveBeenCalledWith(1)
    })
    it('if bricks.detectCollision() returns NO_CONTACT, do not update the score', ()=>{
        const spy = jest.spyOn(view, 'drawScore')
        game = new Game(view)
        jest.spyOn(game.bricks, 'detectCollision').mockReturnValue(Contact.NO_CONTACT)
        game.loop();
        expect(spy).not.toHaveBeenCalledWith(1)
    })
    it('if bricks.detectCollision() returns TOP_OR_BOTTOM bounce the ball on Y Axis', ()=>{
        const spy = jest.spyOn(game.ball, 'bounceY')
        jest.spyOn(game.bricks, 'detectCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
        game.loop();
        expect(spy).toHaveBeenCalled()
    })
    it('if bricks.detectCollision() returns SIDE bounce the ball on X Axis', ()=>{
        const spy = jest.spyOn(game.ball, 'bounceX')
        jest.spyOn(game.bricks, 'detectCollision').mockReturnValue(Contact.SIDE)
        game.loop();
        expect(spy).toHaveBeenCalled()
    })
    it('if bricks.detectCollision() does not return SIDE, do not bounce the ball on X Axis', ()=>{
        const spy = jest.spyOn(game.ball, 'bounceX')
        jest.spyOn(game.bricks, 'detectCollision').mockReturnValue(Contact.NO_CONTACT)
        game.loop();
        expect(spy).not.toHaveBeenCalled()
    })
    it('Game.loop ends by calling requestAnimationFrame', ()=>{
        game.loop()
        expect(animationSpy).toHaveBeenCalled()
    })
    it('if bricks.detectCollision() returns NO_CONTACT, then neither ball.rewind is not called',()=>{
        jest.spyOn(game.bricks, 'detectCollision').mockReturnValue(Contact.NO_CONTACT)
        game.loop();
        expect(ballRewindSpy).not.toHaveBeenCalled()
    })
    it('if bricks.detectCollision() returns SIDE then neither ball.rewind is called with the bricks value "collisionOverlap',()=>{
        jest.spyOn(game.bricks, 'detectCollision').mockReturnValue(Contact.SIDE)
        const overlapDistance = 2
        jest.spyOn(game.bricks, 'collisionOverlap').mockReturnValue(overlapDistance)
        game.loop();
        expect(ballRewindSpy).toHaveBeenCalledWith(overlapDistance)
    })
    it('if ball y goes lower than 0, then call ball.bounceY',()=>{
        const bounceYSpy = jest.spyOn(game.ball, 'bounceY')
        mockGetter(game.ball, 'y', -1)
        game.loop()
        expect(bounceYSpy).toHaveBeenCalled()
    })
    it('if ball x goes lower than 0, then call ball.bounceX',()=>{
        const bounceXSpy = jest.spyOn(game.ball, 'bounceX')
        mockGetter(game.ball, 'x', -1)
        game.loop()
        expect(bounceXSpy).toHaveBeenCalled()
    })
    it('if ball.rightmostX is higher than the canvas width, then call ball.bounceX',()=>{
        const bounceXSpy = jest.spyOn(game.ball, 'bounceX')
        //canvas width is 1000
        mockGetter(game.ball, 'rightMostX', 1001)
        game.loop()
        expect(bounceXSpy).toHaveBeenCalled()
    })
})

describe('constructor tests',()=>{
    let view: CanvasView
    beforeEach(()=>{
        view = new CanvasView("#playField")
        new Game(view)
    })
    afterEach(()=>{
        jest.clearAllMocks()
    })
    it('game.bricks is set with the output of createBricks',()=>{
        const brick = new Brick('stub',{x:0, y:0});
        const expected = [brick];
        (createBricks as jest.Mock).mockReturnValue(expected);
        const game = new Game(view)
        expect(game.bricks.arr).toEqual(expected);
    })
    it('a paddle in instantiated with STARTX const, ',()=>{
        expect(Paddle).toHaveBeenCalledWith(PADDLE_STARTX, expect.anything(), expect.anything())
    })
    it('a paddle in instantiated with  canvas dimensions',()=>{
        document.body.innerHTML = `<canvas id="playField" width="1000" height="600"></canvas><button id="start"></button>`
        view = new CanvasView('#playField');
        const expected = {width: 1000, height:600}
        new Game(view)
        expect(Paddle).toHaveBeenCalledWith(expect.anything(), expected, expect.anything())
    })
    it('a paddle in instantiated with PADDLE_SPEED const',()=>{
        expect(Paddle).toHaveBeenCalledWith(expect.anything(), expect.anything(), PADDLE_SPEED)
    })
    it('a ball is instantiated with  BALL_STARTX and BALL_STARTY cords',()=>{
        const expectedPosition = {x: BALL_STARTX, y: BALL_STARTY};
        expect(Ball).toHaveBeenCalledWith(expectedPosition, expect.anything(), expect.anything())
    })
    it('a ball is instantiated with  BALL_SIZE const,',()=>{
        expect(Ball).toHaveBeenCalledWith(expect.anything(), BALL_SIZE, expect.anything())
    })
    it('a ball is instantiated with BALL_SPEED const,',()=>{
        expect(Ball).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.objectContaining({xComponent: BALL_SPEED}))
    })
})
