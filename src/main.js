import lib from "../lib/index.js";
const { Game, Texture, TileMap, KeyControls, Camera, Layer, Background, math } = lib;
import Player from "./entities/Player.js";
import ForestLevel from "./ForestLevel.js";

const game = new Game(1280, 720);
const { scene, w, h } = game;

let forestLevel = new ForestLevel(w, h);
const controls = new KeyControls();
const player = new Player(controls, forestLevel.playerInitPos);
const camera = new Camera(player, { w, h }, { w: forestLevel.mapW, h: forestLevel.mapH });

//scene.add(map);
//scene.add(player);
scene.add(camera);
scene.add(forestLevel);
scene.add(player);

game.run();