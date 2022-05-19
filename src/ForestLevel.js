import lib from "../lib/index.js";
const { Background, Layer, Texture, math } = lib;

const layerScale = 2;
const layer1 = new Layer(new Texture("../res/images/forest/Layer_0000_9.png"), layerScale);
const layer2 = new Layer(new Texture("../res/images/forest/Layer_0001_8.png"), layerScale);
const layer3 = new Layer(new Texture("../res/images/forest/Layer_0002_7.png"), layerScale);
const layer4 = new Layer(new Texture("../res/images/forest/Layer_0003_6.png"), layerScale);
const layer5 = new Layer(new Texture("../res/images/forest/Layer_0004_lights.png"), layerScale);
const layer6 = new Layer(new Texture("../res/images/forest/Layer_0005_5.png"), layerScale);
const layer7 = new Layer(new Texture("../res/images/forest/Layer_0006_4.png"), layerScale);
const layer8 = new Layer(new Texture("../res/images/forest/Layer_0007_Lights.png"), layerScale);
const layer9 = new Layer(new Texture("../res/images/forest/Layer_0008_3.png"), layerScale);
const layer10 = new Layer(new Texture("../res/images/forest/Layer_0009_2.png"), layerScale);
const layer11 = new Layer(new Texture("../res/images/forest/Layer_0010_1.png"), layerScale);
const layer12 = new Layer(new Texture("../res/images/forest/Layer_0011_0.png"), layerScale);
const layers = [layer12, layer11, layer10, layer9, layer8, layer7, layer6, layer5, layer4, layer3, layer2, layer1];

class ForestLevel extends Background {
  constructor(w, h) {
    super(layers, w, h);
    this.playerInitPos = { x: 0, y: h - 190 };
  }

  /*getRandomPos() {
    const { w, h, blank, bounds } = this;
    let found = false;
    let x, y;

    while (!found) {
      x = math.rand(w);
      y = math.rand(h);
      const isCleared = this.tileAtPixelPos({ x, y }).frame === blank;
      const inBounds =
        x > bounds.left &&
        x < bounds.right &&
        y > bounds.top &&
        y < bounds.bottom;

      if (inBounds && !isCleared) {
        found = true;
      }
    }
    return this.mapToPixelPos(this.pixelToMapPos({ x, y }));
  }*/

}

export default ForestLevel;