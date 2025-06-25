
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
import SimpleButton from "../../../components/SimpleButton";
import Zone from "../../../components/Zone";
import Selectors from "./Selectors";
import Icon from "./thumbs/Icon";
import Pattern from "./thumbs/Pattern";
import Highlight from "./thumbs/Highlight";
import Color from "./thumbs/Color";
import StampCategory from "./thumbs/StampCategory";
/* START-USER-IMPORTS */
import Stamp from "./Stamp";
/* END-USER-IMPORTS */

export default class StampbookEditor extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // coverlist
        const coverlist = scene.add.image(38, -421, "stampbook", "coverlist");
        coverlist.setOrigin(0.5003933910306845, 0.5);
        this.add(coverlist);

        // stampsContainer
        const stampsContainer = scene.add.container(-475, -419);
        this.add(stampsContainer);

        // save_btn
        const save_btn = scene.add.image(707, 420, "stampbook", "save-btn");
        save_btn.setOrigin(0.5070422535211268, 0.5);
        this.add(save_btn);

        // arrow_right
        const arrow_right = scene.add.triangle(641, -419, 0, 0, 14, 30, 0, 60);
        arrow_right.isFilled = true;
        arrow_right.fillColor = 11184810;
        this.add(arrow_right);

        // arrow_left
        const arrow_left = scene.add.triangle(-566, -419, 0, 0, 14, 30, 0, 60);
        arrow_left.scaleX = -1;
        arrow_left.isFilled = true;
        arrow_left.fillColor = 11184810;
        this.add(arrow_left);

        // right_zone
        const right_zone = scene.add.rectangle(646, -426, 40, 100);
        right_zone.isFilled = true;
        right_zone.fillColor = 1234926;
        right_zone.fillAlpha = 0.3;
        this.add(right_zone);

        // left_zone
        const left_zone = scene.add.rectangle(-573, -419, 40, 100);
        left_zone.isFilled = true;
        left_zone.fillColor = 1234926;
        left_zone.fillAlpha = 0.3;
        this.add(left_zone);

        // removeHint
        const removeHint = scene.add.image(89, -421, "stampbook", "remove-hint");
        removeHint.setOrigin(0.5003679175864606, 0.5042735042735043);
        removeHint.visible = false;
        this.add(removeHint);

        // bookStampCntr
        const bookStampCntr = scene.add.container(-760, -480);
        this.add(bookStampCntr);

        // leftbar
        const leftbar = scene.add.container(-707, -266);
        this.add(leftbar);

        // leftbar_img
        const leftbar_img = scene.add.image(0, 84, "stampbook", "leftbar");
        leftbar_img.setOrigin(0.5, 0.5007407407407407);
        leftbar.add(leftbar_img);

        // icon_selector
        const icon_selector = new Selectors(scene, 210, 345);
        icon_selector.visible = false;
        leftbar.add(icon_selector);

        // pattern_selector
        const pattern_selector = new Selectors(scene, 210, 230);
        pattern_selector.visible = false;
        leftbar.add(pattern_selector);

        // highlight_selector
        const highlight_selector = new Selectors(scene, 210, 115);
        highlight_selector.visible = false;
        leftbar.add(highlight_selector);

        // color_selector
        const color_selector = new Selectors(scene, 210, 0);
        color_selector.visible = false;
        leftbar.add(color_selector);

        // icon_prefab
        const icon_prefab = new Icon(scene, 21, 345);
        leftbar.add(icon_prefab);

        // pattern_prefab
        const pattern_prefab = new Pattern(scene, 21, 230);
        leftbar.add(pattern_prefab);

        // highlight_prefab
        const highlight_prefab = new Highlight(scene, 21, 115);
        leftbar.add(highlight_prefab);

        // color_prefab
        const color_prefab = new Color(scene, 21, 0);
        leftbar.add(color_prefab);

        // stampCategory
        const stampCategory = new StampCategory(scene, -115, -252);
        stampCategory.visible = true;
        leftbar.add(stampCategory);

        // stampcat_arrow
        const stampcat_arrow = scene.add.triangle(96, -144.5, 0, 0, 10, 7.5, 0, 15);
        stampcat_arrow.isFilled = true;
        stampcat_arrow.fillColor = 2500134;
        leftbar.add(stampcat_arrow);

        // topBlocker
        const topBlocker = scene.add.rectangle(-760, -480, 1520, 180);
        topBlocker.setOrigin(0, 0);
        topBlocker.fillColor = 2328324;
        topBlocker.fillAlpha = 0.6;
        this.add(topBlocker);

        // bottomBlocker
        const bottomBlocker = scene.add.rectangle(-760, 340, 1520, 140);
        bottomBlocker.setOrigin(0, 0);
        bottomBlocker.fillColor = 2328324;
        bottomBlocker.fillAlpha = 0.6;
        this.add(bottomBlocker);

        // rightBlocker
        const rightBlocker = scene.add.rectangle(620, -480, 140, 960);
        rightBlocker.setOrigin(0, 0);
        rightBlocker.fillColor = 2328324;
        rightBlocker.fillAlpha = 0.6;
        this.add(rightBlocker);

        // leftBlocker
        const leftBlocker = scene.add.rectangle(-760, -480, 170, 960);
        leftBlocker.setOrigin(0, 0);
        leftBlocker.fillColor = 2328324;
        leftBlocker.fillAlpha = 0.6;
        this.add(leftBlocker);

        // wordmarkBlocker
        const wordmarkBlocker = scene.add.rectangle(339, 185, 240, 155);
        wordmarkBlocker.setOrigin(0, 0);
        wordmarkBlocker.fillColor = 2328324;
        wordmarkBlocker.fillAlpha = 0.6;
        this.add(wordmarkBlocker);

        // claspBlocker
        const claspBlocker = scene.add.rectangle(490, -30, 130, 180);
        claspBlocker.setOrigin(0, 0);
        claspBlocker.fillColor = 2328324;
        claspBlocker.fillAlpha = 0.6;
        this.add(claspBlocker);

        // closeBlocker
        const closeBlocker = scene.add.rectangle(560, -300, 60, 60);
        closeBlocker.setOrigin(0, 0);
        closeBlocker.fillColor = 2328324;
        closeBlocker.fillAlpha = 0.6;
        this.add(closeBlocker);

        // lists
        const stampBlockers = [topBlocker, closeBlocker, claspBlocker, wordmarkBlocker, leftBlocker, rightBlocker, bottomBlocker];

        // save_btn (components)
        const save_btnSimpleButton = new SimpleButton(save_btn);
        save_btnSimpleButton.callback = () => this.interface.stampbook.saveStampbook();

        // right_zone (components)
        const right_zoneZone = new Zone(right_zone);
        right_zoneZone.hoverCallback;
        right_zoneZone.hoverOutCallback;
        right_zoneZone.callback = () => this.stampPage(1);

        // left_zone (components)
        const left_zoneZone = new Zone(left_zone);
        left_zoneZone.hoverCallback;
        left_zoneZone.hoverOutCallback;
        left_zoneZone.callback = () => this.stampPage(-1);

        // icon_selector (prefab fields)
        icon_selector.selectorType = "Icons";

        // pattern_selector (prefab fields)
        pattern_selector.selectorType = "Patterns";

        // highlight_selector (prefab fields)
        highlight_selector.selectorType = "Highlights";

        // icon_prefab (prefab fields)
        icon_prefab.rootModule = true;

        // pattern_prefab (prefab fields)
        pattern_prefab.rootModule = true;

        // highlight_prefab (prefab fields)
        highlight_prefab.rootModule = true;

        // color_prefab (prefab fields)
        color_prefab.rootModule = true;

        this.stampsContainer = stampsContainer;
        this.arrow_right = arrow_right;
        this.arrow_left = arrow_left;
        this.right_zone = right_zone;
        this.left_zone = left_zone;
        this.removeHint = removeHint;
        this.bookStampCntr = bookStampCntr;
        this.icon_selector = icon_selector;
        this.pattern_selector = pattern_selector;
        this.highlight_selector = highlight_selector;
        this.color_selector = color_selector;
        this.icon_prefab = icon_prefab;
        this.pattern_prefab = pattern_prefab;
        this.highlight_prefab = highlight_prefab;
        this.color_prefab = color_prefab;
        this.stampCategory = stampCategory;
        this.leftbar = leftbar;
        this.stampBlockers = stampBlockers;

        /* START-USER-CTR-CODE */
        this.leftbar.onZoneOver = (id, caller) => {
            [this.icon_selector, this.pattern_selector, this.highlight_selector, this.color_selector, this.stampCategory.categorySelector].forEach(selector => {
                selector.visible = false;
                selector.preventingClose = [];
            });

            let selector;
            let prefab;
            switch (caller) {
                case "icon":
                    selector = this.icon_selector;
                    prefab = this.icon_prefab;
                    break;
                case "pattern":
                    selector = this.pattern_selector;
                    prefab = this.pattern_prefab;
                    break;
                case "highlight":
                    selector = this.highlight_selector;
                    prefab = this.highlight_prefab;
                    break;
                case "category":
                    selector = this.stampCategory.categorySelector;
                    prefab = this.stampCategory
                    break;
                default:
                    selector = this.color_selector;
                    prefab = this.color_prefab;
                    break;
            }
            if (!selector.inited) {
                selector.init(id);
                selector.inited = true;
            }

            this.leftbar.bringToTop(selector);
            this.leftbar.bringToTop(prefab);

            selector.visible = true;
            selector.preventClose(this);
        }

        this.leftbar.onZoneOut = (id, caller) => {
            let selector;
            switch (caller) {
                case "icon":
                    selector = this.icon_selector;
                    break;
                case "pattern":
                    selector = this.pattern_selector;
                    break;
                case "highlight":
                    selector = this.highlight_selector;
                    break;
                case "category":
                    selector = this.stampCategory.categorySelector;
                    break;
                default:
                    selector = this.color_selector;
                    break;
            }
            selector.unpreventClose(this);
        }
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Container} */
    stampsContainer;
    /** @type {Phaser.GameObjects.Triangle} */
    arrow_right;
    /** @type {Phaser.GameObjects.Triangle} */
    arrow_left;
    /** @type {Phaser.GameObjects.Rectangle} */
    right_zone;
    /** @type {Phaser.GameObjects.Rectangle} */
    left_zone;
    /** @type {Phaser.GameObjects.Image} */
    removeHint;
    /** @type {Phaser.GameObjects.Container} */
    bookStampCntr;
    /** @type {Selectors} */
    icon_selector;
    /** @type {Selectors} */
    pattern_selector;
    /** @type {Selectors} */
    highlight_selector;
    /** @type {Selectors} */
    color_selector;
    /** @type {Icon} */
    icon_prefab;
    /** @type {Pattern} */
    pattern_prefab;
    /** @type {Highlight} */
    highlight_prefab;
    /** @type {Color} */
    color_prefab;
    /** @type {StampCategory} */
    stampCategory;
    /** @type {Phaser.GameObjects.Container} */
    leftbar;
    /** @type {Phaser.GameObjects.Rectangle[]} */
    stampBlockers;

    /* START-USER-CODE */

    showCategory(category) {
        this.interface.events.emit("updateStampbookCategory", category);
        this.stampCategory.loadCategory(category)

        this.stampsContainer.removeAll(true);
        this.stamps = this.world.client.stamps.filter(s => this.isInCategory(s, category));
        this.currentPage = 0;
        this.stampPage(0);
    }

    isInCategory(stamp, category) {
        return this.interface.stampbook.getStampsByGroupId(category).some(s => s.stamp_id === stamp);
    }

    stampPage(direction) {
        this.currentPage += direction;
        this.stampsContainer.removeAll(true);
        for (let i = 0; i < 10; i++) {
            if (this.stamps[this.currentPage * 10 + i]) {
                let stampObj = new Stamp(this.scene, i * 113, 0);
                stampObj.setCoverStamp(this.stamps[this.currentPage * 10 + i], 1);
                this.addDragProperties(stampObj);
                this.stampsContainer.add(stampObj);
            }
        }
        this.arrow_left.visible = this.currentPage > 0;
        this.arrow_right.visible = this.currentPage < Math.ceil(this.stamps.length / 10) - 1;
        this.left_zone.zone.visible = this.arrow_left.visible;
        this.right_zone.zone.visible = this.arrow_right.visible;
    }

    addDragProperties(stampObj) {
        stampObj.stamp.on("pointerdown", (pointer) => {
            this.onPointerDown(stampObj, pointer);
        });
    }

    onPointerDown(stampObj, pointer) {
        const dragStamp = new Stamp(this.scene, pointer.x, pointer.y);
        dragStamp.setCoverStamp(stampObj.id, 3);
        this.bookStampCntr.add(dragStamp);

        this.interface.input.on('pointermove', this.onPointerMove, { dragStamp: dragStamp, editor: this });
        this.interface.input.once('pointerup', this.onPointerUp, { dragStamp: dragStamp, editor: this });
        this.stamps = this.stamps.filter(s => s !== stampObj.id);

        stampObj.destroy();

        this.stampPage(0);
        this.removeHint.visible = true;
    }

    onPointerMove(pointer) {
        this.dragStamp.x = pointer.x;
        this.dragStamp.y = pointer.y;
        this.dragStamp.alpha = this.editor.validatePosition.bind(this.editor)(this.dragStamp) ? 1 : 0.5;
    }

    onPointerUp(pointer) {
        this.editor.interface.input.off('pointermove', this.onPointerMove, this);
        this.editor.removeHint.visible = false;
        if (this.editor.validatePosition.bind(this.editor)(this.dragStamp)) {
            this.editor.interface.stampbook.addCoverStamp(this.dragStamp.id, pointer.x, pointer.y);
        }
        this.dragStamp.destroy();
    }

    validatePosition(dragStamp) {
        for (const gameObject of this.interface.stampbook.front_cover.coverStampsContainer.getAll()) {
            if (gameObject === dragStamp) continue;
            if (Phaser.Geom.Intersects.RectangleToRectangle(gameObject.stamp.getBounds(), dragStamp.stamp.getBounds())) {
                return false;
            }
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.interface.stampbook.front_cover.username_text.getBounds(), dragStamp.stamp.getBounds())) {
            return false;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.interface.stampbook.front_cover.stampstotal_text.getBounds(), dragStamp.stamp.getBounds())) {
            return false;
        }

        for (const gameObject of this.stampBlockers) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), dragStamp.stamp.getBounds())) {
                return false;
            }
        }

        return true;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
