import {Sprite} from "../../src/sprites/Sprite";

describe('isInXRange test', () => {
    it('right edge of sprite A touches left edge of sprite B', () => {
        const spriteA = new Sprite('stub',{x:0,y:0},{width: 5, height:5});
        const spriteB = new Sprite('stub',{x:5,y:0}, {width: 5, height:5});
        expect(spriteA.isInXRange(spriteB)).toBe(true);
    })
})
