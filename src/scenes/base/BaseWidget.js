import BaseContainer from './BaseContainer'


export default class BaseWidget extends BaseContainer {

    _floatingLayer = null

    show() {
        if (this.floatingLayer) {
            this.floatingLayer.bringToTop(this)
        }

        super.show()
    }

    set floatingLayer(floatingLayer) {
        this._floatingLayer = floatingLayer

        if (!this._floatingLayer.exists(this)) {
            this._floatingLayer.add(this)
        }
    }

    get floatingLayer() {
        return this._floatingLayer
    }

}
