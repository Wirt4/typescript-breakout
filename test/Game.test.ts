import {Game} from "../src/Game";
import {CanvasView} from "../src/view/CanvasView";

describe('Game.setGameOver tests',()=>{
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
        const view = new CanvasView('#playField');
        const spy = jest.spyOn(view, 'drawInfo')
        const game = new Game(view)
        game.setGameOver()
        expect(spy).toHaveBeenCalledWith("Game Over!")
    })
})
