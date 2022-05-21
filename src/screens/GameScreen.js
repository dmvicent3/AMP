import lib from "../../lib/index.js";
const { Container } = lib;
import Player from "../entities/Player.js";
import ForestLevel from "../ForestLevel.js";
import Skeleton from "../entities/Skeleton.js";

class GameScreen extends Container {
    constructor(game, controls) {
        super();
        const player = new Player(controls);
        const level = new ForestLevel(game.w, game.h, { x: 0, y: -396.5 }, player);
        player.pos = level.playerInitPos;

        this.add(level);
        this.enemies = [];

        const skeletonPositions = [{ x: 800, y: level.h - 200 }];
        skeletonPositions.forEach((pos) => {
            const skeleton = new Skeleton(this.player);
            skeleton.pos = pos;
            this.add(skeleton);
            this.enemies.push(skeleton);
        });
        this.add(player);
        this.level = level;
        this.player = player;
    }

    update(dt, t) {
        super.update(dt, t);
        const { player, level } = this;
        if (player.state.is(player.states.WALK)) {
            if (player.pos.x < level.w / 3) { //Centrar o player no ecrã
                if (player.pos.x > - 100) { //Não deixar o player sair do ecrã pela esquerda
                    player.pos.x += player.controls.x * player.speed;
                } else {
                    player.pos.x += 1;
                }
            } else {
                this.enemies.forEach(e => {
                    e.pos.x -= player.controls.x * player.speed;
                });

                level.layers.forEach(layer => { //Parallax Effect: Player deixa de se mover, apenas os fundos sem movem
                    if (player.controls.x) {
                        if (player.dir > 0) {
                            layer.nextX -= layer.speed;
                        }
                        if (this.player.dir < 0) {
                            // Como o mapa só é infinito para a direita, é preciso impedir o Player
                            // de andar/ver o limite do mapa quando ele anda para a esquerda
                            if (level.layers[level.layers.length - 1].nextX < 0) {
                                layer.nextX += layer.speed;
                            } else {
                                if (player.pos.x > - 100) { //Não deixar o player sair do ecrã pela esquerda
                                    player.pos.x += player.controls.x * player.speed;
                                } else {
                                    player.pos.x += 1;
                                }
                            }
                        }
                    }
                });
            }
        }

    }
}


export default GameScreen;