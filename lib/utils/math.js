function rand(min, max) {
    // return random integer
    return Math.floor(randf(min, max));
}

function randf(min, max) {
    // return random float
    if (max == null) {
        max = min || 1;
        min = 0;
    }

    return Math.random() * (max - min) + min;
}

function randOneIn(max = 2) {
    return rand(0, max) === 0;
}

function randOneFrom(items) {
    return items[rand(items.length)];
}

function clamp(x, min, max) {
    return Math.max(min, Math.min(x, max));
}

function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);
}

export default {
    rand,
    randf,
    randOneFrom,
    randOneIn,
    clamp,
    distance
};