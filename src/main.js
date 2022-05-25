import lib from "../lib/index.js";
const { Game, KeyControls } = lib;

import GameScreen from "./screens/GameScreen.js";
import TitleScreen from "./screens/TitleScreen.js";
import GameOverScreen from "./screens/GameOverScreen.js";
import LogoScreen from "./screens/LogoScreen.js";

const game = new Game(1280, 720);
const controls = new KeyControls();

function titleScreen() {
    game.scene = new TitleScreen(game, controls, newGame);
}

function gameOverScreen() {
    game.scene = new GameOverScreen(game, controls, titleScreen);
}

function newGame() {
    game.scene = new GameScreen(game, controls, gameOverScreen);
}

game.scene = new LogoScreen(game, titleScreen);
game.run();