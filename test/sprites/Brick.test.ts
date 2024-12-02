import {Brick} from "../../src/sprites/Brick";

describe('basic sprite getters', () => {
    it('brick width is 40',()=>{
        const brick = new Brick('stub',0,0, 40, 10);
        expect(brick.width).toBe(40);
    })
})
