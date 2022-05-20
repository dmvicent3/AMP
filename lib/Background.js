import Container from "./Container.js";

class Background extends Container {
    constructor(layers, mapW, mapH) {
        super();
        this.mapW = mapW;
        this.mapH = mapH;
        this.children = layers;
    }

}

export default Background;