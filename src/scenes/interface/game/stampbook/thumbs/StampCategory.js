
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../../base/BaseContainer";
import CategorySelector from "../CategorySelector";
import Zone from "../../../../components/Zone";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class StampCategory extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? -0.018919819965958595, y ?? -0.00424807146191597);

        // blue_stampcat_bg
        const blue_stampcat_bg = scene.add.image(0, 0, "stampbook", "blue-stampcat-bg");
        blue_stampcat_bg.setOrigin(0, 0);
        this.add(blue_stampcat_bg);

        // categorySelectorPositionOffset
        const categorySelectorPositionOffset = scene.add.container(130, 127);
        this.add(categorySelectorPositionOffset);

        // categorySelector
        const categorySelector = new CategorySelector(scene, 155.01347613044518, 164.99258550744867);
        categorySelector.visible = false;
        categorySelectorPositionOffset.add(categorySelector);

        // zone
        const zone = scene.add.rectangle(139, 113, 120, 120);
        zone.isFilled = true;
        zone.fillColor = 1234926;
        zone.fillAlpha = 0.3;
        this.add(zone);

        // categoryIcon
        const categoryIcon = scene.add.image(141, 134, "_MISSING");
        categoryIcon.visible = false;
        this.add(categoryIcon);

        // title
        const title = scene.add.text(147, 70, "", {});
        title.setOrigin(0.5, 0.5);
        title.text = "Characters";
        title.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Burbank Small", "fontSize": "18px", "fontStyle": "bold", "shadow.offsetX":1,"shadow.offsetY":1,"shadow.color": "#191c28ff", "shadow.fill":true});
        this.add(title);

        // allstamps_title
        const allstamps_title = scene.add.text(141, 69, "", {});
        allstamps_title.setOrigin(0.5, 0.5);
        allstamps_title.visible = false;
        allstamps_title.text = "All Stamps";
        allstamps_title.setStyle({ "align": "center", "color": "#4d4d4dff", "fontFamily": "Burbank Small", "fontSize": "19px", "fontStyle": "bold", "shadow.color": "#191c28ff" });
        this.add(allstamps_title);

        // zone (components)
        const zoneZone = new Zone(zone);
        zoneZone.hoverCallback = () => this.parentContainer.onZoneOver(0, "category");
        zoneZone.hoverOutCallback = () => this.parentContainer.onZoneOut(0, "category");

        this.blue_stampcat_bg = blue_stampcat_bg;
        this.categorySelector = categorySelector;
        this.categoryIcon = categoryIcon;
        this.title = title;
        this.allstamps_title = allstamps_title;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Image} */
    blue_stampcat_bg;
    /** @type {CategorySelector} */
    categorySelector;
    /** @type {Phaser.GameObjects.Image} */
    categoryIcon;
    /** @type {Phaser.GameObjects.Text} */
    title;
    /** @type {Phaser.GameObjects.Text} */
    allstamps_title;

    /* START-USER-CODE */

    loadCategory(category) {
        let catCrumb = Object.values(this.crumbs.stamps).find(c => c.group_id === category);

        this.interface.stampbook.loader.loadCategoryHeader(category, () => {
            this.categoryIcon.setTexture(`stampbook-assets/category-headers/${category}`);
            this.categoryIcon.visible = true;
        });


        this.title.setText(catCrumb.name);
        this.title.visible = category != 0;
        this.blue_stampcat_bg.visible = category != 0;

        this.allstamps_title.visible = category == 0;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
