import BaseLoader from './BaseLoader'


export default class SecretFramesLoader extends BaseLoader {

    constructor(scene) {
        super(scene)

        this.baseURL = '/assets/media/penguin/actions/'
        this.keyPrefix = 'secret_frames/'
    }

    loadFrames(frames, callback) {
        for (const frame of frames) {
            this.loadFrame(frame, callback)
        }

        this.start()
    }

    loadFrame(frame, callback) {
        const key = this.getKey(frame)

        if (this.checkComplete('json', key, () =>
            this.onFileComplete(key, callback)
        )) {
            return
        }

        this.multiatlas(key, `${frame}.json`)
    }

    onFileComplete(key, callback) {
        if (!this.textureExists(key)) {
            return
        }

        callback()
    }

}
