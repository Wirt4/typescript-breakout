import {Brick} from "../../src/sprites/Brick";

describe('basic sprite getters', () => {
    it('brick width is 40',()=>{
        const brick = new Brick('stub',0, 0, 40, 10);
        expect(brick.width).toBe(40);
    })
    it('brick energy is 1',()=>{
        const brick = new Brick('stub',0, 0, 40, 10);
        expect(brick.energy).toBe(1);
    })
    it('brick energy is 3',()=>{
        const brick = new Brick('stub',0, 0, 40, 10, 3);
        expect(brick.energy).toBe(3);
    })
    it('can reset brick energy to 2',()=>{
        const brick = new Brick('stub',0, 0, 40, 10, 3);
        expect(brick.energy).toBe(3);
        brick.energy = 2
        expect(brick.energy).toBe(2);
    })
})
