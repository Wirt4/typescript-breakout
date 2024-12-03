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

    it('detects collision, are occupying the same space',()=>{
        const brick = new Brick('stub',{x:0,y:0}, 3);
        const ball = new Ball({x:100, y:100}, 5, 400, 1);
        expect(brick.isCollidingWith(ball)).toEqual(false);
    })
})
