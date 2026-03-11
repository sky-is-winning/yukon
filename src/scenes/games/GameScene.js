import BaseUnloadableScene from '@scenes/base/BaseUnloadableScene'


export default class GameScene extends BaseUnloadableScene {

    constructor(key) {
        super(key)

        this.key = key
    }

    get client() {
        return this.world.client
    }

    getColor(color) {
        return this.world.getColor(color)
    }

    init({ id }) {
        super.init()

        this.id = id
    }

    create() {
        this._create()

        this.setMusic()

        this.interface.hideLoading()
        this.interface.bringToTop()

        this.world.client.activeSeat = null
    }

    preload() {
        this._preload()
    }

    stop() {
        this.soundManager.stopAllButMusic()

        this.scene.remove()
    }

    onDestroy() {
        super.onDestroy()

        this.world.interface.unloadWidgets()

        if (this.music) {
            this.memory.unloadAudio(this.music)
        }
    }

}
