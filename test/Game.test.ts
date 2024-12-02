import {Game} from "../src/Game";
import {CanvasView} from "../src/view/CanvasView";
import {createBricks} from "../src/helper";
import {Brick} from "../src/sprites/Brick";
jest.mock("../src/helper");

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
    it('when game is created, Game.isGameOver is false',()=>{
        expect(game.isGameOver).toEqual(false)
    })
    it('when Game.setGameOver is called, isGameOver is set to false',()=>{
        expect(game.isGameOver).toEqual(false)
        game.setGameOver()
        expect(game.isGameOver).toEqual(false)
    })
    it('when Game.setGameOver is called, CanvasView.setInfo is called with message "Game Over"',()=>{
        game.setGameOver()
        expect(spy).toHaveBeenCalledWith("Game Over!")
    })
    it('when Game.setGameOver is not called, CanvasView.setInfo is not called with message "Game Over"',()=>{
        expect(spy).not.toHaveBeenCalledWith("Game Over!")
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
    it('when Game.setGameWin is called, isGameOver is set to false',()=>{
        expect(game.isGameOver).toEqual(false)
        game.setGameWin()
        expect(game.isGameOver).toEqual(false)
    })
    it('when Game.setGameOver is called, CanvasView.setInfo is called with message "Game Over"',()=>{
        game.setGameWin()
        expect(spy).toHaveBeenCalledWith("Game Won!")
    })
    it('when Game.setGameOver is not called, CanvasView.setInfo is not called with message "Game Over"',()=>{
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
    it('game has function named "start"',()=>{
        game.start()
    })
    it('after game.start is called, score is set to zero',()=>{
        game.start()
        expect(game.score).toEqual(0)
    })
    it('expect view.drawInfo to have been called with an empty string',()=>{
        const spy = jest.spyOn(view, 'drawInfo').mockImplementation(()=>{})
        game = new Game(view)
        game.start()
        expect(spy).toHaveBeenCalledWith("")
    })
    it('expect view.drawScore to have been called with 0g',()=>{
        const spy = jest.spyOn(view, 'drawScore').mockImplementation(()=>{})
        game = new Game(view)
        game.start()
        expect(spy).toHaveBeenCalledWith(0)
    })
    it('expect game.start to finish by calling game.loop',()=>{
        const loopSpy = jest.spyOn(game, 'loop')
        game.start()
        expect(loopSpy).toHaveBeenCalled()
    })
    it('expect game.start to call game.loop with the view object',()=>{
        const loopSpy = jest.spyOn(game, 'loop')
        game.start()
        expect(loopSpy).toHaveBeenCalledWith(view, expect.anything())
    })
    it('expect game.start to call game.loop with the output of createBricks',()=>{
        const loopSpy = jest.spyOn(game, 'loop');
        (createBricks as jest.Mock).mockReturnValue([])
        game.start()
        expect(loopSpy).toHaveBeenCalledWith(view, [])
    })
    it('expect game.start to call game.loop with the output of createBricks',()=>{
        const loopSpy = jest.spyOn(game, 'loop');
        const brick = new Brick('stub',{x:0, y:0}, {height:0, width:0});
        const expected = [brick];
        (createBricks as jest.Mock).mockReturnValue(expected);
        game.start()
        expect(loopSpy).toHaveBeenCalledWith(view, expected)
    })
})

describe('Game.loop tests',()=>{
    let view: CanvasView
    let game: Game
    let clearSpy: jest.SpyInstance
    let drawBricksSpy: jest.SpyInstance
    beforeEach(()=>{
        view = new CanvasView('#playField');
        clearSpy = jest.spyOn(view, 'clear')
        drawBricksSpy = jest.spyOn(view, 'drawBricks')
        game = new Game(view);
    })
    afterEach(()=>{
        jest.resetAllMocks()
    })
    it('Game.loop calls view.clear()', ()=>{
        game.loop(view, [])
        expect(clearSpy).toHaveBeenCalled()
    })
    it('Game.loop calls view.drawBricks() with the bricks argument', ()=>{
        game.loop(view, [])
        expect(drawBricksSpy).toHaveBeenCalledWith([])
    })
    it('Game.loop calls view.drawBricks() with the bricks argument, different data', ()=>{
        const expected = [ new Brick('stub',{x:0, y:0},{width: 20, height:10},)];
        game.loop(view, expected);
        expect(drawBricksSpy).toHaveBeenCalledWith(expected);
    })
})
