import {Sprite} from "./Sprite";
import {Position} from "../types";
import BALL_IMAGE from "../images/ball.png";
import {CanvasContact} from "../enums";

export class Ball extends Sprite{
    private velocity: Velocity
    private readonly canvasWidth: number

    constructor(position: Position, size: number, canvasWidth: number, speed: number) {
        super(BALL_IMAGE, position, {width: size, height: size});
        this.velocity = new Velocity(speed);
        this.canvasWidth =canvasWidth
    }

    hasCanvasCollision(): CanvasContact{
        if (this.position.y <= 0){
            return CanvasContact.CEILING
        }

        if (this.position.x <= 0 || this.rightMostX >= this.canvasWidth) {
            return CanvasContact.WALL
        }

        return CanvasContact.NO_CONTACT
    }

    get speed(): number {
        return this.velocity.absoluteSpeed
    }

    get centerX():number{
        return this.position.x + this.width/2
    }

    move():void{
        this.position = this.velocity.nextPosition(this.position)
    }

    bounceY():void{
        this.velocity.bounceY()
    }

    bounceX():void{
        this.velocity.bounceX()
    }
}

class Velocity{
    private xComponent:number
    private yComponent:number

    constructor(speed: number){
        this.xComponent = speed;
        this.yComponent = -speed
    }

    get absoluteSpeed():number{
        return Math.abs(this.xComponent)
    }

    nextPosition(initialPostition: Position):Position{
        return {
            x: initialPostition.x + this.xComponent,
            y: initialPostition.y + this.yComponent
        };
    }

    bounceX():void{
        this.xComponent *= -1
    }

    bounceY():void{
        this.yComponent *= -1
    }
}
