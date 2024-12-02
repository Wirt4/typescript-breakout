import {Game} from "../src/Game";

describe('Game.setGameOver tests',()=>{
    it('when game is created, Game.isGameOver is false',()=>{
        const game = new Game()
        expect(game.isGameOver).toEqual(false)
    })
})
