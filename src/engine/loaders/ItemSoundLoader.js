import BaseLoader from './BaseLoader'


export default class ItemSoundLoader extends BaseLoader {

    constructor(scene) {
        super(scene)

        this.baseURL = '/assets/media/sounds/items/'
        this.keyPrefix = 'sounds/items/'
    }

    loadSound(sound, callback) {
        const key = this.getKey(sound)

        if (this.checkComplete('audio', key, () => {
            this.onFileComplete(key, callback)
        })) {
            return
        }

        this.audio(key, `${sound}.mp3`)

        this.start()
    }

    onFileComplete(key, callback) {
        if (!this.audioExists(key)) {
            return
        }

        callback()
    }

    loaderFileExists(key) {
        return this.audioExists(key)
    }

}
