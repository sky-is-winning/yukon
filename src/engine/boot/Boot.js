import BaseScene from '@scenes/base/BaseScene'

import Load from '@scenes/interface/menus/load/Load'
import Preload from '@engine/boot/Preload'

import drawFrame from '@engine/interface/frame/drawFrame'


export default class Boot extends BaseScene {

    create() {
        drawFrame(this)

        this.scene.add('Load', Load)

        this.interface.loading.events.once('create', () => this.onLoadCreate())
        this.interface.showLoading('Loading Content', true)
    }

    onLoadCreate() {
        this.scene.add('Preload', Preload, true)
        this.scene.bringToTop(this)
    }

}
