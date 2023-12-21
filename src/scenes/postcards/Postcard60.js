
// You can write more code here

/* START OF COMPILED CODE */

import BasePostcard from "./base/BasePostcard";
import GoToButton from "./buttons/GoToButton";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Postcard60 extends BasePostcard {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        /** @type {Phaser.GameObjects.Text} */
        this.name;


        // bg
        const bg = scene.add.image(0, 0, "postcards/sprites/60", "60");
        bg.setOrigin(0, 0);
        this.add(bg);

        // goToButton
        const goToButton = new GoToButton(scene, 855, 614);
        this.add(goToButton);

        // name
        const name = scene.add.text(24, 605, "", {});
        name.text = "Penguin88888888";
        name.setStyle({ "align": "right", "color": "#000000", "fixedWidth":314,"fontFamily": "CCFaceFront", "fontSize": "28px" });
        name.setPadding({"left":5,"right":5});
        this.add(name);

        this.name = name;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here