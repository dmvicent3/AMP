import Container from "./Container.js";
import Layer from "./Layer.js";

class Background extends Container {
    constructor(layers, mapW, mapH) {
        super();
        this.mapW = mapW;
        this.mapH = mapH;
        this.children = layers;
    }

}

export default Background;