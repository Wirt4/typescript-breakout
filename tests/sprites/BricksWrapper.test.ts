import {BricksWrapper} from "../../src/sprites/BricksWrapper";
import {Brick} from "../../src/sprites/Brick";
import {Ball} from "../../src/sprites/Ball";
import {Position} from "../../src/types";

describe('detectCollision tests', () => {
    let wrapper: BricksWrapper;
    let startPosition: Position;
    let brick1: Brick
    let brick2:Brick
    let brick3:Brick
    let ballSize: number
    let canvasSize: number
    let ballSpeed: number
    let ball: Ball
    beforeEach(() => {
        startPosition = {x:0, y:0};
        ballSize = 5
        canvasSize = 400
        ballSpeed = 1
        brick1 = new Brick('stub',startPosition)
        brick2 = new Brick('stub',startPosition)
        brick3 = new Brick('stub',startPosition)
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('the array contains a valid collision, return true',()=>{
        jest.spyOn(brick1, 'hasCollision').mockReturnValue(false)
        jest.spyOn(brick2, 'hasCollision').mockReturnValue(true)
        jest.spyOn(brick3, 'hasCollision').mockReturnValue(false)
        wrapper = new BricksWrapper([brick1, brick2, brick3])
        ball = new Ball(startPosition, ballSize, canvasSize, ballSpeed)
        expect(wrapper.detectCollision(ball)).toEqual(true);
    })
    it('if the colliding brick has a true y collision, then the method returns true',()=>{
        jest.spyOn(brick1, 'hasCollision').mockReturnValue(false)
        jest.spyOn(brick2, 'hasCollision').mockReturnValue(false)
        jest.spyOn(brick3, 'hasCollision').mockReturnValue(true)
        jest.spyOn(brick3, 'isVerticalCollision').mockReturnValue(true)
        wrapper = new BricksWrapper([brick1, brick2, brick3])
        ball = new Ball(startPosition, ballSize, canvasSize, ballSpeed)
        wrapper.detectCollision(ball)
        expect(wrapper.isVerticalCollision()).toEqual(true);
    })
    it('if the colliding brick has a true corner collision, then the method returns true',()=>{
        jest.spyOn(brick1, 'hasCollision').mockReturnValue(false)
        jest.spyOn(brick2, 'hasCollision').mockReturnValue(false)
        jest.spyOn(brick3, 'hasCollision').mockReturnValue(true)
        jest.spyOn(brick3, 'isCornerCollision').mockReturnValue(true)
        ball = new Ball(startPosition, ballSize, canvasSize, ballSpeed)
        wrapper.detectCollision(ball)
        expect(wrapper.isCornerCollision()).toEqual(true);
    })
    it('if the colliding brick has a false corner collision, then the method returns false',()=>{
        jest.spyOn(brick1, 'hasCollision').mockReturnValue(false)
        jest.spyOn(brick2, 'hasCollision').mockReturnValue(false)
        jest.spyOn(brick3, 'hasCollision').mockReturnValue(true)
        jest.spyOn(brick3, 'isCornerCollision').mockReturnValue(false)
        wrapper = new BricksWrapper([brick1, brick2, brick3])
        ball = new Ball(startPosition, ballSize, canvasSize, ballSpeed)
        wrapper.detectCollision(ball)
        expect(wrapper.isCornerCollision()).toEqual(false);
    })
})
