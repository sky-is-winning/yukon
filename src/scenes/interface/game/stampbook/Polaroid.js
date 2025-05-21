const FRAMES = [
    "background",
    "body",
    "bodyBG",
    "bodyFG",
    "foreground"
]

/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Polaroid extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // background
        const background = scene.add.image(0, 0, "_MISSING");
        background.visible = false;
        this.add(background);

        // bodyBG
        const bodyBG = scene.add.image(0, 0, "_MISSING");
        bodyBG.visible = false;
        this.add(bodyBG);

        // body
        const body = scene.add.image(0, 0, "_MISSING");
        body.visible = false;
        this.add(body);

        // bodyFG
        const bodyFG = scene.add.image(0, 0, "_MISSING");
        bodyFG.visible = false;
        this.add(bodyFG);

        // foreground
        const foreground = scene.add.image(0, 0, "_MISSING");
        foreground.visible = false;
        this.add(foreground);

        // spinner
        const spinner = scene.add.image(0, 0, "main", "spinner");
        spinner.setOrigin(0.5151515151515151, 0.5172413793103449);
        this.add(spinner);

        this.background = background;
        this.bodyBG = bodyBG;
        this.body = body;
        this.bodyFG = bodyFG;
        this.foreground = foreground;
        this.spinner = spinner;

        /* START-USER-CTR-CODE */
        this.tween = this.scene.tweens.add({
            targets: this.spinner,
            angle: { from: 0, to: 180 },
            duration: 900,
            repeat: -1,
            ease: 'Cubic'
        });
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Image} */
    background;
    /** @type {Phaser.GameObjects.Image} */
    bodyBG;
    /** @type {Phaser.GameObjects.Image} */
    body;
    /** @type {Phaser.GameObjects.Image} */
    bodyFG;
    /** @type {Phaser.GameObjects.Image} */
    foreground;
    /** @type {Phaser.GameObjects.Image} */
    spinner;

    /* START-USER-CODE */

    onLoad(id) {
        if (!this.active) return;

        FRAMES.forEach(frame => {
            let frames = Object.keys(this.scene.textures.get(`stampbook-assets/polaroids/${id}`).frames)
            if (frames.includes(frame)) {
                this[frame].setTexture(`stampbook-assets/polaroids/${id}`, frame);
                this[frame].visible = true;
            } else {
                this[frame].setTexture("_MISSING");
                this[frame].visible = false;
            }
        });

        this.spinner.visible = false;
    }

    setPolaroid(id) {
        this.id = id;
        this.spinner.visible = true;

        FRAMES.forEach(frame => {
            this[frame].setTexture("_MISSING");
            this[frame].visible = false;
        });

        this.interface.stampbook.loader.loadPolaroid(this.id, () => {
            this.onLoad(this.id);
        });

        this.body.tint = this.world.getColor(this.interface.stampbook.playerdata.penguinColor);

        this.parentContainer.visible = true;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
