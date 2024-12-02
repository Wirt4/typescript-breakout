import {Sprite} from "../../src/sprites/Sprite";
import {Paddle} from "../../src/sprites/Paddle";

describe('Paddle', () => {
    it('paddle is a sprite',()=>{
        const paddle = new Paddle('stub',{x:0, y:0}, {width:0, height:0});
        expect(paddle).toBeInstanceOf(Sprite);
    })
})

describe('Paddle.moveLeft and moveRight', () => {
    it('when created, moveLeft is false',()=>{
        const paddle = new Paddle('stub',{x:0, y:0}, {width:0, height:0});
        expect(paddle.moveLeft).toEqual(false)
    })
})
