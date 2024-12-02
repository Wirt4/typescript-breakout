import {createBricks} from "../src/helper";

jest.mock("../src/setup", () => ({
    get LEVEL () {
        return []
    }
}))
describe('createBricks', () => {
    it('Given that the setup const LEVEL returns an empty array, when createBricks is called, then it returns an empty array',()=>{
        expect(createBricks()).toEqual([])
    })
    it('Given that the setup const LEVEL returns an empty array, when createBricks is called, then it returns an array with length of one',()=>{
        const bricks = createBricks()
        expect(bricks.length).toEqual(1)
    })
})
