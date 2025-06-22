
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
        const zone = scene.add.rectangle(43, 0, 120, 30);
        zone.isFilled = true;
        zone.fillColor = 1234926;
        zone.fillAlpha = 0.3;
        this.add(zone);

        // categoryIcon
        const categoryIcon = scene.add.image(0, 0, "_MISSING");
        categoryIcon.visible = false;
        this.add(categoryIcon);

        // title
        const title = scene.add.text(18, 0, "", {});
        title.setOrigin(0, 0.5);
        title.text = "Events";
        title.setStyle({ "color": "#000000ff", "fontFamily": "Burbank Small", "fontStyle": "bold", "shadow.color": "#191c28ff" });
        this.add(title);

        // zone (components)
        const zoneZone = new Zone(zone);
        zoneZone.hoverCallback = () => this.onZoneOver();
        zoneZone.hoverOutCallback = () => this.onZoneOut();
        zoneZone.callback = () => { this.interface.stampbook.updateEditorCategory(this.id) };;

        this.categoryIcon = categoryIcon;
        this.title = title;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Image} */
    categoryIcon;
    /** @type {Phaser.GameObjects.Text} */
    title;

    /* START-USER-CODE */

    loadCategory(category) {
        let catCrumb = Object.values(this.crumbs.stamps).find(c => c.group_id === category);

        this.interface.stampbook.loader.loadCategoryHeader(category, () => {
            this.categoryIcon.setTexture(`stampbook-assets/category-headers/${category}`);
            this.categoryIcon.visible = true;
        });

        this.title.setText(category != 0 ? "All Stamps" : catCrumb.name);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
