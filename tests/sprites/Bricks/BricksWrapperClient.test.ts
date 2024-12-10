import {BricksWrapperClient} from "../../../src/sprites/Bricks/BricksWrapperClient";
import {Brick} from "../../../src/sprites/Bricks/Brick";
import RED_BRICK from "../../../src/images/brick-red.png"
import GREEN_BRICK from "../../../src/images/brick-green.png"
import YELLOW_BRICK from "../../../src/images/brick-yellow.png"
import BLUE_BRICK from "../../../src/images/brick-blue.png"
import PURPLE_BRICK from "../../../src/images/brick-purple.png"
import {BricksWrapper} from "../../../src/sprites/Bricks/BricksWrapper";

jest.mock("../../../src/setup", () => ({
    BRICK_PADDING:0,
    BRICK_IMAGES: {
    1: 'stub',
    2: 'stub',
    3: 'stub',
    4: 'stub',
    5: 'stub'
    }
}))
jest.mock("../../../src/images/brick-red.png")
jest.mock("../../../src/images/brick-green.png")
jest.mock("../../../src/images/brick-yellow.png")
jest.mock("../../../src/images/brick-blue.png")
jest.mock("../../../src/images/brick-purple.png")

describe('createBricks', () => {
    let client: BricksWrapperClient
    let bricks: Brick[]
    let assertWidthAndHeight : Function
    beforeEach(() => {
        client = new BricksWrapperClient();
        assertWidthAndHeight = (width: number, height: number) => {
            client = new BricksWrapperClient(10, {width, height});
            jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1,1,1,1,1,1,1])
            bricks = client.createBricks(7)
            bricks.forEach(brick=>{
                expect(brick.width).toEqual(width)
                expect(brick.height).toEqual(height)
            })
        }
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('return type should be bricks',()=>{
        bricks = client.createBricks(5)
        bricks.forEach(brick => {
            expect(brick).toBeInstanceOf(Brick)
        })
    })

    it('Each Brick should have the width and height of the BRICK_WIDTH and BRICK_HEIGHT constants',()=>{
        assertWidthAndHeight(10, 20)
    })
    it('Each Brick should have the width and height of the BRICK_WIDTH and BRICK_HEIGHT constants, different data',()=>{
        assertWidthAndHeight(30, 10)
    })
})

describe('createBricks input Energy tests',()=>{
    let client: BricksWrapperClient
    let bricks: Brick[]
    let assertBrickImage: Function
    let assertBrickEnergy: Function
    let mockBrick: Function
    beforeEach(() => {
        client = new BricksWrapperClient();
        mockBrick = (energy: number)=>{
            jest.spyOn(client, 'generateBrickSchema').mockReturnValue([energy])
            bricks = client.createBricks(1)
            return bricks[0]
        }
        assertBrickImage =(energy: number, img: string)=>{
            const brick = mockBrick(energy)
            expect(brick.image.src).toEqual(expect.stringContaining(img))
        }
        assertBrickEnergy=(input: number, expected: number)=>{
            const brick = mockBrick(input)
            expect(brick.energy).toEqual(expected)
        }
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('if the input energy is 1, then the image is the red brick',()=>{
        assertBrickImage(1, RED_BRICK)
    })
    it('if the input energy is 2, then the image is the green brick',()=>{
        assertBrickImage(2, GREEN_BRICK)
    })
    it('if the input energy is 3, then the image is  yellow',()=>{
        assertBrickImage(3, YELLOW_BRICK)
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([3])
        bricks = client.createBricks(1)
        expect(bricks[0].image.src).toEqual(expect.stringContaining(YELLOW_BRICK))
    })
    it('if the input energy is 4, then the image is blue',()=>{
        assertBrickImage(3, BLUE_BRICK)
    })
    it('if the input energy is 5, then the image is purple',()=>{
        assertBrickImage(5, PURPLE_BRICK)
    })
    it('if the input energy is 2, then the brick energy is 1',()=>{
        assertBrickEnergy(2, 1)
    })
    it('if the input energy is 3, then the brick energy is 2',()=>{
        assertBrickEnergy(3, 2)
    })
    it('if the input energy is 4, then the brick energy is 2',()=>{
        assertBrickEnergy(4, 2)
    })
    it('if the input energy is 5, then the brick energy is 3',()=>{
        assertBrickEnergy(5, 3)
    })
})

describe('createBricks, length tests',()=>{
    let client: BricksWrapperClient
    let bricks: Brick[]
    let mockSchema: Function
    beforeEach(() => {
        client = new BricksWrapperClient();
        mockSchema = (returnValue: number[]) =>{
            jest.spyOn(client, 'generateBrickSchema').mockReturnValue(returnValue)
            bricks = client.createBricks(1)
        }
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('Given that the numberOfBricks argument is 0, when createBricks is called, then it returns an empty array',()=>{
        expect(client.createBricks(0)).toEqual([])
    })
    it('Given that the numberOfBricks argument is 1, when createBricks is called, then it returns an array with length of one',()=>{
        mockSchema([1])
        expect(bricks.length).toEqual(1)
    })
    it('The function should not create bricks in places where 0 is',()=>{
        mockSchema([0, 1,1])
        expect(bricks.length).toBe(2)
    })
})

describe('createBricks, Coordinates Checks',()=>{
    let mockedSetup: Record<string, any>;
    let client: BricksWrapperClient
    let bricks: Brick[]
    beforeEach(() => {
        mockedSetup = require("../../../src/setup");
        client = new BricksWrapperClient();
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('Given the array of bricks is one long, check the x coordinate ',()=>{
        client = new BricksWrapperClient(10,{width: 10, height:5}, {stage: 4, brick:2});
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1])
        bricks = client.createBricks(1)
        const brick = bricks[0]
        expect(brick.x).toBe(4)
    })
    it('Given the array of bricks is one long, check the x coordinate ',()=>{
        client = new BricksWrapperClient(1,{width: 10, height:5}, {stage: 10, brick:10});
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1])
        bricks = client.createBricks(1)
        const brick = bricks[0]
        expect(brick.x).toBe(10)
    })
    it('Given the array of bricks is two or more long, check the x coordinate ',()=>{
        mockedSetup.BRICK_PADDING = 5
        client = new BricksWrapperClient(2, {width:20, height:5}, {stage: 10, brick:5});
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1,1])
        bricks = client.createBricks(2)
        const brick = bricks[1]
        expect(brick.x).toBe(35)
    })
    it('Given the array of bricks one long, check the y coordinate',()=>{
        client = new BricksWrapperClient(1, {width:20, height:5}, {stage: 10, brick:2});
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1])
        bricks = client.createBricks(1)
        const brick = bricks[0]
        expect(brick.y).toBe(10)
    })
    it('Given the array of bricks one long, check the y coordinate, different data',()=>{
        client = new BricksWrapperClient(1, {width:20, height:5}, {stage: 2, brick : 5});
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1])
        bricks = client.createBricks(1)
        const brick = bricks[0]
        expect(brick.y).toBe(2)
    })
    it('Given a brick on a lower level, check the y coordinate',()=>{
        client = new BricksWrapperClient(1, {height:20, width:20}, {stage: 2, brick:5});
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1,1,1])
        bricks = client.createBricks(2)
        const brick = bricks[1]
        expect(brick.position.y).toBe(27)
    })
    it('The x coordinate should carriage return as function maps around columns',()=>{
        mockedSetup.BRICK_PADDING = 5
        client = new BricksWrapperClient(2, {width:20, height:20}, {stage: 2, brick:5});
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1, 1, 1])
        bricks = client.createBricks(3)
        expect(bricks[2].x).toBe(bricks[0].x)
    })
})

