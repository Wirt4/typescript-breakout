import {createBricks} from "../src/helper";
import {LEVEL} from "../src/setup";
import {Brick} from "../src/sprites/Brick";

jest.mock("../src/setup", () => ({
    LEVEL: []
}))

describe('createBricks', () => {
    let mockedSetup: Record<string, any>;
    beforeEach(() => {
        mockedSetup = require("../src/setup");
    })
    it('Given that the setup const LEVEL returns an empty array, when createBricks is called, then it returns an empty array',()=>{
       mockedSetup.LEVEL = []
        expect(createBricks()).toEqual([])
    })
    it('Given that the setup const LEVEL returns an empty array, when createBricks is called, then it returns an array with length of one',()=>{
        mockedSetup.LEVEL = [1]
        const bricks = createBricks()
        expect(bricks.length).toEqual(1)
    })
    it('return type should be bricks',()=>{
        mockedSetup.LEVEL = [1, 2 ,3, 4, 0, 5]
        const bricks = createBricks()
        bricks.forEach(brick => {
            expect(brick).toBeInstanceOf(Brick)
        })
    })
})
