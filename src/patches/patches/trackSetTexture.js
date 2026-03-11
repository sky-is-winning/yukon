const gameObjects = [
    Phaser.GameObjects.Image,
    Phaser.GameObjects.Sprite
]

for (const gameObject of gameObjects) {
    const proto = gameObject.prototype

    const setTexture = proto.setTexture

    proto.setTexture = function(key, frame) {
        const result = setTexture.call(this, key, frame)

        const memory = this.scene.scene.get('MemoryManager')

        if (memory) {
            memory.trackGameObject(this)
        }

        return result
    }
}
