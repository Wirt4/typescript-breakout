import {Sprite} from "./Sprite";
import {Vector} from "../types";
import BALL_IMAGE from "../images/ball.png"

export class Ball extends Sprite{
    private _speed: Speed

    constructor(position: Vector, size: number, speed: number) {
        super(BALL_IMAGE, position, {width: size, height: size});
        this._speed= new Speed(speed);
    }

    move():void{
        this._x += this._speed.x;
        this._y += this._speed.y;
    }

    bounceY(){
        this._speed.bounceY()
    }

    bounceX(){
        this._speed.bounceX()
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
