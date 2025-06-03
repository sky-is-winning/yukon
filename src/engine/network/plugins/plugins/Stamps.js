import Plugin from '../Plugin'


export default class Stamps extends Plugin {

    constructor(network) {
        super(network)
        this.events = {
            'stamp_earned': this.stampEarned
        }
    }

    stampEarned(args) {
        this.interface.main.stampEarned(args.id)
        this.world.client.stamps.push(args.id)
    }

}
