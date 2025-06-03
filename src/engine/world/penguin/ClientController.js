import PathEngine from './pathfinding/PathEngine'
import WorldStampListener from './WorldStampListener'

export default class ClientController {

    constructor(world, args) {
        this.world = world

        this.interface = world.interface
        this.network = world.network
        this.crumbs = world.crumbs

        this.getString = world.getString

        // Assign user attributes
        let { user, ...attributes } = args
        Object.assign(this, attributes)

        this.id = user.id
        this.joinTime = user.joinTime

        this.iglooOpen = false

        this.lastRoom
        this.activeSeat
        this.lastSledId

        // Item inventory
        this.slots = ['color', 'head', 'face', 'neck', 'body', 'hand', 'feet', 'flag', 'photo', 'award']
        this.inventory = this.initInventory()

        this.sortPostcards()

        // Reference to ClientPenguin object
        this.penguin

        // If expecting emote key combo
        this.emoteKeyPressed = false

        this.lastBalloon = Date.now()
        this.throttleDelay = 100

        // Input
        this.keys = this.crumbs.quick_keys.keys
        this.emotes = this.crumbs.quick_keys.emotes

        this.keyActions = {
            'send_frame': (id) => this.sendFrame(id),
            'send_wave': () => this.sendFrame(25, false),
            'send_sit': () => this.sendSit(this.input.mousePointer),

            'show_crosshair': () => this.showCrosshair(),

            'emote_key': () => this.emoteKeyPressed = true,
            'send_emote': (id) => this.sendEmote(id),
            'send_safe': (id) => this.sendSafe(id),
            'send_joke': () => this.sendJoke()
        }

        this.lockRotation = false

        this.input.on('pointermove', (pointer) => this.onPointerMove(pointer))

        this.input.keyboard.on('keydown', (event) => this.onKeyDown(event))

        this.worldStampListener = new WorldStampListener(this.world, this)
    }

    get isTweening() {
        return this.penguin.isTweening
    }

    get visible() {
        return this.penguin.visible
    }

    get input() {
        return this.interface.main.input
    }

    get isBalloonThrottled() {
        let time = Date.now()

        if (time - this.lastBalloon < this.throttleDelay) {
            return true
        }

        this.lastBalloon = time

        return false
    }

    get isModerator() {
        return this.rank > 1
    }

    get isTourGuide() {
        return this.inventory.head.includes(428)
    }

    get isSecretAgent() {
        return this.inventory.award.includes(800)
    }

    get daysOld() {
        const oneDay = 1000 * 60 * 60 * 24
        const timeDiff = Date.now() - Date.parse(this.joinTime)

        return Math.round(timeDiff / oneDay)
    }

    get mailCount() {
        return this.postcards.length
    }

    get unreadMailCount() {
        return this.postcards.filter(postcard => !postcard.hasRead).length
    }

    initInventory() {
         // Generates object from slots in format: { color: [], head: [], ... }
        let inventory = Object.fromEntries(this.slots.map(slot => [slot, []]))

        // Assigns inventory list to slots
        for (let item of this.inventory) {
            item = parseInt(item)

            if (!(item in this.crumbs.items)) {
                continue
            }

            let type = this.crumbs.items[item].type
            let slot = this.slots[type - 1]

            inventory[slot].push(item)
        }

        return inventory
    }

    onPointerMove(pointer) {
        if (this.interface.main.crosshair?.visible) {
            this.interface.main.onCrosshairMove(pointer)
        }

        if (!this.visible || this.isTweening || this.lockRotation) {
            return
        }

        this.penguin.rotate(pointer.x, pointer.y)
    }

    onPointerUp(pointer, target) {
        if (pointer.button != 0 || !this.visible || this.activeSeat) {
            return
        }

        // Block movement when clicking a button
        if (target[0] && target[0].isButton) {
            return
        }

        this.sendMove(pointer.x, pointer.y)
    }

    onKeyDown(event) {
        let key = event.key.toLowerCase()

        if (this.emoteKeyPressed) {
            this.processEmote(key)
        } else {
            this.processKey(key)
        }
    }

    processEmote(key) {
        this.emoteKeyPressed = false

        if (key in this.emotes) {
            this.sendEmote(this.emotes[key])
        }
    }

    processKey(key) {
        if (key in this.keys) {
            let k = this.keys[key]

            this.keyActions[k.action](k.value || null)
        }
    }

    sendMove(x, y, frame = null) {
        if (!this.visible) {
            return
        }

        this.penguin.move(x, y, frame)
    }

    sendFrame(frame, set = true) {
        if (!this.visible || this.isTweening) {
             return
        }

        this.lockRotation = true

        this.penguin.playFrame(frame, set)
        this.world.events.emit('user changesFrame', { x: this.penguin.x, y: this.penguin.y, frame: frame, set: set })
        this.world.events.emit('user playerAction', { x: this.penguin.x, y: this.penguin.y, frame: frame, set: set })
        this.network.send('send_frame', { set: set, frame: frame })
    }

