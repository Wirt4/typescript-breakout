import {Brick} from "../../src/sprites/Brick";

describe('basic sprite getters', () => {
    it('brick width is 40',()=>{
        const coords ={x:0,y:0};
        const size = {width: 40, height: 10};
        const brick = new Brick('stub',coords, size);
        expect(brick.width).toBe(40);
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
