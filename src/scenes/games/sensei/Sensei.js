/* START OF COMPILED CODE */

import GameScene from "../GameScene";
import SenseiCharacter from "./character/SenseiCharacter";
import SenseiMenu from "./menu/SenseiMenu";
import Button from "../../components/Button";
import SenseiMatch from "./match/SenseiMatch";
/* START-USER-IMPORTS */

import SenseiInstructions from './instructions/SenseiInstructions'
import { intro } from './config/SenseiSequences'

/* END-USER-IMPORTS */

export default class Sensei extends GameScene {

    constructor() {
        super("Sensei");

        /** @type {SenseiCharacter} */
        this.character;
        /** @type {SenseiMenu} */
        this.menu;
        /** @type {SenseiMatch} */
        this.match;


        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {

        this.load.pack("sensei-pack", "assets/media/games/sensei/sensei-pack.json");
        this.load.pack("senseiinstructions-pack", "assets/media/games/sensei/instructions/senseiinstructions-pack.json");
    }

    /** @returns {void} */
    _create() {

        // character
        const character = new SenseiCharacter(this);
        this.add.existing(character);
        character.visible = true;

        // menu
        const menu = new SenseiMenu(this, 1060, 774);
        this.add.existing(menu);

        // xButton
        const xButton = this.add.image(1474, 43, "main", "grey-button");

        // x
        this.add.image(1474, 41, "main", "grey-x");

        // match
        const match = new SenseiMatch(this, 1024, 424);
        this.add.existing(match);
        match.visible = false;

        // xButton (components)
        const xButtonButton = new Button(xButton);
        xButtonButton.spriteName = "grey-button";
        xButtonButton.callback = () => this.world.client.sendJoinLastRoom();

        this.character = character;
        this.menu = menu;
        this.match = match;

        this.events.emit("scene-awake");
    }


    /* START-USER-CODE */

    get userHasDeck() {
        return this.world.client.inventory.award.includes(821)
    }

    create() {
        super.create()

        this.character.addBackgroundEvent('pointerover', this.onBackgroundOver, this)

        this.instructions = new SenseiInstructions(this)

        // Add instructions into character
        this.character.addAt(this.instructions, this.character.speechIndex)

        if (!this.userHasDeck) {
            this.startSequence(intro)
            return
        }

        this.showStartMenu()
    }

    onBackgroundOver() {
        // Speech displayed when there is no menu should stick
        if (!this.menu.visible) return

        // Speech displayed during menus other than the start menu should stick
        if (!this.menu.isStartMenuActive) return

        this.character.hideSpeech()
    }

    startSequence(sequence) {
        this.menu.close()
        this.character.startSequence(sequence)
    }

    showMenu(menu) {
        this.character.playWait()
        this.menu.show(menu)
    }

    showStartMenu() {
        this.menu.showStartMenu()
    }

    showPreviousMenu() {
        this.menu.showPreviousMenu()
    }

    showMatch() {
        this.menu.close()
        this.hideSpeech()
        this.match.show()
    }

    showSpeech(text) {
        this.character.showSpeech(text)
    }

    hideSpeech() {
        this.character.hideSpeech()
    }

    hideInstructions() {
        this.instructions.hideAll()
    }

    stop() {
        this.match.close()

        super.stop()
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
