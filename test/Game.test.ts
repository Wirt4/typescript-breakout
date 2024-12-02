import {Game} from "../src/Game";
import {CanvasView} from "../src/view/CanvasView";

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
    beforeEach(()=>{
        view = new CanvasView('#playField')
        game = new Game(view)
    })
    afterEach(()=>{
        jest.resetAllMocks()
    })
    it('when Game.setGameWiner is called, isGameOver is set to false',()=>{
        expect(game.isGameOver).toEqual(false)
        game.setGameWin()
        expect(game.isGameOver).toEqual(false)
    })
})
