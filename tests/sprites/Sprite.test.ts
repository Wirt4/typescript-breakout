import {Sprite} from "../../src/sprites/Sprite";

describe('isInXRange test', () => {
    it('right edge of sprite A touches left edge of sprite B', () => {
        const imageName = 'stub'
        const spriteSize = {width: 5, height:5}
        const firstSprite = new Sprite(imageName,{x:0,y:0},spriteSize);
        const adjacentSprite = new Sprite(imageName,{x:5,y:0},spriteSize);
        expect(firstSprite.isInXRange(adjacentSprite)).toBe(true);
    })
})
