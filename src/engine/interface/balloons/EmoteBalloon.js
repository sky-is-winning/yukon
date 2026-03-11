import Balloon from './Balloon'


export default class EmoteBalloon extends Balloon {

    constructor(penguin) {
        super(penguin)

        const width = 128
        const height = 68

        this.emote = this.addEmote()

        this.addBalloon(width, height)
        this.addPointer(width, 'balloon-emote')
        this.add(this.emote)

        this.emoteSounds = this.crumbs.sounds.emotes
    }

    show(emote) {
        const emoteExists = this.checkExists(emote)

        const resolvedEmote = emoteExists ? emote : 1

        const frame = this.getTextureKey(resolvedEmote)

        this.emote.setFrame(frame)

        super.show()

        if (resolvedEmote in this.emoteSounds) {
            this.soundManager.play(this.emoteSounds[resolvedEmote])
        }
    }

    checkExists(emote) {
        return this.world.textures.get('main').has(
            this.getTextureKey(emote)
        )
    }

    getTextureKey(emote) {
        return `emotes/${emote}`
    }

    addEmote() {
        const emoteSprite = this.scene.add.image(0, -25, 'main', 'emotes/1')

        return emoteSprite
    }

}