    sendSit(pointer) {
        if (!this.visible || this.isTweening) {
            return
        }

        this.lockRotation = true

        this.penguin.sit(pointer.x, pointer.y)
    }

    sendSnowball(x, y) {
        if (!this.visible || this.isTweening) {
            return
        }

        this.lockRotation = true

        this.interface.main.snowballFactory.throwBall(this.id, x, y)
        this.network.send('snowball', { x: x, y: y })
    }

    sendEmote(emote) {
        if (!this.visible || this.isBalloonThrottled) {
            return
        }

        this.interface.showEmoteBalloon(this.id, emote)
        this.network.send('send_emote', { emote: emote })
    }

    sendSafe(safe) {
        if (!this.visible || this.isBalloonThrottled) {
            return
        }

        let message = this.interface.main.safe.safeMessagesMap[safe]

        this.interface.showTextBalloon(this.id, message)
        this.network.send('send_safe', { safe: safe })
    }

    sendJoke() {
        const randomJokeId = Phaser.Math.Between(0, this.crumbs.jokes.length - 1)

        this.interface.showTextBalloon(this.id, this.crumbs.jokes[randomJokeId], false)
        this.network.send('send_joke', { joke: randomJokeId })
    }

    sendTour() {
        if (this.penguin.equipped.head.id !== 428) {
            this.interface.prompt.showError('Sorry, you must wear the tour guide\nhat to use this feature')
            return
        }

        const roomName = this.world.room.key.toLowerCase()

        if (roomName in this.crumbs.tour_messages) {
            const roomId = this.world.room.id

            this.interface.showTourMessage(this.id, roomId)
            this.network.send('send_tour', { roomId })
        }
    }

    showCrosshair() {
        if (!this.visible || !this.interface.main) {
            return
        }

        this.interface.main.onSnowballClick()
    }

    sendJoinRoom(id, name, x = 0, y = 0, randomRange = 40) {
        if (this.activeSeat) {
            return this.interface.prompt.showError('Please exit your game before leaving the room')
        }

        this.interface.showLoading(this.getString('joining', name))

        this.lockRotation = false

        let random = PathEngine.getRandomPos(x, y, randomRange)
        this.network.send('join_room', { room: id, x: random.x, y: random.y })
    }

    sendJoinLastRoom() {
        if (!this.world.lastRoom || this.world.room && this.world.lastRoom === this.world.room.id) {
            return
        }

        const room = this.crumbs.scenes.rooms[this.world.lastRoom]

        if (room) {
            this.sendJoinRoom(this.world.lastRoom, room.key, room.x, room.y, 80)
        }
    }

    sendJoinIgloo(id) {
        if (this.world.room.isIgloo && this.world.room.id == id) {
            return
        }

        if (this.activeSeat) {
            return this.interface.prompt.showError('Please exit your game before leaving the room')
        }

        this.interface.showLoading(this.getString('joining', 'igloo'))

        this.lockRotation = false

        this.network.send('join_igloo', { igloo: id, x: 0, y: 0 })
    }

    sendJoinTable(id) {
        this.network.send('join_table', { table: id })
    }

    sendMoveToSeat(id, seat, type = 'table') {
        let container

        switch (type) {
            case 'table':
                container = this.world.room.getTable(id)
                break
            case 'waddle':
                container = this.world.room.getWaddle(id)
                break
        }

        if (!container) {
            return
        }

        seat = container[`seat${seat}`]

        if (seat) {
            this.activeSeat = seat

            let pos = this.getSeatWorldPos(seat)
            this.sendMove(pos.x, pos.y, seat.sitFrame)
        } else {
            this.activeSeat = true
        }
    }

    sendLeaveSeat() {
        if (!this.activeSeat) {
            return
        }

        let done = this.activeSeat.donePoint

        if (done) {
            let pos = this.getSeatWorldPos(done)
            this.sendMove(pos.x, pos.y)
        }

        this.activeSeat = null
        this.world.events.emit('leftseat')
    }

    getSeatWorldPos(seat) {
        let matrix = seat.getWorldTransformMatrix()

        return {
            x: matrix.getX(0, 0),
            y: matrix.getY(0, 0)
        }
    }

    addPostcard(postcard) {
        this.postcards.push(postcard)

        this.refreshPostcards()
    }

    /**
     * Sort by newest first.
     */
    sortPostcards() {
        this.postcards.sort((a, b) => new Date(b.sendDate) - new Date(a.sendDate))
    }

    filterPostcards(filter) {
        this.postcards = this.postcards.filter(postcard => filter(postcard))

        this.refreshPostcards()
    }

    refreshPostcards() {
        this.sortPostcards()

        if (this.interface.main.mail?.visible) {
            // Read mail before updating count
            this.interface.main.mail.goToFirstPage()
        }

        this.interface.main.updateMailCount()
    }

    startWalkingPet(petId) {
        this.network.send('pet_start_walk', { id: petId })
    }

}
