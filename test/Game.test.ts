import {Game} from "../src/Game";
import {CanvasView} from "../src/view/CanvasView";

describe('Game.setGameOver tests',()=>{
    let view: CanvasView
    let spy: jest.SpyInstance
    beforeEach(()=>{
        view = new CanvasView('#playField')
        spy = jest.spyOn(view, 'drawInfo').mockImplementation(()=>{})
    })
    it('when game is created, Game.isGameOver is false',()=>{
        const game = new Game()
        expect(game.isGameOver).toEqual(false)
    })
    it('when Game.setGameOver is called, isGameOver is set to true',()=>{
        const game = new Game()
        expect(game.isGameOver).toEqual(false)
        game.setGameOver()
        expect(game.isGameOver).toEqual(true)
    })
    it('when Game.setGameOver is called, CanvasView.setInfo is called with message "Game Over"',()=>{
        const game = new Game(view)
        game.setGameOver()
        expect(spy).toHaveBeenCalledWith("Game Over!")
    })
    it('when Game.setGameOver is not called, CanvasView.setInfo is not called with message "Game Over"',()=>{
        new Game(view)
        expect(spy).not.toHaveBeenCalledWith("Game Over!")
    })
})
