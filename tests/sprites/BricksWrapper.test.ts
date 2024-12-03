import {BricksWrapper} from "../../src/sprites/BricksWrapper";
import {Brick} from "../../src/sprites/Brick";
import {Ball} from "../../src/sprites/Ball";

describe('detectCollision tests', () => {
    let wrapper: BricksWrapper;
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('the array contains a valid collision, return true',()=>{
        const brick1 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick1, 'isCollidingWith').mockReturnValue(false)
        const brick2 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick2, 'isCollidingWith').mockReturnValue(true)
        const brick3 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick3, 'isCollidingWith').mockReturnValue(false)
        wrapper = new BricksWrapper([brick1, brick2, brick3])
        const ball = new Ball({x:0,y:0}, 5, 400, 1)
        expect(wrapper.detectCollision(ball)).toEqual(true);
    })
})

describe('isYCollision tests',()=>{
    let wrapper: BricksWrapper;
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('if the colliding brick has a true y collision, then the method returns true',()=>{
        const brick1 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick1, 'isCollidingWith').mockReturnValue(false)
        const brick2 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick2, 'isCollidingWith').mockReturnValue(false)
        const brick3 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick3, 'isCollidingWith').mockReturnValue(true)
        jest.spyOn(brick3, 'isVerticalCollision').mockReturnValue(true)
        wrapper = new BricksWrapper([brick1, brick2, brick3])
        const ball = new Ball({x:0,y:0}, 5, 400, 1)
        wrapper.detectCollision(ball)
        expect(wrapper.isVerticalCollision()).toEqual(true);
    })
})

describe('corner collision tests', () => {
    let wrapper: BricksWrapper;
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('if the colliding brick has a true corner collision, then the method returns true',()=>{
        const brick1 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick1, 'isCollidingWith').mockReturnValue(false)
        const brick2 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick2, 'isCollidingWith').mockReturnValue(false)
        const brick3 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick3, 'isCollidingWith').mockReturnValue(true)
        jest.spyOn(brick3, 'isCornerCollision').mockReturnValue(true)
        wrapper = new BricksWrapper([brick1, brick2, brick3])
        const ball = new Ball({x:0,y:0}, 5, 400, 1)
        wrapper.detectCollision(ball)
        expect(wrapper.isCornerCollision()).toEqual(true);
    })
    it('if the colliding brick has a false corner collision, then the method returns false',()=>{
        const brick1 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick1, 'isCollidingWith').mockReturnValue(false)
        const brick2 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick2, 'isCollidingWith').mockReturnValue(false)
        const brick3 = new Brick('stub',{x:0,y:0})
        jest.spyOn(brick3, 'isCollidingWith').mockReturnValue(true)
        jest.spyOn(brick3, 'isCornerCollision').mockReturnValue(false)
        wrapper = new BricksWrapper([brick1, brick2, brick3])
        const ball = new Ball({x:0,y:0}, 5, 400, 1)
        wrapper.detectCollision(ball)
        expect(wrapper.isCornerCollision()).toEqual(false);
    })
})
