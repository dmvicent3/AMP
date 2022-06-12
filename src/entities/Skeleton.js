import lib from "../../lib/index.js";
import State from "../../lib/State.js";
const { TileSprite, Texture } = lib;

const texture = new Texture("res/images/skeleton/skeletonsheet.png");

class Skeleton extends TileSprite {
  constructor(player) {
    super(texture, 64, 64);
    this.scale = { x: 3, y: 3 };
    this.player = player;

    //Animations
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

    //Estados do enimigo
    this.states = {
      IDLE: 0,
      WALK: 1,
      ATTACK: 2,
      HURT: 3,
      DYING: 4,
      DEAD: 5
    };

    //Atributos do enimigo
    this.hp = 100;
    this.power = 10;
    this.speed = 0.6;
    this.dir = 1;

    //Tempos das animações
    this.attackAnimTime = 1.2;
    this.deathAnimTime = 1.2;
    this.hurtAnimTime = 0.1;
    this.attackStartTime = 0;
    this.deathStartTime = 0;
    this.hurtStartTime = 0;
    this.lastHurtTime = 0; //Ultima vez que o enimigo recebeu dano
    this.hurtCoolDown = 0.3; //Impedir o enimigo de ser atacado mais de uma vez por x segundos
    this.firstAttackDelay = 0.4; //Tempo do registo do primeiro ataque
    this.secondAttackDelay = 0.8; //Tempo do registo do segundo ataque
    this.hit = false; //Flag para saber se o enimigo atacou o player

    this.state = new State(this.states.IDLE);
    this.idle();
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
    if (!this.state.is(this.states.ATTACK) && !this.state.is(this.states.HURT) && !this.state.is(this.states.DYING)) {
      if (this.getPlayerSide() > 0) {
        this.anims.play("walk-right");
        this.dir = 1;
        this.pos.x += 1 * this.speed;
      } else {
        this.anims.play("walk-left");
        this.dir = -1;
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

  //Retornar o lado em que o player se encontra no ecrã em relação ao enimigo
  getPlayerSide() {
    if (this.pos.x > this.player.pos.x) return -1;
    if (this.pos.x < this.player.pos.x) return 1;
  }

  //Colisão da espada do player com o enimigo
  gotHit() {
    const { pos, w, h, scale } = this;
    const b = this.player;

    return pos.x < b.pos.x + b.w / b.scale.x &&
      pos.x + (w / 2) / scale.x > b.pos.x &&
      pos.y < b.pos.y + b.h / b.scale.y &&
      pos.y + h / scale.y > b.pos.y;
  }

  //Colisão da espada do enimigo com o player
  hitPlayer() {
    const { pos, w, h, scale } = this;
    const b = this.player;

    return pos.x < b.pos.x + b.w / b.scale.x &&
      pos.x + w / scale.x > b.pos.x &&
      pos.y < b.pos.y + b.h / b.scale.y &&
      pos.y + h / scale.y > b.pos.y;
  }

  update(dt, t) {
    super.update(dt, t);
    this.hit = false;
    
    if (!this.state.is(this.states.DEAD)) {
      if (this.pos.x - this.player.pos.x < 700 && !this.player.state.is(this.states.DEAD)) { //Walk
        if (this.pos.x > this.player.pos.x + this.w / 2 || this.pos.x < this.player.pos.x - this.w / 6) {
          this.walk(); // Mover enimgo na direção do player
        } else { // Se o enimigo estiver perto do player, atacar
          if (!this.state.is(this.states.ATTACK) && this.attackStartTime == 0) {
            this.attackStartTime = this.attack(t); //Iniciar ataque
          }
        }

        if (t >= this.attackStartTime + this.attackAnimTime && this.state.is(this.states.ATTACK) && this.attackStartTime > 0) {
          this.attackStartTime = 0;
          this.idle(); //Terminar ataque
        }

        if (this.state.is(this.states.ATTACK)) { //Registar primeiro e segundo ataque
          if (t >= this.attackStartTime + this.firstAttackDelay && t <= this.attackStartTime + this.secondAttackDelay - 0.1) {
            this.hit = true;
          }

          if (t >= this.attackStartTime + this.secondAttackDelay && t <= this.attackStartTime + this.attackAnimTime - 0.1) {
            this.hit = true;
          }
        }

        //Hurt
        //Se o player estiver a atacar, e houver uma colisão, muda o estado para hurt
        if (this.player.hit && this.gotHit() && !this.state.is(this.states.HURT) && this.dir !== this.player.dir) {

          if (t >= this.lastHurtTime + this.hurtCoolDown) {
            this.hurtStartTime = this.hurt(t); // Iniciar animação 
            this.lastHurtTime = this.hurtStartTime;
            this.hp -= this.player.power; // Perder hp
          }

        }

        if (t >= this.hurtStartTime + this.hurtAnimTime && this.state.is(this.states.HURT)) {
          this.attackStartTime = 0;
          this.hurtStartTime = 0;
          this.idle(); // Terminar animação
        }


        //Death
        if (this.hp <= 0) {
          if (!this.state.is(this.states.DYING)) {
            this.deathStartTime = this.die(t); //Começar a animação de morrer
          }

          if (t >= this.deathStartTime + this.deathAnimTime) {
            this.dead(); //Terminar a animação de morrer
          }
        }


        //Hurt player

        if (this.hit && this.hitPlayer()) {
          //Se o enimigo estiver a atacar o player, e houver uma colisão, chamar o metodo de dano do player
          this.player.gotHit(this.power, t);
        }

      } else {
        this.idle();
      }
    } 
  }

}

export default Skeleton;