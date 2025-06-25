import BaseLoader from './BaseLoader'

const AWARD_IDS = {
    159: 801,
    160: 802,
    161: 803,
    162: 804,
    163: 805,
    164: 806,
    165: 808,
    166: 809,
    167: 810,
    168: 811,
    169: 813,
    170: 814,
    171: 815,
    172: 816,
    173: 817,
    174: 818,
    175: 819,
    176: 820,
    177: 822,
    178: 823,
    179: 8007,
    180: 8008,
}

const ASSET_BASE_URL = location.href

export default class StampbookAssetLoader extends BaseLoader {

    constructor(scene) {
        super(scene)

        this.baseURL = `/assets/media/interface/game/stampbook/`
        this.keyPrefix = 'stampbook-assets/'
    }

    loadCategory(id, callback) {
        const key = this.getKey(`category/${id}`)
        const hoverKey = this.getKey(`category/${id}-hover`)

        this.checkComplete('image', key, () => {
            this.checkComplete('image', hoverKey, () => {
                callback()
            })
        })
        this.image(key, `category/${id}.png`)
        this.image(hoverKey, `category/${id}-hover.png`)

        this.start()
    }

    loadCategoryHeader(id, callback) {
        const key = this.getKey(`category-headers/${id}`)

        this.checkComplete('image', key, () => {
            callback()
        })

        this.image(key, `category-headers/${id}.png`)

        this.start()
    }

    loadClasp(id, callback) {
        const key = this.getKey(`clasp/${id}`)

        this.checkComplete('image', key, () => {
            callback()
        })

        this.image(key, `clasp/${id}.png`)

        this.start()
    }

    loadClaspThumb(id, callback) {
        const key = this.getKey(`clasp-thumb/${id}`)

        this.checkComplete('image', key, () => {
            callback()
        })

        this.image(key, `clasp-thumb/${id}.png`)

        this.start()
    }

    loadColorPattern(id, callback) {
        const key = this.getKey(`color-patterns/${id}`)

        this.checkComplete('image', key, () => {
            callback()
        })

        this.image(key, `color-patterns/${id}.png`)

        this.start()
    }

    loadColorThumb(id, callback) {
        const key = this.getKey(`color-thumb/${id}`)

        this.checkComplete('image', key, () => {
            callback()
        })

        this.image(key, `color-thumb/${id}.png`)

        this.start()
    }

    loadHighlight(id, callback) {
        const key = this.getKey(`highlight/${id}`)

        this.checkComplete('image', key, () => {
            callback()
        })

        this.image(key, `highlight/${id}.png`)

        this.start()
    }

    loadHighlightThumb(id, callback) {
        const key = this.getKey(`highlight-thumb/${id}`)

        this.checkComplete('image', key, () => {
            callback()
        })

        this.image(key, `highlight-thumb/${id}.png`)

        this.start()
    }

    loadInsidePagesBackground(id, callback) {
        const key = this.getKey(`inside-pages-background/${id}`)

        this.checkComplete('image', key, () => {
            callback()
        })

        this.image(key, `inside-pages-background/${id}.png`)

        this.start()
    }

    loadPatternThumb(id, callback) {
        const key = this.getKey(`pattern-thumb/${id}`)

        this.checkComplete('image', key, () => {
            callback()
        })

        this.image(key, `pattern-thumb/${id}.png`)

        this.start()
    }

    loadPolaroid(id, callback) {
        const key = this.getKey(`polaroid/${id}`)

        this.checkComplete('multiatlas', key, () => {
            callback()
        })

        this.multiatlas(`polaroid/${id}.json`)

        this.start()
    }

    loadStamp(id, callback, scale = 2) {
        const key = this.getKey(`stamps/@${scale}x/${id}`)

        this.checkComplete('image', key, () => {
            callback()
        })

        this.image(key, `stamps/@${scale}x/${id}.png`)

        this.start()
    }

    loadAward(id, callback) {
        const key = this.getKey(`stamps/@2x/${id}`)

        this.checkComplete('image', key, () => {
            callback()
        })

        this.image(key, `${ASSET_BASE_URL}assets/media/clothing/icon/120/${AWARD_IDS[id]}.png`)

        this.start()
    }

    loadPolaroid(id, callback) {
        const key = this.getKey(`polaroids/${id}`)

        if (this.checkComplete('multiatlas', key, () => {
            callback()
        })) return

        this.multiatlas(key, `polaroids/${id}.json`, "polaroids")

        this.start()
    }
}