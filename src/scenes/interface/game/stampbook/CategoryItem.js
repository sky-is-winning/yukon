
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
import Zone from "../../../components/Zone";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CategoryItem extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // shadow
        const shadow = scene.add.image(32, 2, "_MISSING");
        shadow.setOrigin(0.5135135135135135, 0.5);
        shadow.visible = false;
        shadow.alpha = 0.3;
        shadow.alphaTopLeft = 0.3;
        shadow.alphaTopRight = 0.3;
        shadow.alphaBottomLeft = 0.3;
        shadow.alphaBottomRight = 0.3;
        shadow.tintFill = true;
        shadow.tintTopLeft = 0;
        shadow.tintTopRight = 0;
        shadow.tintBottomLeft = 0;
        shadow.tintBottomRight = 0;
        this.add(shadow);

        // category_icon
        const category_icon = scene.add.image(30, 0, "_MISSING");
        category_icon.setOrigin(0.5135135135135135, 0.5);
        category_icon.visible = false;
        this.add(category_icon);

        // category_text
        const category_text = scene.add.text(0, 0, "", {});
        category_text.setOrigin(0, 0.5);
        category_text.text = "Card-Jistu: Water";
        category_text.setStyle({ "color": "#666666", "fontFamily": "Burbank Small", "fontSize": "24px", "fontStyle": "bold" });
        category_text.setPadding({"left":75,"right":10});
        this.add(category_text);

        // zone
        const zone = scene.add.rectangle(0, 0, 324, 80);
        zone.setOrigin(0, 0.5);
        zone.isFilled = true;
        zone.fillColor = 1234926;
        zone.fillAlpha = 0.3;
        this.add(zone);

        // zone (components)
        const zoneZone = new Zone(zone);
        zoneZone.hoverCallback = () => this.onOver();
        zoneZone.hoverOutCallback = () => this.onOut();
        zoneZone.callback = () => this.onDown();

        this.shadow = shadow;
        this.category_icon = category_icon;
        this.category_text = category_text;
        this.zone = zone;

        /* START-USER-CTR-CODE */
        this.setCategory(5);
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Image} */
    shadow;
    /** @type {Phaser.GameObjects.Image} */
    category_icon;
    /** @type {Phaser.GameObjects.Text} */
    category_text;
    /** @type {Phaser.GameObjects.Rectangle} */
    zone;

    /* START-USER-CODE */

    setCategory(stamp_group) {
        const name = this.crumbs.stamps.find(stamp => stamp.group_id === stamp_group).name;
        this.category_text.text = name;
        this.category_icon.visible = false;
        this.shadow.visible = false;
        this.interface.stampbook.loader.loadCategory(stamp_group, () => {
            this.category_icon.setTexture(`stampbook-assets/category/${stamp_group}`);
            this.shadow.setTexture(`stampbook-assets/category/${stamp_group}`);
            this.category_icon.visible = true;
            this.shadow.visible = true;
        });
        this.zone.setSize(this.category_text.width, 80);
        this.groupId = stamp_group;
    }

    onOver() {
        if (this.scene.textures.exists(`stampbook-assets/category/${this.groupId}-hover`)) {
            this.category_icon.setTexture(`stampbook-assets/category/${this.groupId}-hover`);
        }
        this.category_text.setColor("#333333");
    }

    onOut() {
        this.category_icon.setTexture(`stampbook-assets/category/${this.groupId}`);
        this.category_text.setColor("#666666");
    }

    onDown() {
        this.interface.stampbook.goToCategory(this.groupId);
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
