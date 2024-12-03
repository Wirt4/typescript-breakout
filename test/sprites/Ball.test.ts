import {Sprite} from "../../src/sprites/Sprite";
import {Ball} from "../../src/sprites/Ball";

describe('Ball constructor', () => {
    it('Ball should be an instance of Sprite',()=>{
        const pos = {x:0, y:0};
        const diameter = 5
        const speed = 6
        const ball = new Ball(pos, diameter, speed)
        expect(ball).toBeInstanceOf(Sprite)
    })
})
