/* START OF COMPILED CODE */

import BaseContainer from "../../../../base/BaseContainer";
import Zone from "../../../../components/Zone";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Icon extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // background
        const background = scene.add.image(10, 8, "_MISSING");
        background.visible = false;
        this.add(background);

        // foreground
        const foreground = scene.add.image(0, 0, "_MISSING");
        foreground.visible = false;
        this.add(foreground);

        // zone
        const zone = scene.add.rectangle(0, 0, 115, 80);
        zone.isFilled = true;
        zone.fillColor = 1234926;
        zone.fillAlpha = 0.3;
        this.add(zone);

        // zone (components)
        const zoneZone = new Zone(zone);
        zoneZone.hoverCallback = () => this.parentContainer.onZoneOver(this.id, "icon");
        zoneZone.hoverOutCallback = () => this.parentContainer.onZoneOut(this.id, "icon");
        zoneZone.callback = () => { if (!this.rootModule) this.interface.stampbook.updateIcon(this.id) };;

        this.background = background;
        this.foreground = foreground;

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Image} */
    background;
    /** @type {Phaser.GameObjects.Image} */
    foreground;
    /** @type {boolean} */
    rootModule = false;

    /* START-USER-CODE */

    setId(id) {
        if (!this.hasListeners) {
            this.background.visible = false;
            this.interface.events.on("updateStampbookColor", (color) => {
                this.interface.stampbook.loader.loadColorThumb(color, () => {
                    this.background.setTexture(`stampbook-assets/color-thumb/${color}`);
                    this.background.visible = true;
                });
            });
            this.foreground.visible = false;
            this.interface.events.on("updateStampbookHighlight", (highlight) => {
                this.interface.stampbook.loader.loadClaspThumb(`${this.id}_${highlight}`, () => {
                    this.foreground.setTexture(`stampbook-assets/clasp-thumb/${this.id}_${highlight}`);
                    this.foreground.visible = true;
                });
            });
            this.hasListeners = true;
        }
        this.id = id;
        this.background.visible = false;
        this.interface.stampbook.loader.loadColorThumb(this.interface.stampbook.playerdata.color, () => {
            this.background.setTexture(`stampbook-assets/color-thumb/${this.interface.stampbook.playerdata.color}`);
            this.background.visible = true;
        });
        this.foreground.visible = false;
        this.interface.stampbook.loader.loadClaspThumb(`${id}_${this.interface.stampbook.playerdata.highlight}`, () => {
            this.foreground.setTexture(`stampbook-assets/clasp-thumb/${id}_${this.interface.stampbook.playerdata.highlight}`);
            this.foreground.visible = true;
        });
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
