
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
import Selectors from "./Selectors";
import Icon from "./thumbs/Icon";
import Pattern from "./thumbs/Pattern";
import Highlight from "./thumbs/Highlight";
import Color from "./thumbs/Color";
import CategorySelector from "./CategorySelector";
import StampCategory from "./thumbs/StampCategory";
import SimpleButton from "../../../components/SimpleButton";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class StampbookEditor extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // coverlist
        const coverlist = scene.add.image(38, -421, "stampbook", "coverlist");
        coverlist.setOrigin(0.5003933910306845, 0.5);
        this.add(coverlist);

        // remove_hint
        const remove_hint = scene.add.image(81, -421, "stampbook", "remove-hint");
        remove_hint.setOrigin(0.5003679175864606, 0.5042735042735043);
        remove_hint.visible = false;
        this.add(remove_hint);

        // leftbar
        const leftbar = scene.add.container(-707, -266);
        this.add(leftbar);

        // leftbar_img
        const leftbar_img = scene.add.image(0, 84, "stampbook", "leftbar");
        leftbar_img.setOrigin(0.5, 0.5007407407407407);
        leftbar.add(leftbar_img);

        // stampcat_arrow
        const stampcat_arrow = scene.add.triangle(96, -144.5, 0, 0, 10, 7.5, 0, 15);
        stampcat_arrow.isFilled = true;
        stampcat_arrow.fillColor = 2500134;
        leftbar.add(stampcat_arrow);

        // icon_selector
        const icon_selector = new Selectors(scene, 256, 345);
        icon_selector.visible = false;
        leftbar.add(icon_selector);

        // pattern_selector
        const pattern_selector = new Selectors(scene, 256, 230);
        pattern_selector.visible = false;
        leftbar.add(pattern_selector);

        // highlight_selector
        const highlight_selector = new Selectors(scene, 256, 115);
        highlight_selector.visible = false;
        leftbar.add(highlight_selector);

        // colors_selector
        const colors_selector = new Selectors(scene, 256, 0);
        colors_selector.visible = false;
        leftbar.add(colors_selector);

        // editor_selectors_icon
        const editor_selectors_icon = scene.add.image(20, 345, "stampbook", "editor-selectors");
        editor_selectors_icon.setOrigin(0.5038759689922481, 0.5);
        leftbar.add(editor_selectors_icon);

        // editor_selectors_pattern
        const editor_selectors_pattern = scene.add.image(20, 230, "stampbook", "editor-selectors");
        editor_selectors_pattern.setOrigin(0.5038759689922481, 0.5);
        leftbar.add(editor_selectors_pattern);

        // editor_selectors_highlight
        const editor_selectors_highlight = scene.add.image(20, 115, "stampbook", "editor-selectors");
        editor_selectors_highlight.setOrigin(0.5038759689922481, 0.5);
        leftbar.add(editor_selectors_highlight);

        // editor_selectors_color
        const editor_selectors_color = scene.add.image(20, 0, "stampbook", "editor-selectors");
        editor_selectors_color.setOrigin(0.5038759689922481, 0.5);
        leftbar.add(editor_selectors_color);

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

        // categorySelector
        const categorySelector = new CategorySelector(scene, 32, -136);
        categorySelector.visible = false;
        leftbar.add(categorySelector);

        // stampCategory
        const stampCategory = new StampCategory(scene, -115, -252);
        stampCategory.visible = true;
        leftbar.add(stampCategory);

        // save_btn
        const save_btn = scene.add.image(707, 420, "stampbook", "save-btn");
        save_btn.setOrigin(0.5070422535211268, 0.5);
        this.add(save_btn);

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

        // save_btn (components)
        const save_btnSimpleButton = new SimpleButton(save_btn);
        save_btnSimpleButton.callback = () => this.interface.stampbook.saveStampbook();

        this.icon_selector = icon_selector;
        this.pattern_selector = pattern_selector;
        this.highlight_selector = highlight_selector;
        this.colors_selector = colors_selector;
        this.icon_prefab = icon_prefab;
        this.pattern_prefab = pattern_prefab;
        this.highlight_prefab = highlight_prefab;
        this.color_prefab = color_prefab;
        this.categorySelector = categorySelector;
        this.stampCategory = stampCategory;
        this.leftbar = leftbar;

        /* START-USER-CTR-CODE */
        this.leftbar.onZoneOver = (id, caller) => {
            [this.icon_selector, this.pattern_selector, this.highlight_selector, this.colors_selector].forEach(selector => {
                selector.visible = false;
                selector.preventingClose = [];
            });

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
                default:
                    selector = this.colors_selector;
                    break;
            }
            if (!selector.inited) {
                selector.init();
                selector.inited = true;
            }
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
                default:
                    selector = this.colors_selector;
                    break;
            }
            selector.unpreventClose(this);
        }
        /* END-USER-CTR-CODE */
    }

    /** @type {Selectors} */
    icon_selector;
    /** @type {Selectors} */
    pattern_selector;
    /** @type {Selectors} */
    highlight_selector;
    /** @type {Selectors} */
    colors_selector;
    /** @type {Icon} */
    icon_prefab;
    /** @type {Pattern} */
    pattern_prefab;
    /** @type {Highlight} */
    highlight_prefab;
    /** @type {Color} */
    color_prefab;
    /** @type {CategorySelector} */
    categorySelector;
    /** @type {StampCategory} */
    stampCategory;
    /** @type {Phaser.GameObjects.Container} */
    leftbar;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
