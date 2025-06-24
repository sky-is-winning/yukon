
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
        const zone = scene.add.rectangle(0, 0, 310, 330);
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

    /* START-USER-CODE */

    init(parent_group_id) {
        this.currentParentGroupId = parent_group_id;
        this.config = Object.values(this.crumbs.stamps).filter(c => c.parent_group_id === parent_group_id || parent_group_id == 0 && c.parent_group_id === -1);
        this.config.sort((a, b) => (b.group_id == 0 ? 9001 : b.group_id) - a.group_id);
        this.masks = {};
        this.sprites = [];

        const rows = this.config.length;
        const middleRowY = 0;
        const middleRow = Math.floor(rows / 2);
        const width = 240
        const height = 50
        for (let i = 0; i < this.config.length; i++) {
            const row = i;
            const x = -80;
            const y = middleRowY - ((row - middleRow) * height);
            const sprite = new StampCategoryDropdownItem(this.scene, x, y);
            this.add(sprite);
            this.sprites.push(sprite);
            sprite.loadCategory(this.config[i].group_id);
        }

        for (let i = 0; i < rows; i++) {
            const separator = this.scene.add.rectangle(0, -125 + (i * height), width, 1, 0xAAAAAA);
            this.seperators_container.add(separator);
        }

        this.selector_nineslice.setSize(width, rows * height + 50);
        this.selected_nineslice.setSize(width, rows * height + 50);
        this.selector_outline_nineslice.setSize(width, rows * height + 50);
        this.zone.setSize(width + 30, rows * height + 30);

        this.x = width / 2;
        this.y = (rows * height + 50) / 2;

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
            graphics.fillStyle(0xfffff, 1);
            graphics.fillRect(matrix.getX(0, 0) - 40, matrix.getY(0, 0) - 25, 240, 50);
            this.masks[this.config[i].group_id] = graphics.createGeometryMask();
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
