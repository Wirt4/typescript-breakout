import {Sprite} from "./Sprite";
import { Vector} from "../types";
import BALL_IMAGE from "../images/ball.png"

export class Ball extends Sprite{
    private _speed: Speed
    private readonly canvasWidth: number
    public sleep = false

    constructor(position: Vector, size: number, canvasWidth: number,  speed: number) {
        super(BALL_IMAGE, position, {width: size, height: size});
        this._speed = new Speed(speed);
        this.canvasWidth =canvasWidth
    }

    detectCollision(){
        if (this.y <= 0){
            console.log(this)
            this.bounceY()
        }
        if (this.x <= 0 || this.x + this.width >= this.canvasWidth) {
            console.log('calling ball.bounce x from ball.detectCollision')
            this.bounceX()
        }
    }

    get speed(): number {
        return Math.abs(this._speed.x)
    }

    get centerX():number{
        return this.x + this.width/2
    }


    move():void{
        if(!this.sleep){
            this.x += this._speed.x;
            this.y += this._speed.y;
        }
        this.sleep = false
    }

    bounceY():void{
        console.log('bounceY called')
        this._speed.bounceY()
    }

    bounceX():void{
        console.log('bounceX called')
        this._speed.bounceX()
    }

    bounceXY():void{
        console.log('calling BounceX fro bounceXY')
        this.bounceX()
        this.bounceY()
    }

}

class Speed{
    private  _xSpeed:number
    private _ySpeed:number

    constructor(speed: number){
        this._xSpeed = speed;
        this._ySpeed = -speed
    }

    get x():number{
        return this._xSpeed;
    }

    get y(): number{
        return this._ySpeed;
    }

    bounceY():void{
        this._ySpeed *= -1
    }

    bounceX():void{
        this._xSpeed *= -1
    }
}
