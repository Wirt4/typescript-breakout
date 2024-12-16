
export interface IBall  {
    y: number
    x: number
    bounceY(): void
    bounceX():void
    rightMostX: number
    rewind(overlap: number):void
    move():void
}
