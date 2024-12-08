import {Brick} from "../../src/sprites/Brick";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../../src/setup";
import {Ball} from "../../src/sprites/Ball";
import {Position} from "../../src/types";
import {Contact} from "../../src/enums";

jest.mock("../../src/setup", () => ({
    BRICK_WIDTH:35,
    BRICK_HEIGHT:15,
}))

describe('basic sprite getters', () => {
    let position: Position
    let brick: Brick
    beforeEach(() => {
        brick = new Brick('stub', position);
    })
    it('brick width is the const BRICK_WIDTH',()=>{
        expect(brick.width).toEqual(BRICK_WIDTH)
    })
    it('brick height is the const BRICK_HEIGHT',()=>{
        expect(brick.height).toBe(BRICK_HEIGHT);
    })
    it('brick energy defaults to 1',()=>{
        expect(brick.energy).toBe(1);
    })
    it('brick energy is 3',()=>{
         position ={x:0,y:0};
         brick = new Brick('stub',position, 3);
         expect(brick.energy).toBe(3);
    })
    it('can reset brick energy to 2',()=>{
         brick = new Brick('stub',position, 3);
         expect(brick.energy).toBe(3);
         brick.energy = 2
        expect(brick.energy).toBe(2);
    })
})

describe('brick.isCollidingWith',()=>{
    let brick: Brick
    let ball: Ball
    let originPosition: Position
    let diameter: number
    const canvasSize = 400
    const ballSped = {x: 1, y: -1}
    beforeEach(() => {
        originPosition = {x:0, y:0}
        diameter = 5
    })
    it('detects collision from side, coming from left',()=>{
         brick = new Brick('stub', {x: diameter, y:0}, 3);
         ball = new Ball(originPosition, diameter, canvasSize, ballSped);
         brick.detectCollision(ball)
         expect(brick.hasCollision()).toEqual(Contact.SIDE);
    })
    it('detects collision, coming from top, are occupying the same space',()=>{
        brick = new Brick('stub', {x:0, y:diameter}, 3);
        ball = new Ball(originPosition, 5, canvasSize, ballSped);
        brick.detectCollision(ball)
        expect(brick.hasCollision()).toEqual(Contact.TOP_OR_BOTTOM);
    })
    it('detects collision ,no contact',()=>{
         brick = new Brick('stub',originPosition, 3);
         ball = new Ball({x:100, y:100}, 5, canvasSize, ballSped);
         brick.detectCollision(ball)
         expect(brick.hasCollision()).toEqual(Contact.NO_CONTACT);
    })
    it('detects collision, coming from top, followed by checking a fresh value',()=>{
        brick = new Brick('stub', {x:0, y:diameter}, 3);
        ball = new Ball(originPosition, 5, canvasSize, ballSped);
        brick.detectCollision(ball)
        expect(brick.hasCollision()).toEqual(Contact.TOP_OR_BOTTOM);
        ball = new Ball({x:100, y:100}, 5, canvasSize, ballSped);
        brick.detectCollision(ball)
        expect(brick.hasCollision()).toEqual(Contact.NO_CONTACT);
    })
})

describe('brick.collisionOverlap tests',()=>{
    it('if a brick and ball do not overlap, then the overlap distance is 0',()=>{
        const brick = new Brick('stub', {x:100, y:100}, 3);
        const ball = new Ball({x:0, y:0}, 5, 3000, {x: 1, y: -1});
        brick.detectCollision(ball)
        expect(brick.collisionOverlapDistance()).toEqual(0);
    })
})
