import {Sprite} from "../../src/sprites/Sprite";
import {Paddle} from "../../src/sprites/Paddle";

describe('Paddle', () => {
    it('paddle is a sprite',()=>{
        const paddle = new Paddle('stub',{x:0, y:0}, {width:0, height:0});
        expect(paddle).toBeInstanceOf(Sprite);
    })
})

describe('Paddle.isMovingLeft and isMovingRight', () => {
    let paddle: Paddle
    beforeEach(()=>{
        paddle = new Paddle('stub',{x:0, y:0}, {width:0, height:0});
    })
    it('when created, moveLeft is false',()=>{
        expect(paddle.isMovingLeft).toEqual(false)
    })
    it('when created, moveRight is false',()=>{
        expect(paddle.isMovingRight).toEqual(false)
    })
})
