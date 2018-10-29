import { game, Sprite } from "./sgc/sgc.js";

game.setBackground("Cemetery.png");

class Support extends Sprite {
    constructor(x, y, image) {
        super();
        this.x = x;
        this.y = y;
        this.setImage(image)
    }
}

class tile extends Support {
    constructor(x, y, image) {
        super(x, y, image);
        this.x = x;
        this.y = y;
        this.setImage(image);
        this.accelerateOnBounce = false;
    }
}

let start = new tile(48, 300, "tileBottomRight.png");
new tile(0, 300, "tileBottomRight.png");
new tile(game.displayWidth - 48 * 2, 300, "tileBottomCenter.png");
new tile(game.displayWidth - 48, 300, "tileBottomCenter.png");



class Slider extends tile {
    constructor(x, y, angle, speed) {
        super(x, y, "tileTopCenter.png");
        this.angle = angle;
        this.speed = speed;
    }

}

new Slider(100, 320, 270, 48);
new Slider(150, 300, 90, 48);
new Slider(225, 250, 270, 48);
new Slider(300, 300, 180, 48);
new Slider(game.displayWidth - 48 * 2, 305, 0, 48);

class Princess extends Sprite {
    constructor() {
        super();
        this.setImage("ann.png");
        this.x = 48;
        this.y = 200;
        this.speed = 20;
        this.speedwhenWalking = 200;
        this.defineAnimation("left", 9, 11);
        this.defineAnimation("right", 3, 5);
        this.isFalling = false;
    }
    handleLeftArrowKey() {
        this.playAnimation("left");
        this.angle = 180;
        this.speed = this.speedwhenWalking;
    }
    handleRightArrowKey() {
        this.playAnimation("right");
        this.angle = 0;
        this.speed = this.speedwhenWalking;
    }
    handleGameLoop() {
        if (this.angle === 0 && this.speed > 0) {
            this.playAnimation("right");
        }
        if (this.angle === 180 && this.speed > 0) {
            this.playAnimation("left");
        }
        this.x = Math.max(5, this.x);
        this.isFalling = false;
        let supports = game.getSpritesOverlapping(this.x, this.y + this.height, this.width, 1, Support);
        if (supports.length === 0 || supports[0].y < this.y + this.height) {
            this.isFalling = true; // she is falling so...
            this.y = this.y + 4;
        }
    }
    handleSpacebar() {
        if (!this.isFalling) {
            this.y = this.y - 1.25 * this.height;
        }
    }
    handleBoundaryContact() {
        game.end('Princess Ann has drowned.\n\nBetter luck next time.')
    }
}


let ann = new Princess;

class Block extends Sprite {
    constructor(){
        super();
        this.setImage("Crate.png");
        this.x =48*2;
        this.y =200;
        this.accelerateOnBounce = false;
    }
}