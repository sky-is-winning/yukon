
// You can write more code here

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

        // body
        const body = scene.add.image(0, 0, "_MISSING");
        body.visible = false;
        this.add(body);

        // bodyBG
        const bodyBG = scene.add.image(0, 0, "_MISSING");
        bodyBG.visible = false;
        this.add(bodyBG);

        // bodyFG
        const bodyFG = scene.add.image(0, 0, "_MISSING");
        bodyFG.visible = false;
        this.add(bodyFG);

        // foreground
        const foreground = scene.add.image(0, 0, "_MISSING");
        foreground.visible = false;
        this.add(foreground);

        this.background = background;
        this.body = body;
        this.bodyBG = bodyBG;
        this.bodyFG = bodyFG;
        this.foreground = foreground;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Image} */
    background;
    /** @type {Phaser.GameObjects.Image} */
    body;
    /** @type {Phaser.GameObjects.Image} */
    bodyBG;
    /** @type {Phaser.GameObjects.Image} */
    bodyFG;
    /** @type {Phaser.GameObjects.Image} */
    foreground;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
