import {Brick} from "../../src/sprites/Brick";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../../src/setup";
import {Ball} from "../../src/sprites/Ball";
jest.mock("../../src/setup", () => ({
    BRICK_WIDTH:35,
    BRICK_HEIGHT:15,
}))
describe('basic sprite getters', () => {
    it('brick width is the const BRICK_WIDTH',()=>{
        const coords ={x:0,y:0};
        const brick = new Brick('stub',coords );
        expect(brick.width).toEqual(BRICK_WIDTH)
    })
    it('brick height is the const BRICK_HEIGHT',()=>{
        const coords ={x:0,y:0};
        const brick = new Brick('stub',coords );
        expect(brick.height).toBe(BRICK_HEIGHT);
    })
    it('brick energy is 1',()=>{
        const coords ={x:0,y:0};
        const brick = new Brick('stub',coords);
        expect(brick.energy).toBe(1);
    })
    it('brick energy is 3',()=>{
        const coords ={x:0,y:0};
        const brick = new Brick('stub',coords, 3);
        expect(brick.energy).toBe(3);
    })
    it('can reset brick energy to 2',()=>{
        const coords ={x:0,y:0};
        const brick = new Brick('stub',coords, 3);
        expect(brick.energy).toBe(3);
        brick.energy = 2
        expect(brick.energy).toBe(2);
    })
})

describe('isCollidingWith',()=>{
    it('detects collision, are occupying the same space',()=>{
        const brick = new Brick('stub',{x:0,y:0}, 3);
        const ball = new Ball({x:0, y:0}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
    })
    it('detects collision, are not occupying the same space',()=>{
        const brick = new Brick('stub',{x:0,y:0}, 3);
        const ball = new Ball({x:100, y:100}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(false);
    })
    it('ball hits brick from below, no need to shift',()=>{
        const brick = new Brick('stub',{x:0,y:0}, 3);
        const ball = new Ball({x:2, y:brick.height}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(ball.position.x).toEqual(2);
    })
    it('ball hits brick from below, needs to shift, do not shift x',()=>{
        //brick height is 15
        const brick = new Brick('stub',{x:0,y:0}, 3);
        const ball = new Ball({x:2, y:14}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(ball.position.x).toEqual(2);
        expect(ball.position.y).toEqual(16);
    })
    it('corner case',()=>{
        const brick = new Brick('stub',{x:0,y:0}, 3);
        const ball = new Ball({x:brick.rightMostX, y:brick.bottomMostY}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(ball.position.x).toEqual(brick.rightMostX + 1);
        expect(ball.position.y).toEqual(brick.bottomMostY + 1);
    })
})

describe('isCornerCollision',()=>{
    it('tangent at origin',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x:95, y:95}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('tangent at mid top',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x:110, y:95}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(brick.isCornerCollision()).toEqual(false)
    })
    it('exact overlap at origin',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x:98, y:98}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('tangent at top right',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: brick.position.x + BRICK_WIDTH, y:95}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('exact overlap at top right',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: brick.position.x + BRICK_WIDTH-2, y:97}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('tangent at bottom left',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: 95, y:brick.bottomMostY}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('overlap at bottom left',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: 97, y:brick.bottomMostY-2}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('tangent at bottom right',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: brick.position.x + BRICK_WIDTH, y:brick.bottomMostY}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(brick.isCornerCollision()).toEqual(true)
    })
    it('exact overlap at bottom right',()=>{
        const brick = new Brick('stub',{x:100,y:100}, 3);
        const ball = new Ball({x: brick.position.x + BRICK_WIDTH-1, y:brick.bottomMostY-1}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(brick.isCornerCollision()).toEqual(true)
    })
})

describe('isVerticalCollision tests',()=>{
    it('ball hits brick from below',()=>{
        const brick = new Brick('stub',{x:0,y:0}, 3);
        const ball = new Ball({x:2, y:brick.height}, 5, 400, 1);

        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(brick.isVerticalCollision()).toEqual(true);
    })
    it('ball hits brick from side',()=>{
        const brick = new Brick('stub',{x:5,y:0}, 3);
        const ball = new Ball({x:0, y:1}, 5, 400, 1);

        expect(brick.isCollidingWith(ball)).toEqual(true);
        expect(brick.isVerticalCollision()).toEqual(false);
    })
})
