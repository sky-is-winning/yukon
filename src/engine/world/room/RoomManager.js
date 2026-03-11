export default class RoomManager {

    constructor(scene) {
        this.scene = scene

        this.crumbs = scene.crumbs

        this.loadId = 0
        this.room = null
    }

    joinRoom(roomId, users) {
        const { key, path } = this.crumbs.rooms[roomId]

        this.loadScene(key, `rooms/${path}`, { id: roomId, users })
    }

    joinIgloo(args) {
        const { key, path } = this.crumbs.igloos[args.type]

        this.loadScene(key, `igloos/${path}`, args)
    }

    joinGameRoom(gameId) {
        const { key, path, music } = this.crumbs.games[gameId]

        if (path.endsWith('.swf')) {
            this.addFlashGame(path, music)
            return
        }

        this.loadScene(key, `games/${path}`, { id: gameId })
    }

    async loadScene(key, path, data = {}) {
        this.removeCurrent()

        const loadId = ++this.loadId

        const sceneClass = await this.loadSceneClass(path)

        if (sceneClass && loadId === this.loadId) {
            this.addRoom(key, sceneClass, data)
        }
    }

    addRoom(key, scene, data) {
        this.room = this.scene.scene.add(key, scene, true, data)
    }

    addFlashGame(path, music) {
        this.removeCurrent()

        this.scene.scene.run(this.scene.ruffle)

        this.scene.ruffle.bootGame(path, music)
    }

    removeCurrent() {
        this.removeRoom()
        this.removeGame()
    }

    removeRoom() {
        this.room?.stop()
        this.room = null
    }

    removeGame() {
        this.scene.ruffle.stop()
    }

    async loadSceneClass(path) {
        try {
            const sceneClass = (await import(
                /* webpackInclude: /\.js$/ */
                `@scenes/${path}`
            )).default

            return sceneClass

        } catch (error) {
            console.error(error)

            return null
        }
    }

}
