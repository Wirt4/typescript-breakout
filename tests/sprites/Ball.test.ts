import {Sprite} from "../../src/sprites/Sprite";
import {Ball} from "../../src/sprites/Ball";
import {Position, Vector} from "../../src/types";

describe('Ball constructor', () => {
    let startPosition: Position;
    let diameter: number;
    let speed: Vector;
    let ball: Ball

    beforeEach(() => {
        startPosition = {x:0, y:0};
        diameter = 5
        speed ={xComponent:6, yComponent:-6}
        ball = new Ball(startPosition, diameter, speed)
    })
    it('Ball should be an instance of a Sprite',()=>{
        expect(ball).toBeInstanceOf(Sprite)
    })
})

describe('move tests',()=>{
    let startPosition: Position;
    let diameter: number;
    let speed: Vector
    let ball: Ball
    beforeEach(() => {
        startPosition = {x:10, y:10};
        diameter = 5
        speed = {xComponent: 5, yComponent:-5}
        ball = new Ball(startPosition, diameter,  speed)
    })
    it('ball instantiates with the correct position',()=>{
        expect(ball.position).toEqual(startPosition)
    })
    it('starting angle of the ball is 45 degrees',()=>{
        ball.move()
        expect(ball.position).toEqual({x:15, y:5})
    })
    it('starting angle of the ball is 45 degrees: different starting data',()=>{
        startPosition = {x:25, y:30}
        speed = {xComponent: 7, yComponent:-7}
        ball = new Ball(startPosition, diameter,  speed)
        const expectedPosition = {x:32, y:23}
        ball.move()
        expect(ball.position).toEqual(expectedPosition)
    })
    it('call to bounceY reverses the vertical direction',()=>{
        startPosition = {x:25, y:30}
        speed = {xComponent: 7, yComponent:-7}
        ball = new Ball(startPosition, diameter,  speed)
        const expectedPosition = {x:32, y:37}
        ball.bounceY()
        ball.move()
        expect(ball.position).toEqual(expectedPosition)
    })
    it('call to bounceX reversed the horizontal direction',()=>{
        startPosition = {x:25, y:30}
        speed = {xComponent: 7, yComponent:-7}
        ball = new Ball(startPosition, diameter, speed)
        const expectedPosition = {x:18, y:23}
        ball.bounceX()
        ball.move()
        expect(ball.position).toEqual(expectedPosition)
    })
})

describe('rewind tests',()=>{
    const ball = new Ball({x:100, y:100}, 5,  {xComponent:10, yComponent:-10})
    ball.rewind(5)
    expect(ball.position).toEqual({x:95, y:105})
})
