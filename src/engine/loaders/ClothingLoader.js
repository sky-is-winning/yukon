import BaseLoader from './BaseLoader'

import ItemSoundLoader from './ItemSoundLoader'
import SecretFramesLoader from './SecretFramesLoader'

import adjustRedemptionItem from '@engine/world/penguin/frames/adjustRedemptionItem'


export default class ClothingLoader extends BaseLoader {

    constructor(scene) {
        super(scene)

        this.maxParallelDownloads = 10

        this.baseURL = '/assets/media/clothing/sprites/'
        this.keyPrefix = 'clothing/sprites/'

        this.soundLoader = new ItemSoundLoader(scene)
        this.framesLoader = new SecretFramesLoader(scene)
    }

    loadItem(itemId, callback) {
        const key = this.getKey(itemId)

        if (this.checkComplete('json', key, () =>
            this.onFileComplete(itemId, key, callback)
        )) {
            return
        }

        this.multiatlas(key, `${itemId}.json`)
    }

    onFileComplete(itemId, key, callback) {
        if (!this.textureExists(key)) {
            return
        }

        this.loadExtras(itemId, () => {
            this.memory.register(key)
            callback()
        })
    }

    loadExtras(itemId, callback) {
        const adjustedId = adjustRedemptionItem(itemId)

        const secretFrames = this.crumbs.itemsToFrames[adjustedId]
        const sound = this.crumbs.sounds.items[adjustedId]

        let remaining = 0

        const checkComplete = () => {
            if (remaining < 1) {
                callback()
            }
        }

        const onExtraComplete = () => {
            remaining--
            checkComplete()
        }

        if (secretFrames) {
            remaining += secretFrames.length
            this.loadSecretFrames(secretFrames, onExtraComplete)
        }

        if (sound) {
            remaining++
            this.loadSound(sound, onExtraComplete)
        }

        checkComplete()
    }

    loadSecretFrames(secretFrames, callback) {
        this.framesLoader.loadFrames(secretFrames, callback)
    }

    loadSound(sound, callback) {
        this.soundLoader.loadSound(sound, callback)
    }

}
