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
        jest.spyOn(brick3, 'isCollidingWith').mockReturnValue(true)
        wrapper = new BricksWrapper([brick1, brick2, brick3])
        const ball = new Ball({x:0,y:0}, 5, 400, 1)
        expect(wrapper.detectCollision(ball)).toEqual(true);
    })
})
