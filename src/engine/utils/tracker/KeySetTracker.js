/**
 * Tracks a mapping from keys to sets of values.
 */
export default class KeySetTracker {

    map = new Map()

    add(key, value) {
        if (!this.map.has(key)) {
            this.map.set(key, new Set())
        }

        this.map.get(key).add(value)
    }

    remove(key, value) {
        const set = this.map.get(key)

        if (!set) {
            return
        }

        set.delete(value)

        if (set.size === 0) {
            this.map.delete(key)
        }
    }

    get(key) {
        return this.map.get(key)
    }

    has(key) {
        return this.map.has(key)
    }

}
