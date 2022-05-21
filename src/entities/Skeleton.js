import lib from "../../lib/index.js";
const { TileSprite, Texture } = lib;

const texture = new Texture("res/images/skeleton/skeletonsheet.png");

class Skeleton extends TileSprite {
  constructor(player) {
    super(texture, 64, 64);

    this.scale = { x: 3, y: 3 };
    const { anims } = this;

    anims.add("attack-right", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(x => ({ x, y: 0 })), 0.1);

    anims.add("attack-left", [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(x => ({ x, y: 5 })), 0.1);

    anims.add("die-right", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(x => ({ x, y: 1 })), 0.1);

    anims.add("die-left", [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(x => ({ x, y: 6 })), 0.1);

    anims.add("walk-right", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(x => ({ x, y: 2 })), 0.1);

    anims.add("walk-left", [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(x => ({ x, y: 7 })), 0.1);

    anims.add("idle-right", [0, 1, 2, 3].map(x => ({ x, y: 3 })), 0.2);

    anims.add("idle-left", [12, 11, 10, 9].map(x => ({ x, y: 8 })), 0.2);

    anims.add("hurt-right", [0, 1, 2].map(x => ({ x, y: 4 })), 0.1);

    anims.add("hurt-left", [12, 11, 10].map(x => ({ x, y: 9 })), 0.1);

    this.player = player;
    this.minSpeed = 0.6;
    this.reset();
    this.speed = this.minSpeed;
    this.dir = 1;
    this.nextCell = this.speed;
  }

  reset() {
     this.anims.play("idle-left");
  }

  update(dt, t) {
    super.update(dt, t);
   // this.anims.play("walk-left");
   // this.pos.x -= 1 * this.speed;
  }
}

export default Skeleton;