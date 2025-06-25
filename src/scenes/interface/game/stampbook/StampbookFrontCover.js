
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
import SimpleButton from "../../../components/SimpleButton";
import Button from "../../../components/Button";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class StampbookFrontCover extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // background
        const background = scene.add.image(0, 0, "_MISSING");
        background.visible = false;
        this.add(background);

        // clasp
        const clasp = scene.add.image(581, 21, "_MISSING");
        clasp.visible = false;
        this.add(clasp);

        // icon
        const icon = scene.add.image(561, 13, "_MISSING");
        icon.setOrigin(0.5, 0.5039370078740157);
        icon.visible = false;
        this.add(icon);

        // closebtn
        const closebtn = scene.add.image(576, -317, "stampbook", "closebtn");
        this.add(closebtn);

        // username_text_highlight_2
        const username_text_highlight_2 = scene.add.text(-515, 225, "", {});
        username_text_highlight_2.setOrigin(0, 0.5);
        username_text_highlight_2.alpha = 0.5;
        username_text_highlight_2.alphaTopLeft = 0.5;
        username_text_highlight_2.alphaTopRight = 0.5;
        username_text_highlight_2.alphaBottomLeft = 0.5;
        username_text_highlight_2.alphaBottomRight = 0.5;
        username_text_highlight_2.text = "Penguin8888";
        username_text_highlight_2.setStyle({ "color": "#F4B851", "fontFamily": "Burbank Big Regular Black", "fontSize": "108px", "shadow.color": "#000000ff" });
        this.add(username_text_highlight_2);

        // username_text_highlight_1
        const username_text_highlight_1 = scene.add.text(-516, 222, "", {});
        username_text_highlight_1.setOrigin(0, 0.5);
        username_text_highlight_1.alpha = 0.5;
        username_text_highlight_1.alphaTopLeft = 0.5;
        username_text_highlight_1.alphaTopRight = 0.5;
        username_text_highlight_1.alphaBottomLeft = 0.5;
        username_text_highlight_1.alphaBottomRight = 0.5;
        username_text_highlight_1.text = "Penguin8888";
        username_text_highlight_1.setStyle({ "color": "#F4B851", "fontFamily": "Burbank Big Regular Black", "fontSize": "108px", "shadow.color": "#000000ff" });
        this.add(username_text_highlight_1);

        // username_text
        const username_text = scene.add.text(-518, 220, "", {});
        username_text.setOrigin(0, 0.5);
        username_text.text = "Penguin8888";
        username_text.setStyle({ "color": "#F4B851", "fontFamily": "Burbank Big Regular Black", "fontSize": "108px", "shadow.offsetX":-3,"shadow.offsetY":-3,"shadow.color": "#0000008d", "shadow.fill":true});
        this.add(username_text);

        // stampstotal_text_highlight
        const stampstotal_text_highlight = scene.add.text(-260, 307, "", {});
        stampstotal_text_highlight.setOrigin(0, 0.5);
        stampstotal_text_highlight.alpha = 0.5;
        stampstotal_text_highlight.alphaTopLeft = 0.5;
        stampstotal_text_highlight.alphaTopRight = 0.5;
        stampstotal_text_highlight.alphaBottomLeft = 0.5;
        stampstotal_text_highlight.alphaBottomRight = 0.5;
        stampstotal_text_highlight.text = "Total Stamps 888/888";
        stampstotal_text_highlight.setStyle({ "color": "#F4B851", "fontFamily": "Burbank Small", "fontSize": "28px", "fontStyle": "bold", "shadow.color": "#000000ff" });
        this.add(stampstotal_text_highlight);

        // stampstotal_text
        const stampstotal_text = scene.add.text(-262, 305, "", {});
        stampstotal_text.setOrigin(0, 0.5);
        stampstotal_text.text = "Total Stamps 888/888";
        stampstotal_text.setStyle({ "color": "#F4B851", "fontFamily": "Burbank Small", "fontSize": "28px", "fontStyle": "bold", "shadow.offsetX":-2,"shadow.offsetY":-2,"shadow.color": "#0000005e", "shadow.fill":true});
        this.add(stampstotal_text);

        // coverStampsContainer
        const coverStampsContainer = scene.add.container(-781, -519);
        this.add(coverStampsContainer);

        // lists
        const usernameItems = [username_text, username_text_highlight_1, username_text_highlight_2];
        const stampsTotalItems = [stampstotal_text_highlight, stampstotal_text];

        // clasp (components)
        const claspSimpleButton = new SimpleButton(clasp);
        claspSimpleButton.callback = () => this.interface.stampbook.showPage(1);

        // closebtn (components)
        const closebtnButton = new Button(closebtn);
        closebtnButton.spriteName = "closebtn";
        closebtnButton.callback = () => this.interface.stampbook.close();

        this.background = background;
        this.clasp = clasp;
        this.icon = icon;
        this.username_text = username_text;
        this.stampstotal_text = stampstotal_text;
        this.coverStampsContainer = coverStampsContainer;
        this.usernameItems = usernameItems;
        this.stampsTotalItems = stampsTotalItems;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Image} */
    background;
    /** @type {Phaser.GameObjects.Image} */
    clasp;
    /** @type {Phaser.GameObjects.Image} */
    icon;
    /** @type {Phaser.GameObjects.Text} */
    username_text;
    /** @type {Phaser.GameObjects.Text} */
    stampstotal_text;
    /** @type {Phaser.GameObjects.Container} */
    coverStampsContainer;
    /** @type {Phaser.GameObjects.Text[]} */
    usernameItems;
    /** @type {Phaser.GameObjects.Text[]} */
    stampsTotalItems;

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
