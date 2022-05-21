class Layer {
    constructor(texture, speed, scale, anchor ) {
        this.texture = texture;
        this.scale = { x: scale, y: scale };
        this.pos = { x: 0, y: 0 };
        this.anchor = anchor;
        this.pivot = { x: 0, y: 0 };
        this.limit = this.texture.img.width;
        this.nextX = 0;
        this.speed = speed;
    }
}

export default Layer;