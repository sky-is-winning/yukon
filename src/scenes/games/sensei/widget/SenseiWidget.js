/* START OF COMPILED CODE */

import BaseDynamicWidget from "../../../base/BaseDynamicWidget";
import SenseiCharacter from "../character/SenseiCharacter";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SenseiWidget extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        /** @type {SenseiCharacter} */
        this.character;


        // character
        const character = new SenseiCharacter(scene);
        this.add(character);

        this.character = character;

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */

    rankUp(rank) {
        this.character.rankUp(rank)
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
