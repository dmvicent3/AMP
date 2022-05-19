import lib from "../../lib/index.js";
const { Container, Text } = lib;


class LogoScreen extends Container {
  constructor(game, onStart) {
    super();
    this.onStart = onStart;
    this.life = 2;
    const font = `${24}pt 'VT323', monospace`;
    const logo = this.logo = this.add(new Text("VIDEOGAME", { font: font, fill: "#111", align: "center" }));
    logo.pos = { x: game.w/2, y: game.h/2 };
  }

  update(dt, t) {
    super.update(dt, t);
    this.life -= dt;

    const { logo, life } = this;
    if (life < 0) {
      this.onStart();
    }
    if (life < 0.4) {
      logo.pos.y -= 1000 * dt;
    }
  }
}

export default LogoScreen;