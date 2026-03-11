/* START OF COMPILED CODE */

import BaseWidget from "../../../base/BaseWidget";
import DraggableContainer from "../../../components/DraggableContainer";
import Interactive from "../../../components/Interactive";
import PaperDoll from "./paperdoll/PaperDoll";
import Buttons from "./buttons/Buttons";
import Button from "../../../components/Button";
import InventorySort from "./inventory_sort/InventorySort";
import Inventory from "./inventory/Inventory";
import Animation from "../../../components/Animation";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlayerCard extends BaseWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 460);

        /** @type {Phaser.GameObjects.Container} */
        this.photo;
        /** @type {Phaser.GameObjects.Image} */
        this.spinner;
        /** @type {PaperDoll} */
        this.paperDoll;
        /** @type {Buttons} */
        this.buttons;
        /** @type {Phaser.GameObjects.Text} */
        this.coins;
        /** @type {Phaser.GameObjects.Container} */
        this.stats;
        /** @type {Phaser.GameObjects.Text} */
        this.stamps;
        /** @type {Phaser.GameObjects.Container} */
        this.stats;
        /** @type {Phaser.GameObjects.Text} */
        this.username;
        /** @type {InventorySort} */
        this.inventorySort;
        /** @type {Inventory} */
        this.inventory;
        /** @type {Phaser.GameObjects.Image} */
        this.stripes;
        /** @type {Phaser.GameObjects.Container} */
        this.badge;


        // card_photo
        const card_photo = scene.add.image(0, 0, "main", "card-photo");
        card_photo.setOrigin(0.5011600928074246, 0.5011709601873536);
        this.add(card_photo);

        // photo
        const photo = scene.add.container(-205, -206);
        this.add(photo);

        // spinner
        const spinner = scene.add.image(0, -2, "main", "card-spinner");
        this.add(spinner);

        // card_bg
        const card_bg = scene.add.image(0, 0, "main", "card-bg-player");
        this.add(card_bg);

        // paperDoll
        const paperDoll = new PaperDoll(scene, 0, 0);
        paperDoll.visible = false;
        this.add(paperDoll);

        // buttons
        const buttons = new Buttons(scene, 0, 255);
        buttons.visible = false;
        this.add(buttons);

        // stats
        const stats = scene.add.container(-13, 255);
        stats.visible = false;
        this.add(stats);

        // card_coin
        const card_coin = scene.add.image(-160, -30, "main", "card-coin");
        stats.add(card_coin);

        // coins
        const coins = scene.add.text(-126, -25, "", {});
        coins.setOrigin(0, 0.5);
        coins.text = "Your Coins: 000000";
        coins.setStyle({ "color": "#000000ff", "fixedWidth": 300, "fontFamily": "Arial", "fontSize": "24px" });
        stats.add(coins);

        // stamps
        const stamps = scene.add.text(-126, 23, "", {});
        stamps.setOrigin(0, 0.5);
        stamps.text = "Your Stamps: 88/888";
        stamps.setStyle({ "color": "#000000ff", "fixedWidth": 300, "fontFamily": "Arial", "fontSize": "24px" });
        stats.add(stamps);

        // stamp_button
        const stamp_button = scene.add.image(-160, 22, "main", "blue-button");
        stats.add(stamp_button);

        // stamp_icon
        const stamp_icon = scene.add.image(-160, 20, "main", "stamps-icon");
        stats.add(stamp_icon);

        // username
        const username = scene.add.text(0, -238, "", {});
        username.setOrigin(0.5, 0.5);
        username.text = "Username";
        username.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth": 360, "fontFamily": "Arial", "fontSize": "32px", "fontStyle": "bold" });
        this.add(username);

        // x_button
        const x_button = scene.add.image(177, -237, "main", "blue-button");
        this.add(x_button);

        // blue_x
        const blue_x = scene.add.image(177, -239, "main", "blue-x");
        this.add(blue_x);

        // inventorySort
        const inventorySort = new InventorySort(scene, 434, 315);
        inventorySort.visible = false;
        this.add(inventorySort);

        // inventory
        const inventory = new Inventory(scene, -135, 33);
        inventory.visible = false;
        this.add(inventory);

        // badge
        const badge = scene.add.container(-153, -240);
        this.add(badge);

        // badge_member
        const badge_member = scene.add.image(0, 17, "main", "badge/member");
        badge.add(badge_member);

        // badge_lines_lines
        const badge_lines_lines = scene.add.sprite(0, 18, "main", "badge/lines/lines0001");
        badge_lines_lines.setOrigin(0.5, 0.5028571428571429);
        badge.add(badge_lines_lines);

        // stripes
        const stripes = scene.add.image(0, 56, "main", "badge/stripes/0");
        stripes.setOrigin(0.5, 0.5051546391752577);
        badge.add(stripes);

        // badge_ribbon
        const badge_ribbon = scene.add.image(0, 33, "main", "badge/ribbon");
        badge_ribbon.setOrigin(0.5061728395061729, 0.5185185185185185);
        badge.add(badge_ribbon);

        // badge_star
        const badge_star = scene.add.image(0, 0, "main", "badge/star");
        badge.add(badge_star);

        // this (components)
        const thisDraggableContainer = new DraggableContainer(this);
        thisDraggableContainer.handle = card_bg;

        // card_photo (components)
        new Interactive(card_photo);

        // stamp_button (components)
        const stamp_buttonButton = new Button(stamp_button);
        stamp_buttonButton.spriteName = "blue-button";
        stamp_buttonButton.callback = () => this.loadStampbook(this.world.client.id);

        // x_button (components)
        const x_buttonButton = new Button(x_button);
        x_buttonButton.spriteName = "blue-button";
        x_buttonButton.callback = () => this.close();

        // badge_lines_lines (components)
        const badge_lines_linesAnimation = new Animation(badge_lines_lines);
        badge_lines_linesAnimation.key = "badge/lines/lines";
        badge_lines_linesAnimation.end = 180;

        this.photo = photo;
        this.spinner = spinner;
        this.paperDoll = paperDoll;
        this.buttons = buttons;
        this.coins = coins;
        this.stamps = stamps;
        this.stats = stats;
        this.username = username;
        this.inventorySort = inventorySort;
        this.inventory = inventory;
        this.stripes = stripes;
        this.badge = badge;

        /* START-USER-CTR-CODE */

        // Active player id
        this.id = null

        this.spinnerTween = scene.tweens.add({
            targets: spinner,
            angle: { from: 0, to: 180 },
            duration: 900,
            repeat: -1,
            ease: 'Cubic',
            paused: true
        })

        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */

    show(playerId, username) {
        if (this.visible && playerId === this.id) {
            return
        }

        this.reset()

        this.id = playerId

        this.setUsername(username)
        this.updateButtons()

        if (playerId in this.world.room.penguins) {
            this.updatePlayer(this.world.room.penguins[playerId])

        } else {
            this.startSpinner()
            this.network.send('get_player', { id: playerId })
        }

        super.show()
    }

    close() {
        super.close()
        this.reset()
    }

    updatePlayer(player) {
        const { id, username, joinTime, isClient } = player

        if (id !== this.id) {
            return
        }

        this.updateElements({
            username,
            coins: isClient ? this.world.client.coins : 0,
            isClient
        })

        this.loadDoll(player.items?.flat || player, isClient)

        this.updateBadge(joinTime)

        this.inventorySort.closeMenu()
    }

    updateElements({ username, coins, isClient }) {
        this.setUsername(username)
        this.setCoins(coins)

        this.inventory.visible = isClient
        this.stats.visible = isClient
        this.buttons.visible = !isClient

        if (isClient) {
            this.updateInventory()
        }
    }

    setUsername(username) {
        this.username.text = username
    }

    setCoins(coins) {
        this.coins.text = `Your Coins: ${coins}`
    }

    setStamps(stamps) {
        this.stamps.text = `Your Stamps: ${this.world.client.stamps.length}/${this.world.totalStampsAvailable}`
    }

    updateInventory() {
        this.inventory.showPage()
    }

    loadDoll(items, isClient) {
        this.paperDoll.visible = true
        this.paperDoll.loadDoll(items, isClient)
    }

    resetDoll() {
        this.paperDoll.visible = false
        this.paperDoll.removeItems()
    }

    updateButtons() {
        if (this.buttons.visible) {
            const relationship = this.world.getRelationship(this.id)

            this.buttons.updateButtons(relationship)
        }
    }

    resetButtons() {
        this.buttons.resetButtons()
    }

    updateBadge(joinTime = null) {
        this.badge.visible = !!joinTime

        if (!joinTime) {
            return
        }

        const oneDay = 1000 * 60 * 60 * 24
        const timeDiff = Date.now() - Date.parse(joinTime)
        const daysDiff = Math.round(timeDiff / oneDay)

        const months = Math.floor(daysDiff / 30)
        let frame

        if (months <= 6) {
            frame = 0
        } else if (months <= 12) {
            frame = 1
        } else if (months <= 18) {
            frame = 2
        } else if (months <= 24) {
            frame = 3
        } else {
            frame = 4
        }

        this.stripes.setFrame(`badge/stripes/${frame}`)
    }

    loadStampbook(id) {
        this.interface.stampbookId = id
        this.interface.loadWidget("Stampbook")
    }

    startSpinner() {
        this.spinnerTween.seek(0)
        this.spinnerTween.resume()

        this.spinner.visible = true
    }

    stopSpinner() {
        this.spinner.visible = false

        this.spinnerTween.pause()
        this.spinner.angle = 0
    }

    reset() {
        this.id = null

        this.updateElements({
            username: '',
            coins: 0,
            isClient: false
        })

        this.resetDoll()

        this.resetButtons()
        this.updateBadge()

        this.inventory.reset()

        this.stopSpinner()
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