describe('getBricksWrapper tests',()=>{
    let client: BricksWrapperClient
    let wrapper: BricksWrapper
    beforeEach(() => {
        client = new BricksWrapperClient(1)
    })
    afterEach(()=>{
        jest.clearAllMocks()
    })
    it('output of getBricksWrapper is a wrapper',()=>{
        wrapper = client.getBricksWrapper()
        expect(wrapper).toBeInstanceOf(BricksWrapper)
    })
    it('output of getBricksWrapper takes the argument "number of bricks" and the wrapper has that number of bricks',()=>{
        const expected = 5
        jest.spyOn(client, 'generateBrickSchema').mockReturnValue([1,2,3,4,5])
        wrapper = client.getBricksWrapper(expected)
        expect(wrapper.arr.length).toBe(expected)
    })
})

describe('generateBrickSchema tests',()=>{
    let client: BricksWrapperClient
    let actual: number[] = []
    let assertIsZero: Function
    let assertIsNonZero: Function
    beforeEach(() => {
        client = new BricksWrapperClient(1)
        actual = client.generateBrickSchema(1)
        assertIsZero = (indeces: number[]) => {
            indeces.forEach(ndx => {expect(actual[ndx]).toBe(0)})
        }
        assertIsNonZero = (indecs: number[]) => {
            indecs.forEach(ndx => {expect(actual[ndx]).not.toBe(0)})
        }
    })
    it('minimum case1, 1 brick, 1 column',()=>{
         client = new BricksWrapperClient(1)
         actual = client.generateBrickSchema(1)
        expect(actual.length).toEqual(2)
        assertIsZero([0])
        assertIsNonZero([1])
    })
    it('1 brick, 2 columns right-hand column zero fills in first',()=>{
         client = new BricksWrapperClient(2)
         actual = client.generateBrickSchema(1)
        expect(actual.length).toEqual(4)
        //[0, 0,
        //1, 0]
        assertIsZero([0, 1, 3])
        assertIsNonZero([2]);
    })
    it('3 bricks, 2 columns right-hand column zero fills in first',()=>{
         client = new BricksWrapperClient(2)
         actual = client.generateBrickSchema(3)
        expect(actual.length).toEqual(8)
        //[0,0
        // 1,0,
        // 1,0
        // 1,0]
        assertIsZero([0,1,3,5,7])
        assertIsNonZero([2,4,6])
    })
    it('1 bricks, 3 columns right-hand and lefthand columns are filled in first',()=>{
        client = new BricksWrapperClient(3)
        actual = client.generateBrickSchema(1)
        expect(actual.length).toEqual(6)
        //[0,0,0
        // 0,1,0]
        assertIsZero([0,1,2,3,5])
        assertIsNonZero([4])
    })
})
