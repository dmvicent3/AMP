import lib from "../../lib/index.js";
const { Container, Text } = lib;
import Player from "../entities/Player.js";
import ForestLevel from "../ForestLevel.js";
import Skeleton from "../entities/Skeleton.js";

class GameScreen extends Container {
    constructor(game, controls, gameOver) {
        super();
        this.gameOver = gameOver;
        this.gameOverDelay = 1.5;
        const player = new Player(controls);
        controls.reset();
        const level = new ForestLevel(game.w, game.h, { x: 0, y: -396.5 }, player);
        this.add(level);
        player.pos = level.playerInitPos;
        this.player = player;

        this.enemies = [];

        const skeletonPositions = [{ x: 1300, y: level.h - 200 }, { x: 1500, y: level.h - 200 }];
        skeletonPositions.forEach((pos) => {
            const skeleton = new Skeleton(this.player);
            skeleton.pos = pos;
            this.add(skeleton);
            this.enemies.push(skeleton);
        });
        this.add(player);
        this.level = level;
        this.playerHp = this.drawText("❤" + this.player.hp, { x: 150, y: 50 });
        this.add(this.playerHp);
    }

    drawText(msg, pos, size = 48) {
        const font = `${size}pt 'VT323', monospace`;
        const text = new Text(msg, { font: font, fill: "#fff", align: "center" });
        text.pos = pos;
        //text.anchor.x = 
        return text;
    };


    update(dt, t) {
        super.update(dt, t);
        const { player, level } = this;

        //Atualizar HP Overlay
        this.remove(this.playerHp);
        this.playerHp = this.drawText("❤" + this.player.hp, { x: 150, y: 50 });
        this.add(this.playerHp);


        if (!player.state.is(player.states.DEAD)) {
            if (player.state.is(player.states.WALK)) {
                if (player.pos.x < level.w / 3) { //Centrar o player no ecrã
                    if (player.pos.x > - 100) { //Não deixar o player sair do ecrã pela esquerda
                        player.pos.x += player.controls.x * player.speed;
                    } else {
                        player.pos.x += 1;
                    }
                } else {
                    this.enemies.forEach(e => {
                        //Como o player fica numa posição (x) fixa e o movimento do player é uma ilusão
                        //causada pelo fundo a mover-se, os enimigos precisam de estar relativos
                        //ao fundo e ao player. Se não, os enimigos conseguirão-se aproximar do player
                        //sem o player se conseguir se afastar deles.
                        //Então, é preciso atribuir ao x dos enimigos o oposto da direção do player 
                        //vezes a sua velocidade para dar essa relatividade de posição.
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
        } else {
            this.gameOverDelay -= dt;

            if (this.gameOverDelay < 0) {
                this.gameOver();
            }
            
        }
    }
}



export default GameScreen;