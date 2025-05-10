
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class StampHover extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // stamp_highlight_bottom
        const stamp_highlight_bottom = scene.add.nineslice(0, 120, "stampbook", "stamp-highlight-bottom", 250, 33, 120, 30, 0, 0);
        stamp_highlight_bottom.setOrigin(0, 0);
        this.add(stamp_highlight_bottom);

        // stamp_highlight_top
        const stamp_highlight_top = scene.add.nineslice(0, 0, "stampbook", "stamp-highlight-top", 250, 120, 20, 20, 20, 20);
        stamp_highlight_top.setOrigin(0, 0);
        this.add(stamp_highlight_top);

        // title
        const title = scene.add.text(16, 30, "", {});
        title.setOrigin(0, 0.5);
        title.text = "Rockhopper";
        title.setStyle({ "color": "#000000ff", "fontFamily": "Burbank Small", "fontSize": "22px", "fontStyle": "bold" });
        this.add(title);

        // description
        const description = scene.add.text(16, 45, "", {});
        description.text = "Be in the same room as Rockhopper";
        description.setStyle({ "color": "#5f5f5fff", "fontFamily": "Burbank Small", "fontSize": "20px" });
        description.setWordWrapWidth(215);
        this.add(description);

        this.stamp_highlight_bottom = stamp_highlight_bottom;
        this.stamp_highlight_top = stamp_highlight_top;
        this.title = title;
        this.description = description;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.NineSlice} */
    stamp_highlight_bottom;
    /** @type {Phaser.GameObjects.NineSlice} */
    stamp_highlight_top;
    /** @type {Phaser.GameObjects.Text} */
    title;
    /** @type {Phaser.GameObjects.Text} */
    description;

    /* START-USER-CODE */

    resize(width, height) {
        this.stamp_highlight_top.setSize(width, height);
        this.stamp_highlight_bottom.setSize(width, 33);
        this.stamp_highlight_bottom.y = height
    }

    setStamp(stamp) {
        this.title.text = stamp.name;
        this.description.text = stamp.description;

        if (this.description.height > 50) {
            this.resize(250, this.description.height + 60);
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
