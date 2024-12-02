import {Brick} from "../../src/sprites/Brick";
import {BRICK_HEIGHT, BRICK_WIDTH} from "../../src/setup";
jest.mock("../../src/setup", () => ({
    BRICK_WIDTH:35,
    BRICK_HEIGHT:15,
}))
describe('basic sprite getters', () => {
    it('brick width is the const BRICK_WIDTH',()=>{
        const coords ={x:0,y:0};
        const size = {width: 40, height: 10};
        const brick = new Brick('stub',coords, size);
        expect(brick.width).toEqual(BRICK_WIDTH)
    })
    it('brick height is the const BRICK_HEIGHT',()=>{
        const coords ={x:0,y:0};
        const size = {width: 40, height: 10};
        const brick = new Brick('stub',coords, size);
        expect(brick.height).toBe(BRICK_HEIGHT);
    })
    it('brick energy is 1',()=>{
        const coords ={x:0,y:0};
        const size = {width: 40, height: 10};
        const brick = new Brick('stub',coords,size);
        expect(brick.energy).toBe(1);
    })
    it('brick energy is 3',()=>{
        const coords ={x:0,y:0};
        const size = {width: 40, height: 10};
        const brick = new Brick('stub',coords,size, 3);
        expect(brick.energy).toBe(3);
    })
    it('can reset brick energy to 2',()=>{
        const coords ={x:0,y:0};
        const size = {width: 40, height: 10};
        const brick = new Brick('stub',coords,size, 3);
        expect(brick.energy).toBe(3);
        brick.energy = 2
        expect(brick.energy).toBe(2);
    })
})
