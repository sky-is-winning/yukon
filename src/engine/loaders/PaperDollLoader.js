import BaseLoader from './BaseLoader'


export default class PaperDollLoader extends BaseLoader {

    constructor(scene) {
        super(scene)

        this.baseURL = '/assets/media/clothing/'
        this.keyPrefix = 'clothing/'
    }

    getUrl(slot) {
        switch (slot) {
            case 'flag':
                return 'icon/120/'

            case 'photo':
                return 'photos/'

            default:
                return 'paper/'
        }
    }

    loadItem(itemId, slot, callback) {
        if (this.crumbs.items[itemId].back) {
            this.loadBack(itemId, slot, callback)
        }

        const url = this.getUrl(slot)
        const key = this.getKey(url, itemId)

        if (this.checkComplete('image', key, () => {
            this.onFileComplete(itemId, key, slot, callback)
        })) {
            return
        }

        this.image(key, `${url}${itemId}.png`)
    }

    loadBack(itemId, parentSlot, callback) {
        const key = this.getKey('paper/', itemId, '_back')

        if (this.checkComplete('image', key, () => {
            this.onFileComplete(itemId, key, parentSlot, callback, true)
        })) {
            return
        }

        this.image(key, `paper/${itemId}_back.png`)
    }

    onFileComplete(itemId, key, slot, callback, isBack = false) {
        if (!this.textureExists(key)) {
            return
        }

        this.memory.register(key)

        callback(itemId, key, slot, isBack)
    }

}
