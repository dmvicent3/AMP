import lib from "../../lib/index.js";
import State from "../../lib/State.js";

const { TileSprite, Texture } = lib;

const texture = new Texture("res/images/player/spritesheet2.png");

class Player extends TileSprite {
  constructor(controls) {
    super(texture, 128, 64);

    this.controls = controls;
    this.scale = { x: 2, y: 2 };

    const { anims } = this;
    anims.add("idle-right", [{ x: 0, y: 13 }, { x: 1, y: 13 }, { x: 0, y: 14 }, { x: 1, y: 14 },
    { x: 0, y: 15 }, { x: 1, y: 15 }, { x: 0, y: 16 }, { x: 1, y: 16 }], 0.1);

    anims.add("walk-right", [{ x: 0, y: 21 }, { x: 1, y: 21 }, { x: 0, y: 22 }, { x: 1, y: 22 },
    { x: 0, y: 23 }, { x: 1, y: 23 }, { x: 0, y: 24 }, { x: 1, y: 24 }], 0.1);

    anims.add("attack-right", [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
    { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], 0.1);

    anims.add("death-right", [{ x: 0, y: 5 }, { x: 1, y: 5 }, { x: 0, y: 6 }, { x: 1, y: 6 }], 0.1);

    anims.add("idle-left", [{ x: 7, y: 25 + 13 }, { x: 6, y: 25 + 13 }, { x: 7, y: 25 + 14 }, { x: 6, y: 25 + 14 },
    { x: 7, y: 25 + 15 }, { x: 6, y: 25 + 15 }, { x: 7, y: 25 + 16 }, { x: 6, y: 25 + 16 }], 0.1);

    anims.add("walk-left", [{ x: 7, y: 25 + 21 }, { x: 6, y: 25 + 21 }, { x: 7, y: 25 + 22 }, { x: 6, y: 25 + 22 },
    { x: 7, y: 25 + 23 }, { x: 6, y: 25 + 23 }, { x: 7, y: 25 + 24 }, { x: 6, y: 25 + 24 }], 0.1);

    anims.add("attack-left", [{ x: 7, y: 25 }, { x: 6, y: 25 }, { x: 5, y: 25 }, { x: 4, y: 25 },
    { x: 3, y: 25 }, { x: 2, y: 25 }, { x: 1, y: 25 }, { x: 0, y: 25 }, { x: 7, y: 25 + 1 }, { x: 6, y: 25 + 1 }], 0.1);

    anims.add("death-left", [{ x: 7, y: 25 + 5 }, { x: 6, y: 25 + 5 }, { x: 7, y: 25 + 6 }, { x: 6, y: 25 + 6 }], 0.1);

    this.states = {
      IDLE: 0,
      WALK: 1,
      ATTACK: 2
    };
    this.state = new State(this.states.IDLE);
    this.minSpeed = 1;
    this.idle();
    this.speed = this.minSpeed;
    this.attackStartTime;
    this.dir = 1;
  }

  idle(dir) {
    if (this.state.get() !== this.states.ATTACK) {
      if (dir > 0) {
        this.anims.play("idle-right");
      } else {
        this.anims.play("idle-left");
      }

      this.state.set(this.states.IDLE);
    }

  }

  attack(dir, t) {
    if (this.state.get() !== this.states.ATTACK) {
      if (dir > 0) {
        this.anims.play("attack-right");
      } else {
        this.anims.play("attack-left");
      }

      this.state.set(this.states.ATTACK);
      return t;
    }
  }

  walk(dir) {
    if (this.state.get() !== this.states.ATTACK) {
      if (dir > 0) {
        this.anims.play("walk-right");
      } else {
        this.anims.play("walk-left");
      }
      this.state.set(this.states.WALK);
    }
  }


  update(dt, t) {
    super.update(dt, t);
    const { controls } = this;
    const { x, action } = controls;
    const attackAnimTime = 1;

    if (x) {
      this.dir = x;
      this.walk(this.dir)
    } else {
      this.idle(this.dir);
    }

    if (action) {
      if (!this.state.is(this.states.ATTACK)) {
        this.attackStartTime = this.attack(this.dir, t);
      }
    }

    if (t >= this.attackStartTime + attackAnimTime) {
      this.state.set(this.states.WALK);
    }

    this.state.update(dt);
  }
}

export default Player;