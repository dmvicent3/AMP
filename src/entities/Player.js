import lib from "../../lib/index.js";
import State from "../../lib/State.js";

const { TileSprite, Texture } = lib;

const texture = new Texture("res/images/player/spritesheet2.png");

class Player extends TileSprite {
  constructor(controls) {
    super(texture, 128, 64);
    this.controls = controls;
    this.scale = { x: 2, y: 2 };

    //Animations
    const { anims } = this;
    anims.add("idle-right", [{ x: 0, y: 13 }, { x: 1, y: 13 }, { x: 0, y: 14 }, { x: 1, y: 14 },
    { x: 0, y: 15 }, { x: 1, y: 15 }, { x: 0, y: 16 }, { x: 1, y: 16 }], 0.1);

    anims.add("walk-right", [{ x: 0, y: 21 }, { x: 1, y: 21 }, { x: 0, y: 22 }, { x: 1, y: 22 },
    { x: 0, y: 23 }, { x: 1, y: 23 }, { x: 0, y: 24 }, { x: 1, y: 24 }], 0.1);

    anims.add("attack-right", [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
    { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], 0.1);

    anims.add("die-right", [{ x: 0, y: 5 }, { x: 1, y: 5 }, { x: 0, y: 6 }, { x: 1, y: 6 }], 0.1);

    anims.add("idle-left", [{ x: 7, y: 25 + 13 }, { x: 6, y: 25 + 13 }, { x: 7, y: 25 + 14 }, { x: 6, y: 25 + 14 },
    { x: 7, y: 25 + 15 }, { x: 6, y: 25 + 15 }, { x: 7, y: 25 + 16 }, { x: 6, y: 25 + 16 }], 0.1);

    anims.add("walk-left", [{ x: 7, y: 25 + 21 }, { x: 6, y: 25 + 21 }, { x: 7, y: 25 + 22 }, { x: 6, y: 25 + 22 },
    { x: 7, y: 25 + 23 }, { x: 6, y: 25 + 23 }, { x: 7, y: 25 + 24 }, { x: 6, y: 25 + 24 }], 0.1);

    anims.add("attack-left", [{ x: 7, y: 25 }, { x: 6, y: 25 }, { x: 5, y: 25 }, { x: 4, y: 25 },
    { x: 3, y: 25 }, { x: 2, y: 25 }, { x: 1, y: 25 }, { x: 0, y: 25 }, { x: 7, y: 25 + 1 }, { x: 6, y: 25 + 1 }], 0.1);

    anims.add("die-left", [{ x: 7, y: 25 + 5 }, { x: 6, y: 25 + 5 }, { x: 7, y: 25 + 6 }, { x: 6, y: 25 + 6 }], 0.1);

    anims.add("hurt-right", [{ x: 0, y: 11 }], 0.1);
    anims.add("hurt-left", [{ x: 7, y: 25 + 11 },], 0.1);

    anims.add("dead-right", [{ x: 1, y: 6 }, { x: 1, y: 6 }], 0.1);
    anims.add("dead-left", [{ x: 6, y: 25 + 6 }, { x: 6, y: 25 + 6 }], 0.1);

    anims.add("drink-right", [{ x: 0, y: 7 }, { x: 1, y: 7 }, { x: 0, y: 8 }, { x: 1, y: 8 },
    { x: 0, y: 9 }, { x: 1, y: 9 }, { x: 0, y: 10 }, { x: 1, y: 10 }], 0.1);

    anims.add("drink-left", [{ x: 7, y: 25 + 7 }, { x: 6, y: 25 + 7 }, { x: 7, y: 25 + 8 }, { x: 6, y: 25 + 8 },
    { x: 7, y: 25 + 9 }, { x: 6, y: 25 + 9 }, { x: 7, y: 25 + 10 }, { x: 6, y: 25 + 10 }], 0.1);

    //Estados do Player
    this.states = {
      IDLE: 0,
      WALK: 1,
      ATTACK: 2,
      HURT: 3,
      DRINK: 4,
      DYING: 5,
      DEAD: 6
    };

    //Atributos do Player
    this.hp = 100;
    this.potions = 1;
    this.power = 50;
    this.speed = 1;
    this.dir = 1;

    //Tempos das animações
    this.attackAnimTime = 1;
    this.drinkAnimTime = 0.8;
    this.deathAnimTime = 0.3;
    this.hurtAnimTime = 0.1;
    this.deathStartTime = 0;
    this.hurtStartTime = 0;
    this.drinkStartTime = 0;
    this.lastHurtTime = 0; //Ultima vez que o player recebeu dano
    this.hurtCoolDown = 0.3; //Impedir o jogador de ser atacado mais de uma vez por x segundos
    this.firstAttackDelay = 0.4; //Tempo do registo do primeiro ataque
    this.secondAttackDelay = 0.6; //Tempo do registo do segundo ataque
    this.hit = false; //Flag para saber se o jogador atacou um inimigo

    this.state = new State(this.states.IDLE);
    this.idle();
  }

  idle(dir, forced = false) {
    if (this.state.get() <= 1  || forced) {
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

  hurt(t) {
    if (this.dir > 0) {
      this.anims.play("hurt-right");
    } else {
      this.anims.play("hurt-left");
    }
    this.state.set(this.states.HURT);
    return t;
  }

  walk(dir) {
    if (this.state.get() <= 1) {
      if (dir > 0) {
        this.anims.play("walk-right");
      } else {
        this.anims.play("walk-left");
      }
      this.state.set(this.states.WALK);
    }
  }

  die(t) {
    if (this.dir > 0) {
      this.anims.play("die-right");
    } else {
      this.anims.play("die-left");
    }
    this.state.set(this.states.DYING);
    return t;
  }

  dead() {
    if (this.dir > 0) {
      this.anims.play("dead-right");
    } else {
      this.anims.play("dead-left");
    }
    this.state.set(this.states.DEAD);
  }

  gotHit(damage, t) {
    if (!this.state.is(this.states.HURT) && !this.state.is(this.states.DYING) && !this.state.is(this.states.DEAD)) {
      if (t >= this.lastHurtTime + this.hurtCoolDown) {
        this.hurtStartTime = this.hurt(t);
        this.lastHurtTime = this.hurtStartTime;
        this.hp -= damage;
      }
    }
  }

  drinkPotion(t) {
    if (this.state.get() <= 1) {
      if (this.dir > 0) {
        this.anims.play("drink-right");
      } else {
        this.anims.play("drink-left");
      }
      this.state.set(this.states.DRINK);
      return t;
    }
  }

  update(dt, t) {
    super.update(dt, t);
    const { controls } = this;
    const { x, action, drink } = controls;
    this.hit = false;

    if (!this.state.is(this.states.DEAD)) {

      //Walk
      if (x) {
        this.dir = x;
        this.walk(this.dir);
      } else {
        this.idle(this.dir);
      }
      
      // Drink Potion
      if(drink && this.potions > 0 && !this.state.is(this.states.DRINK)){
        this.drinkStartTime = this.drinkPotion(t); //Inicia a animação de beber poção
      }

      if(t >= this.drinkAnimTime + this.drinkStartTime && this.state.is(this.states.DRINK)){
        this.potions--; //Remove uma poção do inventário
        
        this.hp= this.hp + 60 > 100 ? 100 : this.hp + 60 ; //Aumenta o HP do jogador
        this.idle(this.dir, true); //Terminar animação;
      }


      //Attack
      if (action) { // Começar ataque
        if (!this.state.is(this.states.ATTACK)) {
          this.attackStartTime = this.attack(this.dir, t);
        }
      }

      if (this.state.is(this.states.ATTACK)) { //Registar primeiro e segundo ataque
        if (t >= this.attackStartTime + this.firstAttackDelay && t <= this.attackStartTime + this.secondAttackDelay - 0.1) {
          this.hit = true;
        }

        if (t >= this.attackStartTime + this.secondAttackDelay && t <= this.attackStartTime + this.attackAnimTime - 0.1) {
          this.hit = true;
        }
      }

      // Terminar ataque
      if (t >= this.attackStartTime + this.attackAnimTime && this.state.is(this.states.ATTACK) && this.attackStartTime > 0) {
        this.state.set(this.states.WALK);
      }

      //Hurt
      // Por motivos de simplificação, para o player receber dano, o metodo gotHit(),
      // que muda o estado do player para "hurt", é chamado na classe do inimigo.
      if (t >= this.hurtStartTime + this.hurtAnimTime && this.state.is(this.states.HURT)) {
        this.attackStartTime = 0; //Cancelar a animação de ataque se o player receber dano
        this.hurtStartTime = 0;
        this.idle(this.dir, true);
      }

      //Death
      if (this.hp <= 0) {
        if (!this.state.is(this.states.DYING)) {
          this.deathStartTime = this.die(t); //Começar a animação de morrer
        }

        if (t >= this.deathStartTime + this.deathAnimTime && !this.state.is(this.states.DEAD)) {
          this.dead(); //Terminar a animação de morrer
        }
      }

      this.state.update(dt);
    }
  }
}

export default Player;