import lib from "../lib/index.js";
import Skeleton from "./entities/Skeleton.js";
const { Background, Layer, Texture } = lib;

class ForestLevel extends Background {
  constructor(w, h, anchor, player) {
    super(w, h);
    this.playerInitPos = { x: 0, y: h - 190 };
    this.player = player;
    this.w = w;
    this.h = h;
    this.children = [];
    this.layers = [];
    this.loadLayers(anchor);
  }

  loadLayers(anchor) {
    const layerScale = 2;
    const layer1 = new Layer(new Texture("./res/images/forest/Layer_0000_9.png"), 0.5, layerScale, anchor);
    const layer2 = new Layer(new Texture("./res/images/forest/Layer_0001_8.png"), 0.5, layerScale, anchor);
    const layer3 = new Layer(new Texture("./res/images/forest/Layer_0002_7.png"), 0.5, layerScale, anchor);
    const layer4 = new Layer(new Texture("./res/images/forest/Layer_0003_6.png"), 0.4, layerScale, anchor);
    const layer5 = new Layer(new Texture("./res/images/forest/Layer_0004_lights.png"), 0.4, layerScale, anchor);
    const layer6 = new Layer(new Texture("./res/images/forest/Layer_0005_5.png"), 0.3, layerScale, anchor);
    const layer7 = new Layer(new Texture("./res/images/forest/Layer_0006_4.png"), 0.3, layerScale, anchor);
    const layer8 = new Layer(new Texture("./res/images/forest/Layer_0007_Lights.png"), 0.3, layerScale, anchor);
    const layer9 = new Layer(new Texture("./res/images/forest/Layer_0008_3.png"), 0.2, layerScale, anchor);
    const layer10 = new Layer(new Texture("./res/images/forest/Layer_0009_2.png"), 0.1, layerScale, anchor);
    const layer11 = new Layer(new Texture("./res/images/forest/Layer_0010_1.png"), 0, layerScale, anchor);
    const layer12 = new Layer(new Texture("./res/images/forest/Layer_0011_0.png"), 0, layerScale, anchor);

    this.layers = [layer12, layer11, layer10, layer9, layer8, layer7, layer6, layer5, layer4, layer3, layer2, layer1];
    this.layers.forEach(layer => {
      this.add(layer);
    });
  }

  update() {
    if (this.player == null) { //Animar o Titlescreen
      this.layers.forEach(layer => {
        layer.nextX -= layer.speed
      });
    }
  }

}

export default ForestLevel;