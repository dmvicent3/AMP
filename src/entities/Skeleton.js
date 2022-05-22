import lib from "../../lib/index.js";
import State from "../../lib/State.js";
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

    anims.add("hurt-right", [0, /*1, 2*/].map(x => ({ x, y: 4 })), 0.1);

    anims.add("hurt-left", [12, /*11, 10*/].map(x => ({ x, y: 9 })), 0.1);

    anims.add("dead-right", [{ x: 12, y: 1 }], 0.1);

    anims.add("dead-left", [{ x: 0, y: 6 }], 0.1);

    this.states = {
      IDLE: 0,
      WALK: 1,
      ATTACK: 2,
      HURT: 3,
      DYING: 4,
      DEAD: 5
    };

    this.hp = 100;
    this.power = 20;

    this.state = new State(this.states.IDLE);

    this.player = player;
    this.speed = 0.6;
    this.idle();

    this.dir = 1;

    this.attackStartTime = 0;
    this.deathStartTime = 0;
    this.hurtStartTime = 0;
    this.lastHurtTime = 0;
    this.hurtCoolDown = 0.3;
  }

  idle() {
    if (this.getPlayerSide() > 0) {
      this.anims.play("idle-right");
    } else {
      this.anims.play("idle-left");
    }

    this.state.set(this.states.IDLE);
  }

  walk() {
    if (!this.state.is(this.states.ATTACK) && !this.state.is(this.states.HURT)) {
      if (this.getPlayerSide() > 0) {
        this.anims.play("walk-right");
        this.pos.x += 1 * this.speed;
      } else {
        this.anims.play("walk-left");
        this.pos.x -= 1 * this.speed;
      }
      this.state.set(this.states.WALK);
    }
  }

  attack(t) {
    if (this.getPlayerSide() > 0) {
      this.anims.play("attack-right");
    } else {
      this.anims.play("attack-left");
    }

    this.state.set(this.states.ATTACK);
    return t;
  }

  hurt(t) {
    if (this.getPlayerSide() > 0) {
      this.anims.play("hurt-right");
    } else {
      this.anims.play("hurt-left");
    }
    this.state.set(this.states.HURT);
    return t;
  }

  die(t) {
    if (this.getPlayerSide() > 0) {
      this.anims.play("die-right");
    } else {
      this.anims.play("die-left");
    }
    this.state.set(this.states.DYING);
    return t;
  }

  dead() {
    if (this.getPlayerSide() > 0) {
      this.anims.play("dead-right");
    } else {
      this.anims.play("dead-left");
    }
    this.state.set(this.states.DEAD);
  }

  getPlayerSide() {
    if (this.pos.x > this.player.pos.x) return -1;
    if (this.pos.x < this.player.pos.x) return 1;
  }

  gotHit() {
    const { pos, w, h, scale } = this;
    const b = this.player;

    return pos.x < b.pos.x + b.w / b.scale.x &&
      pos.x + w / scale.x > b.pos.x &&
      pos.y < b.pos.y + b.h / b.scale.y &&
      pos.y + h / scale.y > b.pos.y;
  }

  update(dt, t) {
    super.update(dt, t);
    const attackAnimTime = 1.2;
    const deathAnimTime = 1.2;
    const hurtAnimTime = 0.1;

    if (!this.state.is(this.states.DEAD)) {

      if (this.pos.x - this.player.pos.x < 700) {
        if (this.pos.x > this.player.pos.x + this.w / 2 || this.pos.x < this.player.pos.x - this.w / 6) {
          this.walk();
        } else {
          if (!this.state.is(this.states.ATTACK) && this.attackStartTime == 0) {
            this.attackStartTime = this.attack(t);
          }
        }

        if (t >= this.attackStartTime + attackAnimTime && this.state.is(this.states.ATTACK) && this.attackStartTime > 0) {
          this.attackStartTime = 0;
          this.idle();
        }

        //Hurt

        if (this.player.hit && this.gotHit() && !this.state.is(this.states.HURT)) {

          if (t >= this.lastHurtTime + this.hurtCoolDown) {
            this.hurtStartTime = this.hurt(t);
            this.lastHurtTime = this.hurtStartTime;
            this.hp -= this.player.power;
          }

        }

        if (t >= this.hurtStartTime + hurtAnimTime && this.state.is(this.states.HURT)) {
          this.attackStartTime = 0;
          this.hurtStartTime = 0;
          this.idle();
        }


        //Death
        if (this.hp == 0) {
          if (!this.state.is(this.states.DYING)) {
            this.deathStartTime = this.die(t);
          }

          if (t >= this.deathStartTime + deathAnimTime) {
            this.dead()
          }
        }


      } else {
        this.idle();
      }
    }
    // console.log(this.state.get())

  }

}

export default Skeleton;