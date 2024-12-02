
jest.mock("../src/setup", () => ({
    get LEVEL () {
        return []
    }
}))
describe('createBricks', () => {
    it('Given that the setup const LEVEL returns an empty array, when createBricks is called, then it returns an empty array',()=>{
        expect(createBricks).toEqual([])
    })
})
