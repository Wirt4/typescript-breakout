import {Sprite} from "../../src/sprites/Sprite";
import {Ball} from "../../src/sprites/Ball";
import {Position, Size} from "../../src/types";
import {CanvasContact} from "../../src/enums";

describe('Ball constructor', () => {
    let startPosition: Position;
    let diameter: number;
    let canvasWidth:number
    let speed: number
    let ball: Ball

    beforeEach(() => {
        startPosition = {x:0, y:0};
        diameter = 5
        canvasWidth =1200
        speed =6
        ball = new Ball(startPosition, diameter, canvasWidth, speed)
    })
    it('Ball should be an instance of a Sprite',()=>{
        expect(ball).toBeInstanceOf(Sprite)
    })
})

describe('move tests',()=>{
    let startPosition: Position;
    let diameter: number;
    let canvasWidth:number
    let speed: number
    let ball: Ball
    beforeEach(() => {
        startPosition = {x:10, y:10};
        diameter = 5
        canvasWidth =1200
        speed = 5
        ball = new Ball(startPosition, diameter, canvasWidth, speed)
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
        speed = 7
        ball = new Ball(startPosition, diameter, canvasWidth, speed)
        const expectedPosition = {x:32, y:23}
        ball.move()
        expect(ball.position).toEqual(expectedPosition)
    })
    it('call to bounceY reverses the vertical direction',()=>{
        startPosition = {x:25, y:30}
        speed = 7
        ball = new Ball(startPosition, diameter, canvasWidth, speed)
        const expectedPosition = {x:32, y:37}
        ball.bounceY()
        ball.move()
        expect(ball.position).toEqual(expectedPosition)
    })
    it('call to bounceX reversed the horizontal direction',()=>{
        startPosition = {x:25, y:30}
        speed = 7
        ball = new Ball(startPosition, diameter, canvasWidth, speed)
        const expectedPosition = {x:18, y:23}
        ball.bounceX()
        ball.move()
        expect(ball.position).toEqual(expectedPosition)
    })
})

describe('detectCanvasCollision tests', () => {
    let canvasWidth: number
    let startPosition: Position
    let diameter: number
    let speed: number
    let ball: Ball
        beforeEach(()=>{
            canvasWidth =  1200
            diameter = 5
            speed = 7
        })
    it('If ball forms a tangent when it hits the ceiling, then it is a collision',()=>{
        startPosition = {x:25, y:0}
        ball = new Ball(startPosition, diameter,canvasWidth,  speed)
        expect(ball.hasCanvasCollision()).toEqual(CanvasContact.CEILING)
    })
    it("if ball doesn't touch or interset the ceiling or walls, then is't not a collision ",()=>{
        startPosition = {x:25, y:30}
        ball = new Ball(startPosition, diameter, canvasWidth,  speed)
        expect(ball.hasCanvasCollision()).toEqual(CanvasContact.NO_CONTACT)
    })
    it('if ball overlaps the ceiling, then it is a collision',()=>{
        startPosition = {x:25, y:-4}
        diameter = 12
        ball = new Ball(startPosition, diameter, canvasWidth, speed)
        expect(ball.hasCanvasCollision()).toEqual(CanvasContact.CEILING)
    })
    it('if ball overlaps left wall, then it is a collision',()=>{
        startPosition = {x:-1, y:50}
        diameter = 12
        ball = new Ball(startPosition, diameter, canvasWidth, speed)
        ball.bounceX()
        expect(ball.hasCanvasCollision()).toEqual(CanvasContact.WALL)
    })
    it('if ball overlaps right wall, then its a collision',()=>{
        canvasWidth = 800
        startPosition = {x:790, y:50}
        diameter = 12
        ball = new Ball(startPosition, diameter, canvasWidth, speed)
        expect(ball.hasCanvasCollision()).toEqual(CanvasContact.WALL)
    })
})
