
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../../base/BaseContainer";
import Zone from "../../../../components/Zone";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Pattern extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // background
        const background = scene.add.image(10, 8, "_MISSING");
        background.visible = false;
        this.add(background);

        // remove_pattern_shadow
        const remove_pattern_shadow = scene.add.rectangle(0, 1, 145, 5);
        remove_pattern_shadow.angle = 34;
        remove_pattern_shadow.isFilled = true;
        remove_pattern_shadow.fillColor = 0;
        remove_pattern_shadow.fillAlpha = 0.5;
        this.add(remove_pattern_shadow);

        // remove_pattern
        const remove_pattern = scene.add.rectangle(0, 0, 145, 5);
        remove_pattern.angle = 34;
        remove_pattern.isFilled = true;
        this.add(remove_pattern);

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
        zoneZone.hoverCallback = () => this.parentContainer.onZoneOver(this.id, "pattern");
        zoneZone.hoverOutCallback = () => this.parentContainer.onZoneOut(this.id, "pattern");
        zoneZone.callback = () => { if (!this.rootModule) this.interface.stampbook.setPattern(this.id) };;

        this.background = background;
        this.remove_pattern_shadow = remove_pattern_shadow;
        this.remove_pattern = remove_pattern;

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Image} */
    background;
    /** @type {Phaser.GameObjects.Rectangle} */
    remove_pattern_shadow;
    /** @type {Phaser.GameObjects.Rectangle} */
    remove_pattern;
    /** @type {boolean} */
    rootModule = false;

    /* START-USER-CODE */

    setId(id) {
        if (!this.hasListeners) {
            this.background.visible = false;
            this.interface.events.on("updateStampbookColor", (color) => {
                this.interface.stampbook.loader.loadPatternThumb(`${color}_${this.id}`, () => {
                    this.background.setTexture(`stampbook-assets/pattern-thumb/${color}_${this.id}`);
                    this.background.visible = true;
                });
            });
            this.interface.events.on("updateStampbookPattern", (pattern) => {
                this.remove_pattern.visible = pattern == id && !this.rootModule;
                this.remove_pattern_shadow.visible = this.remove_pattern.visible;
            });
            this.hasListeners = true;
        }
        this.id = id;
        this.background.visible = false;
        this.interface.stampbook.loader.loadPatternThumb(`${this.interface.stampbook.playerdata.color}_${id}`, () => {
            this.background.setTexture(`stampbook-assets/pattern-thumb/${this.interface.stampbook.playerdata.color}_${id}`);
            this.background.visible = true;
        });
        this.remove_pattern.visible = this.interface.stampbook.playerdata.pattern == id && !this.rootModule;
        this.remove_pattern_shadow.visible = this.remove_pattern.visible;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
