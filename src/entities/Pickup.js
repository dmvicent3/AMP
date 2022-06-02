import lib from "../../lib/index.js";
const { TileSprite, Texture } = lib;

const texture = new Texture("res/images/potion.png");

const pickups = {
  potion: { frames: [[0, 0]], life: 40 },
};

class Pickup extends TileSprite {
  constructor(name) {
    super(texture, 45, 64);
    this.name = name;
    this.frames = pickups[name].frames.map(([x, y]) => ({ x, y }));
    this.liveForever = true;
    this.life = pickups[name].life;
    this.speed = 100;
  }

  update(dt, t) {
    const { frames, speed, liveForever } = this;
    this.frame = frames[Math.floor(t / speed) % frames.length];

    if (liveForever) return;
    const life = (this.life -= dt);
    if (life < 2) {
      this.visible = (t / 0.1 | 0) % 2;
    }
    if (life < 0) {
      this.dead = true;
    }
  }
}

Pickup.pickups = Object.keys(pickups);

export default Pickup;