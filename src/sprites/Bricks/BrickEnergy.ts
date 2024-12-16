import {BrickImages} from "../../enums";
import RED_BRICK from "../../images/brick-red.png"
import GREEN_BRICK from "../../images/brick-green.png"
import YELLOW_BRICK from "../../images/brick-yellow.png"
import BLUE_BRICK from "../../images/brick-blue.png"
import PURPLE_BRICK from "../../images/brick-purple.png"

export class BrickEnergy {
    private currentEnergy: number | undefined
    private imageFile: string | undefined

    constructor(filepath: string, configValue: number) {
        this.parseConfig(configValue)
    }

    get imagePath() {
        return this.imageFile
    }

    get energy(): number{
        return this.currentEnergy || -1
    }

    public decrementScore():void{
        if (this.currentEnergy) this.currentEnergy--
        if (this.imageFile){
            if (this.imageFile== PURPLE_BRICK){
                this.imageFile = BLUE_BRICK
                return
            }
            this.imageFile = RED_BRICK
        }
    }

    private parseConfig(configValue: number): void {
        let color = RED_BRICK
        let level = 1

        switch (configValue) {
            case 2:
                color = GREEN_BRICK
                level = 1
                break
            case 3:
                color = YELLOW_BRICK
                level = 2
                break
            case 4:
                color = BLUE_BRICK
                level = 2
                break
            case 5:
                color = PURPLE_BRICK
                level = 3
        }
        this.currentEnergy = level
        this.imageFile = color
    }
}
