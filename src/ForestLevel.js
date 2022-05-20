import lib from "../lib/index.js";
const { Background, Layer, Texture, math } = lib;

const layerScale = 2;
const layer1 = new Layer(new Texture("../res/images/forest/Layer_0000_9.png"), 0.5, layerScale);
const layer2 = new Layer(new Texture("../res/images/forest/Layer_0001_8.png"), 0.5, layerScale);
const layer3 = new Layer(new Texture("../res/images/forest/Layer_0002_7.png"), 0.5, layerScale);
const layer4 = new Layer(new Texture("../res/images/forest/Layer_0003_6.png"), 0.4, layerScale);
const layer5 = new Layer(new Texture("../res/images/forest/Layer_0004_lights.png"), 0.4, layerScale);
const layer6 = new Layer(new Texture("../res/images/forest/Layer_0005_5.png"), 0.3, layerScale);
const layer7 = new Layer(new Texture("../res/images/forest/Layer_0006_4.png"), 0.3, layerScale);
const layer8 = new Layer(new Texture("../res/images/forest/Layer_0007_Lights.png"), 0.3, layerScale);
const layer9 = new Layer(new Texture("../res/images/forest/Layer_0008_3.png"), 0.2, layerScale);
const layer10 = new Layer(new Texture("../res/images/forest/Layer_0009_2.png"), 0.1, layerScale);
const layer11 = new Layer(new Texture("../res/images/forest/Layer_0010_1.png"), 0, layerScale);
const layer12 = new Layer(new Texture("../res/images/forest/Layer_0011_0.png"), 0, layerScale);
const layers = [layer12, layer11, layer10, layer9, layer8, layer7, layer6, layer5, layer4, layer3, layer2, layer1];

class ForestLevel extends Background {
  constructor(w, h, player) {
    super(layers, w, h);
    this.playerInitPos = { x: 0, y: h - 190 };
    this.player = player;
  }

  update() {
    layers.forEach(layer => {
      if (this.player) {
        if (this.player.controls.x) {
          if (this.player.dir > 0) {
            layer.nextX -= layer.speed
          }
          if (this.player.dir < 0) {
            layer.nextX += layer.speed
          }
        }
      } else {
        layer.nextX -= layer.speed
      }
    });
  }

}

export default ForestLevel;