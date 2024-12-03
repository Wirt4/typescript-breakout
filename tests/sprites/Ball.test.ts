import {Sprite} from "../../src/sprites/Sprite";
import {Ball} from "../../src/sprites/Ball";

describe('Ball constructor', () => {
    it('Ball should be an instance of Sprite',()=>{
        const pos = {x:0, y:0};
        const diameter = 5
        const speed = 6
        const ball = new Ball(pos, diameter, speed)
        expect(ball).toBeInstanceOf(Sprite)
    })
})

describe('move tests',()=>{
    it('starting angle of the ball should be 45 degrees',()=>{
        const pos = {x:10, y:10}
        const diameter = 5
        const speed = 5
        const ball = new Ball(pos, diameter, speed)
        expect(ball.x).toEqual(10)
        expect(ball.y).toEqual(10)
        ball.move()
        expect(ball.x).toEqual(15)
        expect(ball.y).toEqual(5)
    })
    it('starting angle of the ball should be 45 degrees, different data',()=>{
        const pos = {x:25, y:30}
        const diameter = 5
        const speed = 7
        const ball = new Ball(pos, diameter, speed)
        expect(ball.x).toEqual(25)
        expect(ball.y).toEqual(30)
        ball.move()
        expect(ball.x).toEqual(32)
        expect(ball.y).toEqual(23)
    })
    it('call to bounceY',()=>{
        const pos = {x:25, y:30}
        const diameter = 5
        const speed = 7
        const ball = new Ball(pos, diameter, speed)
        expect(ball.x).toEqual(25)
        expect(ball.y).toEqual(30)
        ball.bounceY()
        ball.move()
        expect(ball.x).toEqual(32)
        expect(ball.y).toEqual(37)
    })
    it('call to bounceX',()=>{
        const pos = {x:25, y:30}
        const diameter = 5
        const speed = 7
        const ball = new Ball(pos, diameter, speed)
        expect(ball.x).toEqual(25)
        expect(ball.y).toEqual(30)
        ball.bounceX()
        ball.move()
        expect(ball.x).toEqual(18)
        expect(ball.y).toEqual(23)
    })
})
