import {CanvasView} from "./view/CanvasView";
import {Game} from "./Game";

const view = new CanvasView("#playField")
const game = new Game(view)
view.initStartButton(()=>game.start())
