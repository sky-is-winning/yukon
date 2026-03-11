export default class BaseContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y)

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

    show() {
        this.visible = true
    }

    close() {
        this.visible = false
    }

}
