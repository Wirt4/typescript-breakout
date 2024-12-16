import {Game} from "../src/Game/Game";
import {CanvasView} from "../src/view/CanvasView";
import {Paddle} from "../src/sprites/Paddle";
import {Ball} from "../src/sprites/Ball";
import {Contact} from "../src/enums";
import {BricksWrapper} from "../src/sprites/Bricks/BricksWrapper";
import {IBall} from "../src/Game/Interfaces/sprites/IBall";
import {Brick} from "../src/sprites/Bricks/Brick";
import {SpriteFacade} from "../src/Game/Interfaces/spriteFacade";

jest.mock("../src/sprites/Bricks/BricksWrapperClient");
jest.mock("../src/sprites/Paddle");
jest.mock("../src/sprites/Ball");

describe('Game.setGameOver tests',()=>{
    let view: CanvasView
    let spy: jest.SpyInstance
    let game: Game
    beforeEach(()=>{
        view = new CanvasView('#playField')
        spy = jest.spyOn(view, 'drawInfo').mockImplementation(()=>{})
        const sprites = {bricksWrapper:  new BricksWrapper([]), paddle: new Paddle(0, {width: 800, height: 600}), ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})}
        game = new Game( view, sprites)
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
        const sprites = {bricksWrapper:  new BricksWrapper([]), paddle: new Paddle(0, {width: 800, height: 600}), ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})}
        game = new Game(view, sprites)
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
        const sprites = {bricksWrapper:  new BricksWrapper([]), paddle: new Paddle(0, {width: 800, height: 600}), ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})}
        game = new Game(view, sprites)
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
    let sprites: SpriteFacade
    beforeEach(()=>{
        view = new CanvasView('#playField');
        sprites = { paddle: new Paddle(0, {width: 800, height: 600}), ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})}
        game = new Game(view, sprites)
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
        game = new Game(view, sprites)
        game.start()
        expect(drawInfoSpy).toHaveBeenCalledWith("")
    })
    it('expect view.drawScore to have been called with 0',()=>{
        const drawScoreSpy = jest.spyOn(view, 'drawScore').mockImplementation(()=>{})
        game = new Game(view,  sprites)
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
    let wrapper: BricksWrapper
    function mockGetter(ball: IBall, property: string, value: number){
        Object.defineProperty(ball, property, {
            get: () => value,
        });
    }
    function setGameFromCanvasSize(width: number, height: number, isEmpty=true){
        document.body.innerHTML = `<canvas id="playField" width="${width}" height="${height}"></canvas><button id="start"></button>`
        wrapper = new BricksWrapper([])
        jest.spyOn(wrapper, 'isEmpty').mockReturnValue(isEmpty)
        const brick = new Brick({x:0, y:0})
        jest.spyOn(brick, 'detectCollision').mockImplementation(()=>{})
        jest.spyOn(brick, 'hasCollision').mockReturnValue(Contact.NO_CONTACT)
        const sprites = {bricks:[brick], bricksWrapper: wrapper, paddle: new Paddle(0, {width, height}), ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})}
        game = new Game(view, sprites);
    }
    function mockCollisionType(collision: Contact){
        wrapper = new BricksWrapper([])
        const brick = new Brick({x:0, y:0})
        jest.spyOn(brick, 'detectCollision').mockImplementation(()=>{})
        jest.spyOn(brick, 'hasCollision').mockReturnValue(collision)
        jest.spyOn(wrapper, 'collisionType').mockReturnValue(collision)
        jest.spyOn(wrapper, 'isEmpty').mockReturnValue(false)
        const sprites = {bricksWrapper:  wrapper, paddle: new Paddle(0, {width:800, height:600}), ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1}), bricks:[brick]}
        game = new Game(view, sprites)
    }
    beforeEach(()=>{
        view = new CanvasView('#playField');
        clearSpy = jest.spyOn(view, 'clear')
        drawBricksSpy = jest.spyOn(view, 'drawBricks')
        drawSpriteSpy = jest.spyOn(view, 'drawSprite')
        animationSpy = jest.spyOn(global, 'requestAnimationFrame').mockReturnValue(1)
        drawScoreSpy = jest.spyOn(view, 'drawScore')
        setGameFromCanvasSize(1000, 600)
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
        const sprites = {bricksWrapper:  new BricksWrapper([]), paddle: new Paddle(0, {width:800, height:600}), ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})}
        game = new Game(view, sprites)
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
    it('if paddle has detected collision with ball, then ball.bounceY is called',()=>{
        jest.spyOn(game.paddle, 'isCollidedWith').mockReturnValue(true)
        const bounceSpy = jest.spyOn(game.ball, 'bounceY')
        game.loop()
        expect(bounceSpy).toHaveBeenCalled()
    })
    it('if the bricks contain a TOP_OR_BOTTOM contact, and its energy is 1, then that brick is removed from the array', ()=>{
        const brick1 = new Brick({x:0, y:0}, 0,{width:10, height:20})
        const brick2 = new Brick({x:0, y:0}, 0,{width:10, height:20})
        jest.spyOn(brick1,'energy', 'get').mockReturnValue(1)
        jest.spyOn(brick1, 'hasCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
        jest.spyOn(brick1,'detectCollision').mockImplementation(()=>{})

        jest.spyOn(brick1,'energy', 'get').mockReturnValue(1)
        jest.spyOn(brick2, 'hasCollision').mockReturnValue(Contact.NO_CONTACT)
        jest.spyOn(brick2,'detectCollision').mockImplementation(()=>{})

        jest.spyOn(wrapper, 'isEmpty').mockReturnValue(false)
        const sprites =
            {bricks:[brick1, brick2],
            bricksWrapper: wrapper,
            paddle: new Paddle(0, {width: 800, height: 600}),
            ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})}
        game = new Game(view, sprites)
        game.loop();
        expect(game.bricks.length).toEqual(1)
    })
    it('if bricks contains a contact and has an energy greater than one, the energy is decremented, and the brick is not removed',()=>{
        const brick = new Brick({x:0, y:0}, 2,{width:10, height:20})
        jest.spyOn(brick,'energy', 'get').mockReturnValue(2)
        jest.spyOn(brick, 'hasCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
        jest.spyOn(brick,'detectCollision').mockImplementation(()=>{})
        jest.spyOn(wrapper, 'isEmpty').mockReturnValue(false)
        const decrementSpy = jest.spyOn(brick, 'reduceEnergy')
        const sprites =
            {
                bricks:[brick],
                bricksWrapper: wrapper,
                paddle: new Paddle(0, {width: 800, height: 600}),
                ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})
            }
        game = new Game(view, sprites)

        game.loop()

        expect(game.bricks.length).toEqual(1)
        expect(decrementSpy).toHaveBeenCalled()
    })
   it('if the bricks contains a collision, then update the score',()=>{
       const brick = new Brick({x:0, y:0}, 2,{width:10, height:20})
       jest.spyOn(brick,'energy', 'get').mockReturnValue(5)
       jest.spyOn(brick, 'hasCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
       jest.spyOn(brick,'detectCollision').mockImplementation(()=>{})
       jest.spyOn(wrapper, 'isEmpty').mockReturnValue(false)
       const sprites =
           {
               bricks:[brick],
               bricksWrapper: wrapper,
               paddle: new Paddle(0, {width: 800, height: 600}),
               ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})
           }
       game = new Game(view, sprites)

       game.loop()
       expect(drawScoreSpy).toHaveBeenCalledWith(1)
       game.loop()
       expect(drawScoreSpy).toHaveBeenCalledWith(2)
   })
    it('if the bricks contains a collision of TOP_OR_BOTTOM, then bounce the ball on its y axis',()=>{
        const brick = new Brick({x:0, y:0}, 2,{width:10, height:20})
        jest.spyOn(brick,'energy', 'get').mockReturnValue(5)
        jest.spyOn(brick, 'hasCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
        jest.spyOn(brick,'detectCollision').mockImplementation(()=>{})
        jest.spyOn(wrapper, 'isEmpty').mockReturnValue(false)
        const ball = new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})
        const bounceYSpy = jest.spyOn(ball, 'bounceY')
        const sprites =
            {
                bricks:[brick],
                bricksWrapper: wrapper,
                paddle: new Paddle(0, {width: 800, height: 600}),
                ball: ball
            }
        game = new Game(view, sprites)

        game.loop()
        expect(bounceYSpy).toHaveBeenCalled()
    })

    it('if the bricks contains a collision of SIDE, then bounce the ball on its x axis',()=>{
        const brick = new Brick({x:0, y:0}, 2,{width:10, height:20})
        jest.spyOn(brick,'energy', 'get').mockReturnValue(5)
        jest.spyOn(brick, 'hasCollision').mockReturnValue(Contact.SIDE)
        jest.spyOn(brick,'detectCollision').mockImplementation(()=>{})
        jest.spyOn(wrapper, 'isEmpty').mockReturnValue(false)
        const ball = new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})
        const bounceXSpy = jest.spyOn(ball, 'bounceX')
        const sprites =
            {
                bricks:[brick],
                bricksWrapper: wrapper,
                paddle: new Paddle(0, {width: 800, height: 600}),
                ball: ball
            }
        game = new Game(view, sprites)
        game.loop()
        expect(bounceXSpy).toHaveBeenCalled()
    })

    it('Game.loop ends by calling requestAnimationFrame', ()=>{
        mockCollisionType(Contact.NO_CONTACT)
        game.loop()
        expect(animationSpy).toHaveBeenCalled()
    })
    it('if bricks.collisionType() returns NO_CONTACT, then neither ball.rewind is not called',()=>{
        mockCollisionType(Contact.NO_CONTACT)
        game.loop();
        expect(ballRewindSpy).not.toHaveBeenCalled()
    })
    it('if bricks.collisionType() returns SIDE then  ball.rewind is called with the overlap distance',()=>{
        const overlapDistance = 2
        const brick = new Brick({x:0, y:0})
        jest.spyOn(wrapper, 'collisionType').mockReturnValue(Contact.SIDE)
        jest.spyOn(brick, 'detectCollision').mockImplementation(()=>{})
        jest.spyOn(brick, 'hasCollision').mockReturnValue(Contact.SIDE)
        jest.spyOn(brick, 'collisionOverlapDistance').mockReturnValue(overlapDistance)

        const sprites = {bricks:[brick], paddle: new Paddle(0, {width: 800, height: 600}), ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})}
        game = new Game(view, sprites)
        ballRewindSpy = jest.spyOn(game.ball, 'rewind')
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
        setGameFromCanvasSize(1000, 600)
        const bounceXSpy = jest.spyOn(game.ball, 'bounceX')
        mockGetter(game.ball, 'rightMostX', 1001)
        game.loop()
        expect(bounceXSpy).toHaveBeenCalled()
    })
    it('if the ball leaves the canvas, then gameOver is set to true',()=>{
        setGameFromCanvasSize(1000, 600)
        mockGetter(game.ball, 'y', 601)
        game.loop()
        expect(game.isGameOver).toEqual(true)
    })
    it('if the ball leaves the canvas, then setGameOver called',()=>{
        setGameFromCanvasSize(1000, 600)
        const spy = jest.spyOn(game, 'setGameOver')
        mockGetter(game.ball, 'y', 601)
        game.loop()
        expect(spy).toHaveBeenCalled()
    })
    it('if the ball does not leave the canvas, then gameOver is false',()=>{
        setGameFromCanvasSize(1000, 600, false)
        mockGetter(game.ball, 'y', 500)
        game.loop()
        expect(game.isGameOver).toEqual(false)
    })
    it('if the bricks are empty, then gameOver is set to true',()=>{
        jest.spyOn(wrapper, 'isEmpty').mockReturnValue(false)
        game = new Game(
            view,
            {
                bricks: [],
                paddle: new Paddle(0, {width: 800, height: 600}),
                ball: new Ball({x:0, y:0}, 5, {xComponent: 1, yComponent: 1})
            }
        )
        game.loop()
        expect(game.isGameOver).toEqual(true)
    })
    it('if isGameOver is true, then the objects stop moving', ()=>{
        Object.defineProperty(game, 'isGameOver', {
            get: () => true,
        })
        game.loop()
        expect(animationSpy).not.toHaveBeenCalled()
    })
})
