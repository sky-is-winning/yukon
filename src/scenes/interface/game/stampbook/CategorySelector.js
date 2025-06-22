
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
import Zone from "../../../components/Zone";
/* START-USER-IMPORTS */
import StampCategoryDropdownItem from "./thumbs/StampCategoryDropdownItem";
/* END-USER-IMPORTS */

export default class CategorySelector extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? -0.000019750649542533928, y ?? -0.00003439855461640287);

        // selector_nineslice
        const selector_nineslice = scene.add.nineslice(155.0000197567554, 165.00003434347764, "stampbook", "selector-nineslice", 280, 300, 25, 25, 25, 25);
        selector_nineslice.setOrigin(0.5, 0.5021097046413502);
        this.add(selector_nineslice);

        // selected_nineslice
        const selected_nineslice = scene.add.nineslice(155.0000197567554, 165.00003434347764, "stampbook", "selected-nineslice", 280, 300, 25, 25, 25, 25);
        selected_nineslice.visible = false;
        this.add(selected_nineslice);

        // zone
        const zone = scene.add.rectangle(155.0000197567554, 165.00003434347764, 310, 330);
        zone.visible = false;
        zone.isFilled = true;
        zone.fillColor = 1234926;
        zone.fillAlpha = 0.3;
        this.add(zone);

        // zone (components)
        const zoneZone = new Zone(zone);
        zoneZone.hoverCallback = () => this.preventClose(this);
        zoneZone.hoverOutCallback = () => this.unpreventClose(this);

        this.selector_nineslice = selector_nineslice;
        this.selected_nineslice = selected_nineslice;
        this.zone = zone;

        /* START-USER-CTR-CODE */
        this.preventingClose = [];
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.NineSlice} */
    selector_nineslice;
    /** @type {Phaser.GameObjects.NineSlice} */
    selected_nineslice;
    /** @type {Phaser.GameObjects.Rectangle} */
    zone;

    /* START-USER-CODE */

    init() {
        if (!this.anchorX) {
            this.anchorX = this.x;
        }
        this.x = this.anchorX;
        this.config = Object.values(this.crumbs.stamps)
        this.masks = {};
        this.sprites = [];

        const rows = this.config.length;
        const middleRowY = rows % 2 === 0 ? -50 : 0;
        const middleRow = Math.floor(rows / 2);
        const width = 280
        const height = 40
        for (let i = 0; i < this.config.length; i++) {
            const row = i;
            const x = 0;
            const y = middleRowY - ((row - middleRow) * height);
            const sprite = new StampCategoryDropdownItem(this.scene, x, y);
            this.add(sprite);
            this.sprites.push(sprite);
            console.log(this.config[i]);
            sprite.loadCategory(this.config[i].group_id);
        }

        for (let i = 0; i < rows - 1; i++) {
            const separator = this.scene.add.rectangle(200, -50 + (i * height), width, 3, 0xAAAAAA);
            this.add(separator);
        }

        this.selector_nineslice.setSize(width, rows * height);
        this.selected_nineslice.setSize(width, rows * height);
        this.zone.setSize(width + 30, rows * height + 30);

        this.inited = true;
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

        setTimeout(() => {
            if (this.preventingClose.length === 0) {
                this.visible = false;
            }
        }, 300);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
