
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
import Zone from "../../../components/Zone";
/* START-USER-IMPORTS */
import Color from "./thumbs/Color";
import Highlight from "./thumbs/Highlight";
import Icon from "./thumbs/Icon";
import Pattern from "./thumbs/Pattern";
/* END-USER-IMPORTS */

export default class Selectors extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // selector_nineslice
        const selector_nineslice = scene.add.nineslice(0, 0, "stampbook", "selector-nineslice", 280, 300, 25, 25, 25, 25);
        selector_nineslice.setOrigin(0.5, 0.5021097046413502);
        this.add(selector_nineslice);

        // selected_nineslice
        const selected_nineslice = scene.add.nineslice(0, 0, "stampbook", "selected-nineslice", 280, 300, 25, 25, 25, 25);
        selected_nineslice.visible = false;
        this.add(selected_nineslice);

        // seperators_container
        const seperators_container = scene.add.container(0, 0);
        this.add(seperators_container);

        // zone
        const zone = scene.add.rectangle(0, 0, 280, 300);
        zone.visible = false;
        zone.isFilled = true;
        zone.fillColor = 1234926;
        zone.fillAlpha = 0.3;
        this.add(zone);

        // selector_outline_nineslice
        const selector_outline_nineslice = scene.add.nineslice(0, 0, "stampbook", "selector-outline-nineslice", 280, 300, 25, 25, 25, 25);
        selector_outline_nineslice.setOrigin(0.5, 0.5021097046413502);
        this.add(selector_outline_nineslice);

        // zone (components)
        const zoneZone = new Zone(zone);
        zoneZone.hoverCallback = () => this.preventClose(this);
        zoneZone.hoverOutCallback = () => this.unpreventClose(this);

        this.selector_nineslice = selector_nineslice;
        this.selected_nineslice = selected_nineslice;
        this.seperators_container = seperators_container;
        this.zone = zone;
        this.selector_outline_nineslice = selector_outline_nineslice;

        /* START-USER-CTR-CODE */
        this.preventingClose = [];
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.NineSlice} */
    selector_nineslice;
    /** @type {Phaser.GameObjects.NineSlice} */
    selected_nineslice;
    /** @type {Phaser.GameObjects.Container} */
    seperators_container;
    /** @type {Phaser.GameObjects.Rectangle} */
    zone;
    /** @type {Phaser.GameObjects.NineSlice} */
    selector_outline_nineslice;
    /** @type {string} */
    selectorType = "Colors";

    /* START-USER-CODE */

    init() {
        this.config;
        this.spriteType;
        if (!this.anchorX) {
            this.anchorX = this.x;
        }
        this.x = this.anchorX;
        switch (this.selectorType) {
            case "Colors":
                this.config = this.crumbs.cover.color;
                this.spriteType = Color;
                break;
            case "Patterns":
                this.config = this.crumbs.cover.pattern;
                this.spriteType = Pattern;
                break;
            case "Highlights":
                this.config = this.crumbs.cover.color_highlight[this.interface.stampbook.playerdata.color];
                this.spriteType = Highlight;
                break;
            case "Icons":
                this.config = this.crumbs.cover.clasp;
                this.spriteType = Icon;
                break;
        }
        this.config = [...this.config].reverse();
        this.masks = {};
        this.sprites = [];

        const evenItems = this.config.length % 2 === 0;
        const rows = evenItems ? this.config.length / 2 : this.config.length;
        const middleRowY = rows % 2 === 0 ? -50 : 0;
        const middleRow = Math.floor(rows / 2);
        const width = evenItems ? 280 : 140
        for (let i = 0; i < this.config.length; i++) {
            const row = evenItems ? Math.floor(i / 2) : i;
            const x = evenItems ? (i % 2 === 0 ? 70 : -70) : 0;
            const y = middleRowY - ((row - middleRow) * 100);
            const sprite = new this.spriteType(this.scene, x, y);
            sprite.scale = 0.8;
            this.add(sprite);
            this.sprites.push(sprite);
            sprite.setId(this.config[i]);
        }

        for (let i = 0; i < rows - 1; i++) {
            const separator = this.scene.add.rectangle(0, -50 + (i * 100), width, 3, 0xAAAAAA);
            this.seperators_container.add(separator);
        }

        if (evenItems) {
            const separator = this.scene.add.rectangle(0, 0, 3, rows * 100, 0xAAAAAA);
            this.seperators_container.add(separator);
        }

        this.selector_nineslice.setSize(width, rows * 100);
        this.selected_nineslice.setSize(width, rows * 100);
        this.selector_outline_nineslice.setSize(width, rows * 100);
        this.zone.setSize(width + 30, rows * 100 + 30);

        if (!evenItems) {
            this.x -= 70;
        }
    }

    onZoneOver(id) {
        if (!this.masksInit) {
            this.initMasks();
        }

        this.selected_nineslice.visible = true;
        this.selected_nineslice.setMask(this.masks[id]);

        this.preventClose(id);
    }

    onZoneOut(id) {
        this.selected_nineslice.visible = false;

        this.unpreventClose(id);
    }

    initMasks() {
        this.masksInit = true;
        for (let i = 0; i < this.config.length; i++) {
            const matrix = this.sprites[i].getWorldTransformMatrix();
            const graphics = this.scene.make.graphics();
            graphics.fillStyle(this.crumbs.cover.highlight[this.config[i]], 1);
            graphics.fillRect(matrix.getX(0, 0) - 70, matrix.getY(0, 0) - 50, 140, 100);
            this.masks[this.config[i]] = graphics.createGeometryMask();
        }
    }

    preventClose(a) {
        if (this.preventingClose.includes(a)) {
            return;
        }

        this.preventingClose.push(a);
    }

    unpreventClose(a) {
        this.preventingClose = this.preventingClose.filter(c => c !== a);

        this.closeTimeout = setTimeout(() => {
            if (this.preventingClose.length === 0) {
                this.visible = false;
            }
        }, 300);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
