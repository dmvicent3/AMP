import math from "./math.js";

//Helper function para calcular a distancia de uma entity a um ponto, como por exemplo do player.

function center(entity) {
    const { pos, w, h } = entity;
    return {
        x: pos.x + w / 2,
        y: pos.y + h / 2
    };
}

function distance(a, b) {
    return math.distance(center(a), center(b));
}

export default {
    center, distance
}