import {Sprite} from "../../src/sprites/Sprite";
import {Ball} from "../../src/sprites/Ball";
import {Size} from "../../src/types";

describe('Ball constructor', () => {
    it('Ball should be an instance of Sprite',()=>{
        const canvasSize = {width: 1200, height:800};
        const pos = {x:0, y:0};
        const diameter = 5
        const speed = 6
        const ball = new Ball(pos, canvasSize, diameter, speed)
        expect(ball).toBeInstanceOf(Sprite)
    })
})

describe('move tests',()=>{
    const canvasSize = {width: 1200, height:800};
    it('starting angle of the ball should be 45 degrees',()=>{
        const pos = {x:10, y:10}
        const diameter = 5
        const speed = 5
        const ball = new Ball(pos, canvasSize, diameter, speed)
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
        const ball = new Ball(pos, canvasSize, diameter, speed)
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
        const ball = new Ball(pos, canvasSize, diameter, speed)
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
        const ball = new Ball(pos, canvasSize, diameter, speed)
        expect(ball.x).toEqual(25)
        expect(ball.y).toEqual(30)
        ball.bounceX()
        ball.move()
        expect(ball.x).toEqual(18)
        expect(ball.y).toEqual(23)
    })
})

describe('Detect Collision tests', () => {
    let canvasSize: Size
        beforeEach(()=>{
            canvasSize= {width: 1200, height:800};
        })
    it('if ball hits the ceiling, then it bounces -- tangent',()=>{
        const pos = {x:25, y:0}
        const diameter = 5
        const speed = 7
        const ball = new Ball(pos, canvasSize, diameter, speed)
        ball.detectCollision()
        ball.move()
        expect(ball.y).toEqual(7)
    })
    it("if ball doesn't hit the ceiling, then it doesn't bounce ",()=>{
        const pos = {x:25, y:30}
        const diameter = 5
        const speed = 7
        const ball = new Ball(pos, canvasSize, diameter, speed)
        ball.detectCollision()
        ball.move()
        expect(ball.y).toEqual(23)
    })
    it('if ball hits the ceiling, then it bounces -- overlap',()=>{
        const pos = {x:25, y:-4}
        const diameter = 12
        const speed = 10
        const ball = new Ball(pos, canvasSize, diameter, speed)
        ball.detectCollision()
        ball.move()
        expect(ball.y).toEqual(6)
    })
    it('if ball hits left wall, then it bounces',()=>{
        const pos = {x:-1, y:50}
        const diameter = 12
        const speed = 10
        const ball = new Ball(pos, canvasSize, diameter, speed)
        ball.bounceX()
        ball.detectCollision()
        ball.move()
        expect(ball.x).toEqual(9)
    })
    it('if ball hits right wall, then it bounces',()=>{
        canvasSize= {width: 800, height:800};
        const pos = {x:790, y:50}
        const diameter = 12
        const speed = 10
        const ball = new Ball(pos, canvasSize, diameter, speed)
        ball.detectCollision()
        ball.move()
        expect(ball.x).toEqual(780)
    })
})
