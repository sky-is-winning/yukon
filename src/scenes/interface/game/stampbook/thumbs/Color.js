
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../../base/BaseContainer";
import Zone from "../../../../components/Zone";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Color extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // background
        const background = scene.add.image(10, 8, "_MISSING");
        background.visible = false;
        this.add(background);

        // zone
        const zone = scene.add.rectangle(0, 0, 115, 80);
        zone.isFilled = true;
        zone.fillColor = 1234926;
        zone.fillAlpha = 0.3;
        this.add(zone);

        // editor_selectors
        const editor_selectors = scene.add.image(0, 0, "stampbook", "editor-selectors");
        editor_selectors.setOrigin(0.5038759689922481, 0.5);
        this.add(editor_selectors);

        // zone (components)
        const zoneZone = new Zone(zone);
        zoneZone.hoverCallback = () => this.parentContainer.onZoneOver(this.id, "color");
        zoneZone.hoverOutCallback = () => this.parentContainer.onZoneOut(this.id, "color");
        zoneZone.callback = () => { if (!this.rootModule) this.interface.stampbook.setColor(this.id) };;

        this.background = background;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Image} */
    background;
    /** @type {boolean} */
    rootModule = false;

    /* START-USER-CODE */

    setId(id) {
        this.id = id;
        this.background.visible = false;
        this.interface.stampbook.loader.loadColorThumb(id, () => {
            this.background.setTexture(`stampbook-assets/color-thumb/${id}`);
            this.background.visible = true;
        });
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
