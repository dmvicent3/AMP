class Camera extends Container {
    constructor(subject, viewport, worldSize = viewport) {
        super();
        this.w = viewport.w;
        this.h = viewport.h;
        this.worldSize = worldSize;
        this.setSubject(subject);
    }

    setSubject(e) { }

    focus() { }

    update(dt, t) { }

}

export default Camera;