import lib from '../lib/index.js'
const { Container, CanvasRenderer, Text } = lib;



const w = 1280;
const h = 720;
const renderer = new CanvasRenderer(w, h);
document.querySelector("#board").appendChild(renderer.view);

const scene = new Container();
const message = new Text("The Renderer!", {
    font: "40pt sans-serif",
    fill: "DarkRed",
    align: "center"
});
message.pos.x = w / 2;
message.pos.y = h / 2;
scene.add(message);
renderer.render(scene);

