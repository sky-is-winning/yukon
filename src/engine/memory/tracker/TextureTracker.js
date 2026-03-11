import KeySetTracker from '@engine/utils/tracker/KeySetTracker'


export default class TextureTracker extends KeySetTracker {

    // Active game objects mapped to their current texture key
    objectToTexture = new Map()

    track(gameObject) {
        const textureKey = gameObject.texture.key
        const isFirstTrack = !this.objectToTexture.has(gameObject)

        this.setObjectTexture(gameObject, textureKey)

        this.add(textureKey, gameObject)

        if (isFirstTrack) {
            gameObject.once('destroy', () => this.untrack(gameObject))
        }
    }

    untrack(gameObject) {
        const textureKey = this.objectToTexture.get(gameObject)

        this.remove(textureKey, gameObject)

        this.objectToTexture.delete(gameObject)
    }

    setObjectTexture(gameObject, textureKey) {
        const prevKey = this.objectToTexture.get(gameObject)

        if (prevKey) {
            this.remove(prevKey, gameObject)
        }

        this.objectToTexture.set(gameObject, textureKey)
    }

}
