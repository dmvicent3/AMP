import AnimManager from "./AnimManager.js";

class Layer {
    constructor(texture, scale) {
        this.texture = texture;
        this.scale = { x: scale, y: scale };
        this.pos = { x: 0, y: 0 };
        this.anchor = { x: 0, y: this.texture.img.height / - this.scale.y };
        this.pivot = { x: 0, y: 0 };
    }


}

export default Layer;