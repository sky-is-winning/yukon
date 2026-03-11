export default class BaseScene extends Phaser.Scene {

    init() {
        this.crumbs = this.game.crumbs
        this.network = this.game.network
        this.soundManager = this.game.soundManager

        this.interface = this.scene.get('InterfaceController')
        this.memory = this.scene.get('MemoryManager')
        this.ruffle = this.scene.get('RuffleController')
        this.world = this.scene.get('WorldController')

        this.input.on('pointerover', () => this.interface.resetCursor(this))
    }

    getString(...args) {
        return args.map(id => this.crumbs.strings[id.toLowerCase()] || id).join(' ')
    }

    getFormatString(id, ...args) {
        return Phaser.Utils.String.Format(this.crumbs.strings[id.toLowerCase()], args)
    }

    setMusic() {
        if (this.music) {
            this.playMusic(this.music)
        } else {
            this.stopMusic()
        }
    }

    playMusic(key) {
        this.soundManager?.playMusic(key)
    }

    stopMusic() {
        this.soundManager?.stopMusic()
    }

}
