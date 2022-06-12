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

// O jogo é composto por "Containers", e cada container contém um atributo "children"
// que é um array de outros Containers.
// Os containers são responsáveis por armazenar os objetos que serão desenhados na tela recursivamente,
// ou seja, os containers e todos os seus filhos containers são desenhados até já não haver mais filhos.

// A classe "Game" contém o container principal, que contém todos os outros containers.
// Este container é designado como "scene", e é dentro dele onde acontece o Screen-life-cycle
//com os seguintes containers:
// LogoScreen -> TitleScreen -> GameScreen -> GameOverScreen -> TitleScreen -> Etc.

// A classe/container "GameScreen" é o container principal do jogo.
// Este container contém os seguintes containers:
// Level: O container que contém o mapa do jogo, composto por layers.
// Player: O jogador, que é um container que contém o sprite do jogador e o seu controler.
// Enemies: O container que contém todos os inimigos do jogo e como eles se comportam.
// Pickups: O container que contém todos os pickups que o player pode encontrar no mapa.
// UI:  O container que contém todos os elementos da interface do jogo.

// As classes principais do jogo são:
// lib/Game.js: Responsável por "atualizar" o jogo.
// lib/renderer/CanvasRenderer.js: Responsável por desenhar o jogo.
// lib/AnimManager.js: Responsável por gerenciar as animações dos sprites e tilesprites.
// lib/controls/KeyControls.js: Responsável por controlar o jogador.
// src/entities/Player.js: Responsável pelo comportamento do jogador.
// src/entities/Skeleton.js: Responsável pelo comportamento dos inimigos.
// src/ForestLevel.js: Classe que contém o mapa do jogo.
// src/screens/GameScreen.js: Responsável por controlar o jogo.