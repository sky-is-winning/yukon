export default class BaseLoader extends Phaser.Loader.LoaderPlugin {

    constructor(scene) {
        super(scene)

        this.on('loaderror', this.onLoadError, this)
    }

    get crumbs() {
        return this.scene.crumbs
    }

    get network() {
        return this.scene.network
    }

    get interface() {
        return this.scene.interface
    }

    get world() {
        return this.scene.world
    }

    get memory() {
        return this.scene.memory
    }

    getKey(...args) {
        const key = args.join('')
        const prefix = this.keyPrefix || ''

        return `${prefix}${key}`
    }

    getKeyId(key) {
        const split = key.split('/')
        const last = split[split.length - 1]

        return parseInt(last)
    }

    onLoadError() {

    }

    checkComplete(type, key, callback = () => {}) {
        if (this.loaderFileExists(key)) {
            callback()
            return true
        }

        const event = `filecomplete-${type}-${key}`

        this.once(event, callback)

        return false
    }

    loaderFileExists(key) {
        return this.textureExists(key)
    }

    textureExists(key) {
        return this.scene.textures.exists(key)
    }

    jsonExists(key) {
        return this.scene.cache.json.exists(key)
    }

    audioExists(key) {
        return this.scene.cache.audio.exists(key)
    }

}
