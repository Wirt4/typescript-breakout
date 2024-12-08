import {BricksWrapper} from "../../src/sprites/BricksWrapper";
import {Brick} from "../../src/sprites/Brick";
import {Ball} from "../../src/sprites/Ball";
import {Position, Vector} from "../../src/types";
import {Contact} from "../../src/enums";

describe('detectCollision tests', () => {
    let wrapper: BricksWrapper;
    let startPosition: Position;
    let brick1: Brick
    let brick2:Brick
    let brick3:Brick
    let ballSize: number
    let ballSpeed: Vector
    let ball: Ball
    let mockCollision: Function
    beforeEach(() => {
        startPosition = {x:0, y:0};
        ballSize = 5
        ballSpeed = {xComponent: 1, yComponent: -1}
        brick1 = new Brick('stub',startPosition)
        brick2 = new Brick('stub',startPosition)
        brick3 = new Brick('stub',startPosition)
        mockCollision = ()=>{
            wrapper = new BricksWrapper([brick1, brick2, brick3])
            ball = new Ball(startPosition, ballSize,  ballSpeed)
            wrapper.detectCollision(ball)
        }
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('the array contains a SIDE, return SIDE',()=>{
        jest.spyOn(brick1, 'hasCollision').mockReturnValue(Contact.SIDE)
        jest.spyOn(brick2, 'hasCollision').mockReturnValue(Contact.NO_CONTACT)
        jest.spyOn(brick3, 'hasCollision').mockReturnValue(Contact.NO_CONTACT)
        mockCollision()
        expect(wrapper.collisionType()).toEqual(Contact.SIDE);
    })
    it('the array contains a TOP_OR_BOTTOM collision, return TOP_OR_BOTTOM',()=>{
        jest.spyOn(brick1, 'hasCollision').mockReturnValue(Contact.NO_CONTACT)
        jest.spyOn(brick2, 'hasCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
        jest.spyOn(brick3, 'hasCollision').mockReturnValue(Contact.NO_CONTACT)
        mockCollision()
        expect(wrapper.collisionType()).toEqual(Contact.TOP_OR_BOTTOM);
    })

})

describe('collisionOverLap tests',()=>{
    it('If the array contains a brick that has a collision, then the return vaule of bricksWrapper collision distance is that value',()=>{
        const brick = new Brick('stub',{x:0, y:0})
        jest.spyOn(brick, 'hasCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
        const distance = 3
        jest.spyOn(brick, 'collisionOverlapDistance').mockReturnValue(distance)
        const wrapper = new BricksWrapper([brick])
        const ball = new Ball({x:0, y:0}, 3,  {xComponent:1, yComponent:-1})
        wrapper.detectCollision(ball)
        expect(wrapper.collisionOverlap()).toEqual(distance)
    })
})
