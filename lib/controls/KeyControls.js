class KeyControls {
    constructor() {
        this.keys = {};
        this.any = false;
        // Bind event handlers
        document.addEventListener("keydown", e => {
            if ([37, 38, 39, 40, 32, 88].indexOf(e.which) >= 0) {
                e.preventDefault();
            }
            this.keys[e.which] = true;
            this.any = true;
        }, false);

        document.addEventListener("keyup", e => {
            this.keys[e.which] = false;
            this.any = false;
        }, false);
    }

    key(key, value) {
        if (value !== undefined) {
            this.keys[key] = value;
        }
        return this.keys[key];
    }

    reset() {
        for (let key in this.keys) {
            this.keys[key] = false;
        }
    }

    // Handle key actions
    get action() {
        return this.keys[32]; //Spacebar
    }

    get drink(){
        return this.keys[88];  // X
    }

    get x() {
        if (this.keys[37] || this.keys[65]) { //A or leftarrow
            return -1;
        }
        if (this.keys[39] || this.keys[68]) { //D or rightarrow
            return 1;
        }
        return 0;
    }

    get y() {
        if (this.keys[38] || this.keys[87]) { // W or uparrow
            return -1;
        }
        if (this.keys[40] || this.keys[83]) { //S or downarrow
            return 1;
        }
        return 0;
    }
}

export default KeyControls;