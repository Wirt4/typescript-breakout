import {
    BRICK_HEIGHT,
    BRICK_PADDING,
    BRICK_WIDTH,
    STAGE_COLS,
    STAGE_PADDING
} from "../../setup";
import RED_BRICK_IMAGE from "../../images/brick-red.png";
import BLUE_BRICK_IMAGE from "../../images/brick-blue.png";
import GREEN_BRICK_IMAGE from "../../images/brick-green.png";
import YELLOW_BRICK_IMAGE from "../../images/brick-yellow.png";
import PURPLE_BRICK_IMAGE from "../../images/brick-purple.png";
import {Brick} from "./Brick";
import {Position, Size} from "../../types";

class BricksWrapperClient{
    private readonly columns: number
    private readonly brickSize: Size

    constructor(stageColumns: number = 10, brickSize: Size = {width: 10, height: 10}) {
        this.columns = stageColumns;
        this.brickSize = brickSize;
    }

    private brickStats(energyLevel: number){
        let color = RED_BRICK_IMAGE
        let level = 1
        switch (energyLevel){
            case 2:
                color = GREEN_BRICK_IMAGE
                level = 1
                break
            case 3:
                color = YELLOW_BRICK_IMAGE
                level = 2
                break
            case 4:
                color = BLUE_BRICK_IMAGE
                level = 2
                break
            case 5:
                color = PURPLE_BRICK_IMAGE
                level = 3
                break
        }
        return { img:color, energyLevel: level };
    }
    private  adjustedCoords(i: number): Position{
        const x = STAGE_PADDING + (i%this.columns) * (this.brickSize.width + BRICK_PADDING)
        const y = STAGE_PADDING + Math.floor(i/this.columns) * (this.brickSize.height + BRICK_PADDING)
        return {x, y}
    }

    public generateBrickSchema(numberOfBricks: number): number[] {
        return []
    }

    public createBricks(numberOfBricks: number): Brick[] {
        const schema = this.generateBrickSchema(numberOfBricks)
        return schema.reduce((accumulated, element, ndx)=>{
            if (element <=0) {
                return accumulated
            }
            return [...accumulated,this.brickFromIndex(ndx, element) ]
        },[] as Brick[] );
    }

    private brickFromIndex(ndx: number, energy: number): Brick{
        const coordinates = this.adjustedCoords(ndx)
        const {img, energyLevel} = this.brickStats(energy)
        return new Brick(img, coordinates, energyLevel, this.brickSize)
    }

    public getBricksWrapper(){}

}

export {BricksWrapperClient}
