
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
import SimpleButton from "../../../components/SimpleButton";
import StampHover from "./StampHover";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Stamp extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // stamp
        const stamp = scene.add.image(0, 0, "main", "stampprompt/5_1");
        stamp.visible = false;
        this.add(stamp);

        // blocker
        const blocker = scene.add.image(0, 0, "main", "stampprompt/5_1");
        blocker.visible = false;
        blocker.alpha = 0.6;
        blocker.alphaTopLeft = 0.6;
        blocker.alphaTopRight = 0.6;
        blocker.alphaBottomLeft = 0.6;
        blocker.alphaBottomRight = 0.6;
        blocker.tintFill = true;
        this.add(blocker);

        // spinner
        const spinner = scene.add.image(0, 0, "main", "spinner");
        spinner.setOrigin(0.5151515151515151, 0.5172413793103449);
        this.add(spinner);

        // stampHover
        const stampHover = new StampHover(scene, -140, -175);
        stampHover.scaleX = 1;
        stampHover.scaleY = 1;
        stampHover.visible = false;
        this.add(stampHover);

        // stamp (components)
        const stampSimpleButton = new SimpleButton(stamp);
        stampSimpleButton.hoverCallback = () => { this.stampHover.visible = true };
        stampSimpleButton.hoverOutCallback = () => { this.stampHover.visible = false };

        this.stamp = stamp;
        this.blocker = blocker;
        this.spinner = spinner;
        this.stampHover = stampHover;

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
    stamp;
    /** @type {Phaser.GameObjects.Image} */
    blocker;
    /** @type {Phaser.GameObjects.Image} */
    spinner;
    /** @type {StampHover} */
    stampHover;

    /* START-USER-CODE */

    onLoad(id, scale = 2) {
        if (!this.active) return;
        this.stamp.setTexture(`stampbook-assets/stamps/@${scale}x/${id}`);
        this.blocker.setTexture(`stampbook-assets/stamps/@${scale}x/${id}`);
        this.stamp.visible = true;
        this.blocker.visible = !this.scene.world.client.stamps.includes(id);

        this.spinner.visible = false;
    }

    setStamp(stamp) {
        this.id = stamp.stamp_id;
        this.spinner.visible = true;
        this.interface.stampbook.loader.loadStamp(this.id, () => {
            this.onLoad(this.id);
        });
        this.stampHover.setStamp(stamp);
    }

    setAward(stamp) {
        this.id = stamp.stamp_id;
        this.spinner.visible = true;
        this.interface.stampbook.loader.loadAward(this.id, () => {
            this.onLoad(this.id);
        });
        this.stampHover.setStamp(stamp);
    }

    setCoverStamp(stamp, scale = 1) {
        this.id = stamp;
        this.spinner.visible = true;
        this.interface.stampbook.loader.loadStamp(this.id, () => {
            this.onLoad(this.id, scale);
        }, scale);
        this.stampHover = {}
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
