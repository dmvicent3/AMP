import lib from "../../lib/index.js";
const { Container, Text } = lib;
import ForestLevel from "../ForestLevel.js";

class GameOverScreen extends Container {
  constructor(game, controls, onStart) {
    super();

    this.onStart = onStart;
    this.controls = controls;
    controls.reset();

    const drawText = (msg, pos, size = 24) => {
      const font = `${size}pt 'VT323', monospace`;
      const text = new Text(msg, { font: font, fill: "#111", align: "center" });
      text.pos = pos;
      this.add(text);
    };

    this.add(new ForestLevel(game.w, game.h));


    drawText("GAME OVER", { x: game.w / 2, y: 120 }, 44);
    drawText("Press any key to return", { x: game.w / 2, y: 200 });
    this.life = 2;
  }

  update(dt, t) {
    super.update(dt, t);
    this.life -= dt;

    if (this.life < 0) {
      if (this.controls.any) {
        this.onStart();
      }
    }

  }
}

export default GameOverScreen;