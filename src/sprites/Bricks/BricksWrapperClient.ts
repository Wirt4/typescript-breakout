
import RED_BRICK_IMAGE from "../../images/brick-red.png";
import BLUE_BRICK_IMAGE from "../../images/brick-blue.png";
import GREEN_BRICK_IMAGE from "../../images/brick-green.png";
import YELLOW_BRICK_IMAGE from "../../images/brick-yellow.png";
import PURPLE_BRICK_IMAGE from "../../images/brick-purple.png";
import {Brick} from "./Brick";
import {Position, Size} from "../../types";
import {BricksWrapper} from "./BricksWrapper";

interface Padding{
    stage: number
    brick: number
}

class BrickCoordinates{
    private readonly columns: number
    private padding: Padding
    private brickSize: Size

    constructor(columns: number, padding: Padding, brickSize: Size) {
        this.columns = columns
        this.padding = padding
        this.brickSize = brickSize
    }

    private template(offset:number, brickSize: number):number{
        return this.padding.stage + offset * (brickSize+ this.padding.brick);
    }

    public xCoordinate(index: number){
        return this.template(index%this.columns, this.brickSize.width)
    }

    public yCoordinate(index: number){
        return this.template(Math.floor(index/this.columns), this.brickSize.height);
    }
}

class BricksWrapperClient{
    private brickCoordinates:BrickCoordinates;
    private readonly brickSize:Size;
    private readonly columns: number;

    constructor(stageColumns: number = 10,
                brickSize: Size = {width: 10, height: 10},
                padding:Padding = {stage:3, brick:1}) {
        this.brickCoordinates = new BrickCoordinates(stageColumns, padding, brickSize);
        this.brickSize = brickSize;
        this.columns = stageColumns;
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

    private adjustedCoords(i: number): Position{
        const x = this.brickCoordinates.xCoordinate(i)
        const y = this.brickCoordinates.yCoordinate(i)
        return {x, y}
    }

    private allocateEnergyNumber(ndx: number){
        return ndx%this.columns!==0 && ndx%this.columns !== this.columns-1 ?  this.energyInputGenerator(): 0
    }

    private allocateEnergyForTwoColumn(ndx: number){
        return ndx%this.columns==0 ? this.energyInputGenerator(): 0
    }

    private templateSchema(numberOfBricks: number): number[]{
        const schema = new Array(this.columns * (numberOfBricks + 1))
        schema.fill(0)
        return schema
    }

    private twoColumnSchema(numberOfBricks: number){
        const schema = this.templateSchema(numberOfBricks)
        for (let i=1; i< schema.length; i++){
            schema[i] = this.allocateEnergyForTwoColumn(i)
        }
        return schema
    }

    private oneColumnSchema(numberOfBricks: number){
        const schema = this.templateSchema(numberOfBricks)
        for (let i = 1; i< schema.length; i++){
            schema[i] = this.energyInputGenerator()
        }
        return schema
    }

    private multiSchema(numberOfBricks: number){
        const schema = this.templateSchema(numberOfBricks)
        for (let i=this.columns; i< schema.length; i++){
             if (numberOfBricks>=0){
                 schema[i] = this.allocateEnergyNumber(i)
                 numberOfBricks--
             }
        }
        return schema
    }

    public energyInputGenerator():number{
        return 1 +  Math.floor(Math.random() * 4);
    }

    public generateBrickSchema(numberOfBricks: number): number[] {
        if (this.columns == 1 ){
           return this.oneColumnSchema(numberOfBricks)
        }

        if (this.columns == 2){
           return this.twoColumnSchema(numberOfBricks)
        }

       return this.multiSchema(numberOfBricks)
    }

    public createBricks(numberOfBricks: number): Brick[] {
        if (numberOfBricks <= 0){
            return[]
        }
        const schema = this.generateBrickSchema(numberOfBricks)
        return this.schemaToBricks(schema)
    }

    private schemaToBricks(schema: number[]): Brick[]{
        return schema.reduce((accumulated, element, ndx)=>{
            if (element <= 0) {
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

    public getBricksWrapper(numberOfBricks: number = 1): BricksWrapper {
        return new BricksWrapper(this.createBricks(numberOfBricks))
    }
}

export {BricksWrapperClient}
