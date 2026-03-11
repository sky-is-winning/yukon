import BaseWidget from './BaseWidget'


export default class BaseDynamicWidget extends BaseWidget {

    close() {
        super.close()

        this.destroyTweens(this)

        this.once('destroy', () => this.interface.removeWidget(this))
        this.destroy()
    }

    // Recursively destroy tweens
    destroyTweens(container) {
        this.scene.tweens.killTweensOf(container)

        container.each(child => {
            this.scene.tweens.killTweensOf(child)

            if (child.type === 'Container') {
                this.destroyTweens(child)
            }
        })
    }

}
