export default class BaseSprite extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.crumbs = scene.crumbs
        this.network = scene.network
        this.soundManager = scene.soundManager

        this.interface = scene.interface
        this.memory = scene.memory
        this.ruffle = scene.ruffle
        this.world = scene.world
    }

    getString(...args) {
        return this.scene.getString(...args)
    }

    getFormatString(id, ...args) {
        return this.scene.getFormatString(id, ...args)
    }

}
