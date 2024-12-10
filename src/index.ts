import {CanvasView} from "./view/CanvasView";
import {Game} from "./Game";

const view = new CanvasView("#playField")
view.initStartButton(()=>{
    const game = new Game(view)
    game.start()
})
