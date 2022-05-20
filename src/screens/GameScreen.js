import lib from "../../lib/index.js";
const { Container } = lib;
import Player from "../entities/Player.js";
import ForestLevel from "../ForestLevel.js";

class GameScreen extends Container {
    constructor(game, controls) {
        super();
        const player = new Player(controls);
        const level = new ForestLevel(game.w, game.h, player);
        player.pos = level.playerInitPos;

        this.add(level);
        this.add(player);
        
        this.level = level;
        this.player = player;
    }

    update(dt, t) {
        super.update(dt, t);
        const { player, level } = this;
    }
}

export default GameScreen;