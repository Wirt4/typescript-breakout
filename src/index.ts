import {CanvasView} from "./view/CanvasView";
import {Game} from "./Game/Game";
import {BricksWrapperClient} from "./sprites/Bricks/BricksWrapperClient";
import {BRICK_HEIGHT, BRICK_PADDING, BRICK_WIDTH, STAGE_COLS, STAGE_PADDING} from "./setup";

const view = new CanvasView("#playField")
view.initStartButton(()=>{
    const client = new BricksWrapperClient(STAGE_COLS,
        {width: BRICK_WIDTH, height: BRICK_HEIGHT},
        {stage: STAGE_PADDING, brick:BRICK_PADDING}
    );
    const game = new Game(view, client)
    game.start()
})
