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
    const ballSped = {xComponent: 1, yComponent: -1}
    beforeEach(() => {
        originPosition = {x:0, y:0}
        diameter = 5
    })
    it('detects collision from side, coming from left',()=>{
         brick = new Brick('stub', {x: diameter, y:0}, 3);
         ball = new Ball(originPosition, diameter,  ballSped);
         brick.detectCollision(ball)
         expect(brick.hasCollision()).toEqual(Contact.SIDE);
    })
    it('detects collision, coming from top, are occupying the same space',()=>{
        brick = new Brick('stub', {x:0, y:diameter}, 3);
        ball = new Ball(originPosition, 5, ballSped);
        brick.detectCollision(ball)
        expect(brick.hasCollision()).toEqual(Contact.TOP_OR_BOTTOM);
    })
    it('detects collision ,no contact',()=>{
         brick = new Brick('stub',originPosition, 3);
         ball = new Ball({x:100, y:100}, 5, ballSped);
         brick.detectCollision(ball)
         expect(brick.hasCollision()).toEqual(Contact.NO_CONTACT);
    })
    it('detects collision, coming from top, followed by checking a fresh value',()=>{
        brick = new Brick('stub', {x:0, y:diameter}, 3);
        ball = new Ball(originPosition, 5, ballSped);
        brick.detectCollision(ball)
        expect(brick.hasCollision()).toEqual(Contact.TOP_OR_BOTTOM);
        ball = new Ball({x:100, y:100}, 5,  ballSped);
        brick.detectCollision(ball)
        expect(brick.hasCollision()).toEqual(Contact.NO_CONTACT);
    })
})

describe('brick.collisionOverlap tests',()=>{
    const  brick= new Brick('stub', {x:100, y:100}, 3);
    let  diameter: number
    let ball : Ball
    function constructBall(position:Position,){
        ball =  new Ball(position, diameter, {xComponent: 1, yComponent: -1});
    }
    beforeEach(() => {
        diameter = 5
    })
    it('if a brick and ball do not overlap, then the overlap distance is 0',()=>{
        constructBall({x:0, y:0})
        brick.detectCollision(ball)
        expect(brick.collisionOverlapDistance()).toEqual(0);
    })
    it('if a brick and ball occupy the same space, then the overlap distance is the diameter',()=>{
        constructBall({x:100, y:100})
        brick.detectCollision(ball)
        expect(brick.collisionOverlapDistance()).toEqual(diameter);
    })
    it('if a brick and ball occupy a partial distance, then the overlap distance is amount of that overlap',()=>{
        diameter = 6
        constructBall({x:101, y:97})
        brick.detectCollision(ball)
        expect(brick.collisionOverlapDistance()).toEqual(3);
    })
    it('if a brick and ball occupy a partial distance, then the overlap distance is amount of that overlap',()=>{
        const overlap = 2
        constructBall({x:brick.rightMostX - overlap, y: brick.bottomMostY - overlap})
        brick.detectCollision(ball)
        expect(brick.collisionOverlapDistance()).toEqual(overlap);
    })
    it('if a brick and ball occupy a partial distance, then the overlap distance is amount of that overlap',()=>{
        const overlap = 2
        constructBall({x:brick.rightMostX - overlap, y: brick.position.y})
        brick.detectCollision(ball)
        expect(brick.collisionOverlapDistance()).toEqual(overlap);
    })
})
