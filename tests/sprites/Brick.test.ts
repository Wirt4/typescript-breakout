import {Brick} from "../../src/sprites/Brick";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../../src/setup";
import {Ball} from "../../src/sprites/Ball";
import {Position} from "../../src/types";

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
    const ballSped = {x: 1, y: -1}
    beforeEach(() => {
        originPosition = {x:0, y:0}
    })
    it('detects collision, are occupying the same space',()=>{
         brick = new Brick('stub',originPosition, 3);
         ball = new Ball(originPosition, 5, 400, ballSped);
         brick.detectCollision(ball)
         expect(brick.hasCollision()).toEqual(true);
    })
    it('detects collision, are not occupying the same space',()=>{
         brick = new Brick('stub',originPosition, 3);
         ball = new Ball({x:100, y:100}, 5, 400, ballSped);
         brick.detectCollision(ball)
         expect(brick.hasCollision()).toEqual(false);
    })
})

describe('isCornerCollision',()=>{
    const speed = {x: 1, y: -1}
    it('tangent at origin',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x:95, y:95}, 5, 400, speed);
        brick.detectCollision(ball)
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('tangent at mid top',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x:110, y:95}, 5, 400, speed);
        brick.detectCollision(ball)
        expect(brick.isCornerCollision()).toEqual(false)
    })
    it('exact overlap at origin',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x:98, y:98}, 5, 400, speed);
        brick.detectCollision(ball)
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('tangent at top right',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: brick.position.x + BRICK_WIDTH, y:95}, 5, 400, speed);
        brick.detectCollision(ball)
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('exact overlap at top right',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: brick.position.x + BRICK_WIDTH-2, y:97}, 5, 400, speed);
        brick.detectCollision(ball)
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('tangent at bottom left',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: 95, y:brick.bottomMostY}, 5, 400, speed);
        brick.detectCollision(ball)
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('overlap at bottom left',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: 97, y:brick.bottomMostY-2}, 5, 400, speed);
        brick.detectCollision(ball)
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('tangent at bottom right',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: brick.position.x + BRICK_WIDTH, y:brick.bottomMostY}, 5, 400, speed);
        brick.detectCollision(ball)
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('exact overlap at bottom right',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: brick.position.x + BRICK_WIDTH-1, y:brick.bottomMostY-1}, 5, 400, speed);
        brick.detectCollision(ball)
        expect(brick.isCornerCollision()).toEqual(true)
    })
})

describe('isVerticalCollision tests',()=>{
    const speed = {x:1, y:-1}
    const canvasWidth = 400
    it('ball hits brick from below',()=>{
        const brick = new Brick('stub',{x:0,y:0}, 3);
        const ball = new Ball({x:2, y:brick.height}, 5, canvasWidth, speed);
        brick.detectCollision(ball)
        expect(brick.isVerticalCollision()).toEqual(true);
    })
    it('ball hits brick from side',()=>{
        const brick = new Brick('stub',{x:5,y:0}, 3);
        const ball = new Ball({x:0, y:1}, 5, canvasWidth, {x:1, y:-1});
        brick.detectCollision(ball)
        expect(brick.isVerticalCollision()).toEqual(false);
    })
})
