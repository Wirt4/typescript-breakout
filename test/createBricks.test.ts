import {createBricks} from "../src/helper";
import {Brick} from "../src/sprites/Brick";
import {STAGE_COLS} from "../src/setup";

jest.mock("../src/setup", () => ({
    LEVEL: [],
    STAGE_PADDING:0,
    BRICK_WIDTH:0,
    BRICK_HEIGHT:0,
    BRICK_PADDING:0,
}))

describe('createBricks', () => {
    let mockedSetup: Record<string, any>;
    beforeEach(() => {
        mockedSetup = require("../src/setup");
    })
    it('Given that the setup const LEVEL returns an empty array, when createBricks is called, then it returns an empty array',()=>{
       mockedSetup.LEVEL = []
        mockedSetup.STAGE_COLS = 10
        expect(createBricks()).toEqual([])
    })
    it('Given that the setup const LEVEL returns an empty array, when createBricks is called, then it returns an array with length of one',()=>{
        mockedSetup.LEVEL = [1]
        mockedSetup.STAGE_COLS = 10
        const bricks = createBricks()
        expect(bricks.length).toEqual(1)
    })
    it('return type should be bricks',()=>{
        mockedSetup.LEVEL = [1, 2 ,3, 4, 0, 5]
        mockedSetup.STAGE_COLS = 10
        const bricks = createBricks()
        bricks.forEach(brick => {
            expect(brick).toBeInstanceOf(Brick)
        })
    })
    it('Given the array of bricks is one long, check the x coordinate ',()=>{
        mockedSetup.LEVEL = [1]
        mockedSetup.STAGE_PADDING = 4
        mockedSetup.STAGE_COLS = 10
        const bricks = createBricks()
        const brick = bricks[0]
        expect(brick.x).toBe(4)
    })
    it('Given the array of bricks is one long, check the x coordinate ',()=>{
        mockedSetup.LEVEL = [1]
        mockedSetup.STAGE_PADDING = 10
        mockedSetup.STAGE_COLS = 10
        mockedSetup.BRICK_WIDTH = 10
        mockedSetup.BRICK_PADDING = 10
        const bricks = createBricks()
        const brick = bricks[0]
        expect(brick.x).toBe(10)
    })
    it('Given the array of bricks is two or more long, check the x coordinate ',()=>{
        mockedSetup.LEVEL = [1,1]
        mockedSetup.STAGE_PADDING = 10
        mockedSetup.STAGE_COLS = 2
        mockedSetup.BRICK_WIDTH = 20
        mockedSetup.BRICK_PADDING = 5
        const bricks = createBricks()
        const brick = bricks[1]
        expect(brick.x).toBe(35)
    })
    it('Given the array of bricks one long, check the y coordinate',()=>{
        mockedSetup.LEVEL = [1]
        mockedSetup.STAGE_PADDING = 10
        mockedSetup.STAGE_COLS = 1
        const bricks = createBricks()
        const brick = bricks[0]
        expect(brick.y).toBe(10)
    })
    it('Given the array of bricks one long, check the y coordinate, different data',()=>{
        mockedSetup.LEVEL = [1]
        mockedSetup.STAGE_PADDING = 2
        const bricks = createBricks()
        const brick = bricks[0]
        expect(brick.y).toBe(2)
    })
    it('Given a brick on a lower level, check the y coordinate',()=>{
        mockedSetup.LEVEL = [1, 1]
        mockedSetup.STAGE_PADDING = 2
        mockedSetup.STAGE_COLS = 1
        mockedSetup.BRICK_HEIGHT = 20
        mockedSetup.BRICK_PADDING = 5
        const bricks = createBricks()
        const brick = bricks[1]
        expect(brick.y).toBe(27)
    })
    it('The x coordinate should carriage return as function maps around columns',()=>{
        mockedSetup.LEVEL = [1, 1, 1]
        mockedSetup.STAGE_PADDING = 2
        mockedSetup.STAGE_COLS = 2
        mockedSetup.BRICK_HEIGHT = 20
        mockedSetup.BRICK_PADDING = 5
        const bricks = createBricks()
        expect(bricks[2].x).toBe(bricks[0].x)
    })
})
