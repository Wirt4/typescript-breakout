import {BricksWrapperClient} from "../src/helper";
import {Brick} from "../src/sprites/Brick";
import RED_BRICK from "../src/images/brick-red.png"
import GREEN_BRICK from "../src/images/brick-green.png"
import YELLOW_BRICK from "../src/images/brick-yellow.png"
import BLUE_BRICK from "../src/images/brick-blue.png"
import PURPLE_BRICK from "../src/images/brick-purple.png"

jest.mock("../src/setup", () => ({
    LEVEL: [],
    STAGE_PADDING:0,
    BRICK_WIDTH:0,
    BRICK_HEIGHT:0,
    BRICK_PADDING:0,
    BRICK_IMAGES: {
    1: 'stub',
    2: 'stub',
    3: 'stub',
    4: 'stub',
    5: 'stub'
    }
}))
jest.mock("../src/images/brick-red.png")
jest.mock("../src/images/brick-green.png")
jest.mock("../src/images/brick-yellow.png")
jest.mock("../src/images/brick-blue.png")
jest.mock("../src/images/brick-purple.png")

describe('createBricks', () => {
    let mockedSetup: Record<string, any>;
    let client: BricksWrapperClient
    beforeEach(() => {
        mockedSetup = require("../src/setup");
        client = new BricksWrapperClient();
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('Given that the numberOfBricks argument is 0, when createBricks is called, then it returns an empty array',()=>{
        mockedSetup.STAGE_COLS = 10
        expect(client.createBricks(0)).toEqual([])
    })
    it('Given that the numberOfBricks argument is 1, when createBricks is called, then it returns an array with length of one',()=>{
        mockedSetup.STAGE_COLS = 1
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([0, 1])
        const bricks = client.createBricks(1)
        expect(bricks.length).toEqual(1)
    })
    it('return type should be bricks',()=>{
        mockedSetup.STAGE_COLS = 10
        const bricks = client.createBricks(5)
        bricks.forEach(brick => {
            expect(brick).toBeInstanceOf(Brick)
        })
    })
    it('Given the array of bricks is one long, check the x coordinate ',()=>{
        mockedSetup.STAGE_PADDING = 4 //TODO -- make these dumb constants arguments
        mockedSetup.STAGE_COLS = 10
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1])
        const bricks = client.createBricks(1)
        const brick = bricks[0]
        expect(brick.x).toBe(4)
    })
    it('Given the array of bricks is one long, check the x coordinate ',()=>{
        mockedSetup.STAGE_PADDING = 10
        mockedSetup.STAGE_COLS = 10
        mockedSetup.BRICK_WIDTH = 10
        mockedSetup.BRICK_PADDING = 10
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1])
        const bricks = client.createBricks(1)
        const brick = bricks[0]
        expect(brick.x).toBe(10)
    })
    it('Given the array of bricks is two or more long, check the x coordinate ',()=>{
        mockedSetup.STAGE_PADDING = 10
        mockedSetup.STAGE_COLS = 2
        mockedSetup.BRICK_WIDTH = 20
        mockedSetup.BRICK_PADDING = 5
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1,1])
        const bricks = client.createBricks(2)
        const brick = bricks[1]
        expect(brick.position.x).toBe(35)
    })
    it('Given the array of bricks one long, check the y coordinate',()=>{
        mockedSetup.STAGE_PADDING = 10
        mockedSetup.STAGE_COLS = 1
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1])
        const bricks = client.createBricks(1)
        const brick = bricks[0]
        expect(brick.position.y).toBe(10)
    })
    it('Given the array of bricks one long, check the y coordinate, different data',()=>{
        mockedSetup.STAGE_PADDING = 2
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1])
        const bricks = client.createBricks(1)
        const brick = bricks[0]
        expect(brick.position.y).toBe(2)
    })
    it('Given a brick on a lower level, check the y coordinate',()=>{
        mockedSetup.STAGE_PADDING = 2
        mockedSetup.STAGE_COLS = 1
        mockedSetup.BRICK_HEIGHT = 20
        mockedSetup.BRICK_PADDING = 5
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1,1,1])
        const bricks = client.createBricks(2)
        const brick = bricks[1]
        expect(brick.position.y).toBe(27)
    })
    it('The x coordinate should carriage return as function maps around columns',()=>{
        mockedSetup.STAGE_PADDING = 2
        mockedSetup.STAGE_COLS = 2
        mockedSetup.BRICK_HEIGHT = 20
        mockedSetup.BRICK_PADDING = 5
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1, 1, 1])
        const bricks = client.createBricks(3)
        expect(bricks[2].position.x).toBe(bricks[0].position.x)
    })
    it('The function should not create bricks in places where 0 is',()=>{
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([0,1,1])
        const bricks = client.createBricks(1)
        expect(bricks.length).toBe(2)
    })
    it('if the input energy is 1, then the image is the red brick',()=>{
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1])
        const bricks = client.createBricks(1)
        expect(bricks[0].image.src).toEqual(expect.stringContaining(RED_BRICK))
    })
    it('if the input energy is 2, then the image is the green brick',()=>{
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1])
        const bricks = client.createBricks(1)
        expect(bricks[0].image.src).toEqual(expect.stringContaining(GREEN_BRICK))
    })
    it('if the input energy is 3, then the image is  yellow',()=>{
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([3])
        const bricks = client.createBricks(1)
        expect(bricks[0].image.src).toEqual(expect.stringContaining(YELLOW_BRICK))
    })
    it('if the input energy is 4, then the image is blue',()=>{
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([4])
        const bricks = client.createBricks(1)
        expect(bricks[0].image.src).toEqual(expect.stringContaining(BLUE_BRICK))
    })
    it('if the input energy is 5, then the image is purple',()=>{
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([5])
        const bricks = client.createBricks(1)
        expect(bricks[0].image.src).toEqual(expect.stringContaining(PURPLE_BRICK))
    })
    it('if the input energy is 2, then the brick energy is 1',()=>{
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([2])
        const bricks = client.createBricks(1)
        expect(bricks[0].energy).toEqual(1)
    })
    it('if the input energy is 3, then the brick energy is 2',()=>{
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([3])
        const bricks = client.createBricks(1)
        expect(bricks[0].energy).toEqual(2)
    })
    it('if the input energy is 4, then the brick energy is 2',()=>{
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([4])
        const bricks = client.createBricks(1)
        expect(bricks[0].energy).toEqual(2)
    })
    it('if the input energy is 5, then the brick energy is 3',()=>{
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([5])
        const bricks = client.createBricks(1)
        expect(bricks[0].energy).toEqual(3)
    })
    it('Each Brick should have the width and height of the BRICK_WIDTH and BRICK_HEIGHT constants',()=>{
        mockedSetup.BRICK_HEIGHT = 20
        mockedSetup.BRICK_WIDTH = 10
        const bricks = client.createBricks(7)
        bricks.forEach(brick=>{
            expect(brick.width).toEqual(mockedSetup.BRICK_WIDTH)
            expect(brick.height).toEqual(mockedSetup.BRICK_HEIGHT)
        })
    })
    it('Each Brick should have the width and height of the BRICK_WIDTH and BRICK_HEIGHT constants, different data',()=>{
        mockedSetup.BRICK_HEIGHT = 10
        mockedSetup.BRICK_WIDTH = 30
        const bricks = client.createBricks(7)
        bricks.forEach(brick=>{
            expect(brick.width).toEqual(mockedSetup.BRICK_WIDTH)
            expect(brick.height).toEqual(mockedSetup.BRICK_HEIGHT)
        })
    })
})

