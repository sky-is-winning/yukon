import BaseContainer from '@scenes/base/BaseContainer'

import TintedImage from '@engine/utils/tint/TintedImage'

// Slots ordered by depth
const slots = ['photo', 'color', 'feet', 'body', 'neck', 'face', 'head', 'hand', 'flag']

const flagX = -153
const flagY = -120
const flagScale = 0.66

/* START OF COMPILED CODE */

export default class PaperDoll extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 480)

        /** @type {Phaser.GameObjects.Image} */
        this.paperdoll
        /** @type {boolean} */
        this.fadeIn = true


        // paperdoll
        const paperdoll = scene.add.image(0, 0, "main", "paperdoll/paperdoll")
        this.add(paperdoll)

        this.paperdoll = paperdoll

        /* START-USER-CTR-CODE */

        // Tinted body
        this.body = new TintedImage(scene, 0, 0, 'main', 'paperdoll/body')
        this.body.tint = this.crumbs.colors[0]

        scene.add.existing(this.body)
        this.addAt(this.body, 0)

        this.body.depth = 1
        this.paperdoll.depth = 2

        this.items = this.setItems()

        this.isInputEnabled = false

        this.paperDollLoader = this.interface.paperDollLoader

        this.callback = this.addItem.bind(this)

        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */

    setItems() {
        const items = {}

        for (const slot of slots) {
            items[slot] = {
                id: 0,
                depth: slots.indexOf(slot) + 100,
                sprite: null,
                backSprite: null
            }
        }

        return items
    }

    loadDoll(items, isInputEnabled = false) {
        // Clear any previous items
        this.removeItems()

        this.isInputEnabled = isInputEnabled

        this.updateInput()
        this.loadItems(items)
    }

    loadItems(items) {
        for (const slot of slots) {
            const itemId = items[slot]

            if (itemId !== undefined) {
                this.loadItem(itemId, slot)
            }
        }
    }

    loadItem(itemId, slot) {
        if (slot === 'color') {
            this.setColor(itemId)
            return
        }

        if (itemId === 0) {
            this.removeItem(slot)
            return
        }

        if (this.items[slot].sprite) {
            this.removeItem(slot)
        }

        this.items[slot].id = itemId

        this.paperDollLoader.loadItem(itemId, slot, this.callback)
        this.paperDollLoader.start()
    }

    setColor(colorId) {
        this.body.tint = this.interface.getColor(colorId)
    }

    addItem(itemId, key, slot, isBack) {
        if (!this.visible) {
            return
        }

        if (itemId !== this.items[slot].id) {
            return
        }

        const item = this.items[slot]

        if (isBack) {
            this.addBack(key, slot, item)
            return
        }

        this.destroySprite(item)

        if (slot === 'flag') {
            this.addFlag(key, slot, item)
            return
        }

        // Always above back sprites
        item.sprite = this.createSprite(key, slot, item.depth + 100)
    }

    addBack(key, slot, parentItem) {
        this.destroyBack(parentItem)

        parentItem.backSprite = this.createSprite(key, slot, parentItem.depth)

        this.updateBackSprites()
    }

    addFlag(key, slot, item) {
        item.sprite = this.createSprite(key, slot, item.depth)

        item.sprite.scale = flagScale
        item.sprite.setPosition(flagX, flagY)
    }

    createSprite(key, slot, depth) {
        const sprite = this.scene.add.image(0, 0, key)

        sprite.depth = depth

        this.fadeInSprite(sprite)

        if (slot === 'photo') {
            this.scene.playerCard.photo.add(sprite)
            sprite.setOrigin(0)

        } else {
            this.add(sprite)
        }

        if (this.isInputEnabled) {
            this.addSpriteInput(slot, sprite)
        }

        this.sort('depth')

        return sprite
    }

    fadeInSprite(sprite) {
        if (!this.fadeIn) {
            return
        }

        sprite.alpha = 0

        this.scene.tweens.add({
            targets: sprite,
            alpha: { from: 0, to: 1 },
            duration: 200
        })
    }

    addSpriteInput(slot, sprite) {
        sprite.setInteractive({
            cursor: 'pointer',
            pixelPerfect: true
        })

        sprite.on('pointerdown', () => this.onSpriteClick(slot))
    }

    onSpriteClick(slot) {
        this.network.send('remove_item', { type: slot })
    }

    removeItems() {
        for (const slot in this.items) {
            this.removeItem(slot)
        }
    }

    removeItem(slot) {
        const item = this.items[slot]

        if (!item) {
            return
        }

        item.id = 0

        this.destroySprite(item)
        this.destroyBack(item)

        this.updateBackSprites()
    }

    destroySprite(item) {
        if (item.sprite) {
            item.sprite.destroy()
            item.sprite = null
        }
    }

    destroyBack(item) {
        if (item.backSprite) {
            item.backSprite.destroy()
            item.backSprite = null
        }
    }

    updateBackSprites() {
        const backs = this.getBackSprites()

        if (!backs.length) {
            return
        }

        const last = backs.pop()

        if (!last.visible) {
            last.visible = true

            this.fadeInSprite(last)
        }

        for (const back of backs) {
            back.visible = false
        }
    }

    getBackSprites() {
        return Object.values(this.items).map(item => item.backSprite).filter(Boolean)
    }

    updateInput() {
        if (this.isInputEnabled) {
            this.enableInput()

        } else {
            this.disableInput()
        }
    }

    /**
    * Enables input on body and paperdoll sprites,
    * does not include clothing items.
    */
    enableInput() {
        this.body.setInteractive({ pixelPerfect: true })
        this.paperdoll.setInteractive({ pixelPerfect: true })
    }

    /**
     * Disables input on body and paperdoll sprites,
     * does not include clothing items.
     */
    disableInput() {
        this.body.removeInteractive()
        this.paperdoll.removeInteractive()
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
