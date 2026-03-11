import BaseScene from './BaseScene'


export default class BaseUnloadableScene extends BaseScene {

    constructor(key) {
        super(key)

        this.loadedPacks = []
    }

    init() {
        super.init()

        this.load.on('filecomplete', (key, type) =>
            this.onFileComplete(key, type)
        )

        this.events.once('destroy', () =>
            this.onDestroy()
        )
    }

    onFileComplete(key, type) {
        if (type === 'packfile') {
            this.loadedPacks.push(key)
        }
    }

    onDestroy() {
        this.memory.unloadPacks(this.loadedPacks)
    }

}
