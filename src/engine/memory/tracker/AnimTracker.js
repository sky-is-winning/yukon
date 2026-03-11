import KeySetTracker from '@engine/utils/tracker/KeySetTracker'


export default class AnimTracker extends KeySetTracker {

    track(anim) {
        const usedTextures = this.getUsedTextures(anim)

        for (const textureKey of usedTextures) {
            this.add(textureKey, anim.key)
        }
    }

    untrack(anim) {
        const usedTextures = this.getUsedTextures(anim)

        for (const textureKey of usedTextures) {
            this.remove(textureKey, anim.key)
        }
    }

    getUsedTextures(anim) {
        return new Set(anim.frames.map(frame =>
            frame.textureKey
        ))
    }

}
