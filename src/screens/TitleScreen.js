import lib from "../../lib/index.js";
const { Container, Text } = lib;
import ForestLevel from "../ForestLevel.js";

class TitleScreen extends Container {
    constructor(game, controls, onStart) {
        super();
        this.onStart = onStart;
        this.controls = controls;
        controls.reset();

        const drawText = (msg, pos, size = 24) => {
            const font = `${size}pt 'VT323', monospace`;
            const text = new Text(msg, { font: font, fill: "#fff", align: "center" });
            text.pos = pos;
            //text.anchor.x = 
            return this.add(text);
        };

        this.add(new ForestLevel(game.w, game.h, { x:0, y: 0 }, null));
        this.title = drawText("VIDEOGAME", { x: game.w/2, y: 100 }, 40);
        this.begin = drawText("Press any key to begin", { x: game.w/2, y: game.h/1.5 });
    }

    update(dt, t) {
        super.update(dt, t);
        const { title, controls } = this;

        if (controls.any) {
            this.onStart();
        }
    }
}

export default TitleScreen;
