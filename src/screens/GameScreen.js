import lib from "../../lib/index.js";
const { Camera, Container } = lib;
import Player from "../entities/Player.js";
import ForestLevel from "../ForestLevel.js";

class GameScreen extends Container {
    constructor(game, controls) {
        super();
        const level = new ForestLevel(game.w, game.h);
        const player = new Player(controls, level.playerInitPos);
        const camera = this.add(
            new Camera(player, { w: game.w, h: game.h }, { w: level.w, h: level.h }));
        camera.add(level);
        camera.add(player);

        this.level = level;
        this.camera = camera;
        this.player = player;
    }

    update(dt, t) {
        super.update(dt, t);
        const { player, level } = this;
    }
}

export default GameScreen;