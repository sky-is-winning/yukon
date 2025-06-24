
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../../base/BaseContainer";
import Zone from "../../../../components/Zone";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class StampCategoryDropdownItem extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // zone
        const zone = scene.add.rectangle(80, 0, 240, 50);
        zone.isFilled = true;
        zone.fillColor = 1234926;
        zone.fillAlpha = 0.3;
        this.add(zone);

        // categoryIcon
        const categoryIcon = scene.add.image(-10, 0, "_MISSING");
        categoryIcon.scaleX = 0.4;
        categoryIcon.scaleY = 0.4;
        categoryIcon.visible = false;
        this.add(categoryIcon);

        // title
        const title = scene.add.text(20, 0, "", {});
        title.setOrigin(0, 0.5);
        title.text = "Category";
        title.setStyle({ "color": "#000000ff", "fontFamily": "Burbank Small", "fontSize": "24px", "fontStyle": "bold" });
        this.add(title);

        // arrow
        const arrow = scene.add.triangle(187, 0, 0, 0, 10, 7.5, 0, 15);
        arrow.isFilled = true;
        arrow.fillColor = 2500134;
        this.add(arrow);

        // zone (components)
        const zoneZone = new Zone(zone);
        zoneZone.hoverCallback = () => this.onZoneOver();
        zoneZone.hoverOutCallback = () => this.onZoneOut();
        zoneZone.callback = () => { this.interface.stampbook.updateEditorCategory(this.id) };;

        this.categoryIcon = categoryIcon;
        this.title = title;
        this.arrow = arrow;

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Image} */
    categoryIcon;
    /** @type {Phaser.GameObjects.Text} */
    title;
    /** @type {Phaser.GameObjects.Triangle} */
    arrow;

    /* START-USER-CODE */

    loadCategory(category) {
        this.id = category;

        let catCrumb = Object.values(this.crumbs.stamps).find(c => c.group_id === category);

        this.interface.stampbook.loader.loadCategoryHeader(category, () => {
            this.categoryIcon.setTexture(`stampbook-assets/category-headers/${category}`);
            this.categoryIcon.visible = true;
        });

        this.title.text = category == 0 ? "All Stamps" : catCrumb.name;
        this.title.setColor(this.parentContainer.currentParentGroupId == category ? "#4d4d4dff" : "#000000ff");

        this.interface.events.on("updateStampbookCategory", this.updateCategory, this);

        this.arrow.visible = Object.values(this.crumbs.stamps).some(c => c.parent_group_id === category && category != 0);
    }

    onZoneOver() {
        this.parentContainer.onZoneOver(this.id);
        this.categoryIcon.scale = 0.5;
    }

    onZoneOut() {
        this.parentContainer.onZoneOut(this.id);
        this.categoryIcon.scale = 0.4;
    }

    updateCategory(category) {
        if (!this.active) return;
        this.title.setColor(category == this.id ? "#4d4d4dff" : "#000000ff");
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
