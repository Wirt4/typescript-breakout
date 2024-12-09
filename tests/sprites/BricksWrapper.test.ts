import {BricksWrapper} from "../../src/sprites/BricksWrapper";
import {Brick} from "../../src/sprites/Brick";
import {Ball} from "../../src/sprites/Ball";
import {Position, Vector} from "../../src/types";
import {Contact} from "../../src/enums";
import mock = jest.mock;

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
    let setUpBricks: Function
    beforeEach(() => {
        startPosition = {x:0, y:0};
        ballSize = 5
        ballSpeed = {xComponent: 1, yComponent: -1}
        brick1 = new Brick('stub',startPosition, 1)
        brick2 = new Brick('stub',startPosition, 1)
        brick3 = new Brick('stub',startPosition, 1)
        mockCollision = ()=>{
            wrapper = new BricksWrapper([brick1, brick2, brick3])
            ball = new Ball(startPosition, ballSize,  ballSpeed)
            wrapper.detectCollision(ball)
        }
        setUpBricks = ()=>{
            jest.spyOn(brick1, 'hasCollision').mockReturnValue(Contact.NO_CONTACT)
            jest.spyOn(brick2, 'hasCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
            jest.spyOn(brick3, 'hasCollision').mockReturnValue(Contact.NO_CONTACT)
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
        setUpBricks()
        mockCollision()
        expect(wrapper.collisionType()).toEqual(Contact.TOP_OR_BOTTOM);
    })
    it('if the wrapper detects a collision with a brick with an energy rating greater han 1, then that brick is not removed',()=>{
        brick2 = new Brick('stub',startPosition, 2)
        setUpBricks()
        mockCollision()
        expect(wrapper.arr.length).toEqual(3)
    })
})

describe('adjustBricks tests',()=>{
    let brick1: Brick
    let brick2: Brick
    let brick3: Brick
    let wrapper : BricksWrapper
    const ball = new Ball({x:0, y:0}, 4, {xComponent:1, yComponent:-1})
    function mockCollision(){
        wrapper = new BricksWrapper([brick1, brick2, brick3])
        wrapper.detectCollision(ball)
    }
    beforeEach(() => {
        brick1 = new Brick('stub', {x:0, y:0})
        brick2 = new Brick('stub', {x:0, y:0})
        brick3 = new Brick('stub', {x:0, y:0})
        jest.spyOn(brick1, 'hasCollision').mockReturnValue(Contact.NO_CONTACT)
        jest.spyOn(brick2, 'hasCollision').mockReturnValue(Contact.NO_CONTACT)
        jest.spyOn(brick3, 'hasCollision').mockReturnValue(Contact.NO_CONTACT)
    })
    it('if the wrapper has detected a collision with a brick with an energy rating of 1, then adjustBricks removes that brick',()=>{
        jest.spyOn(brick1, 'hasCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
        mockCollision()
        expect(wrapper.arr.length).toEqual(3)
        wrapper.adjustBricks()
        expect(wrapper.arr.length).toEqual(2)
    })
    it('if the wrapper detects a collision with a brick with an energy rating greater han 1, it calls "reduceEnergy on the brick"',()=>{
        brick2 = new Brick('stub',{x:0, y:0}, 2)
        jest.spyOn(brick2, 'hasCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
        const reduceEnergySpy = jest.spyOn(brick2, 'reduceEnergy')
        mockCollision()
        expect(reduceEnergySpy).not.toHaveBeenCalled()
        wrapper.adjustBricks()
        expect(reduceEnergySpy).toHaveBeenCalled()
    })
})

describe('collisionOverLap tests',()=>{
    it('If the array contains a brick that has a collision, then the return value of bricksWrapper collision distance is that value',()=>{
        const brick = new Brick('stub',{x:0, y:0})
        jest.spyOn(brick, 'hasCollision').mockReturnValue(Contact.TOP_OR_BOTTOM)
        const distance = 3
        jest.spyOn(brick, 'collisionOverlapDistance').mockReturnValue(distance)
        const wrapper = new BricksWrapper([brick])
        const ball = new Ball({x:0, y:0}, 3, {xComponent:1, yComponent:-1})
        wrapper.detectCollision(ball)
        expect(wrapper.collisionOverlap()).toEqual(distance)
    })
})

describe('isEmpty() tests',()=>{
    const brick = new Brick('stub',{x:0, y:0})
    let wrapper: BricksWrapper
    it('if the wrapper contains one brick, then isEmpty is false',()=>{
        wrapper = new BricksWrapper([brick])
        expect(wrapper.isEmpty()).toEqual(false)
    })
    it('if the wrapper contains one brick, then isEmpty is false',()=>{
        wrapper = new BricksWrapper([])
        expect(wrapper.isEmpty()).toEqual(true)
    })
})
