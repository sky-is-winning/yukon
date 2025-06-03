function expressionToMilliseconds(expression) {
    const timeUnits = {
        'milliseconds': 1,
        'seconds': 1000,
        'minutes': 60000,
        'hours': 3600000,
        'days': 86400000,
    };

    const regex = /every\s+(\d+)\s+(\w+)/i;
    const match = expression.match(regex);

    if (!match) return null;

    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    if (!timeUnits[unit]) return null;

    return value * timeUnits[unit];
}

export default class WorldStampListener {
    constructor(world, client) {
        this.world = world;
        this.client = client;
        this.events = new Phaser.Events.EventEmitter()
        this.world.stampEvents = this.events;
        const worldStamps = world.cache.xml.get('world_stamps')

        this.stamps = this.parseWorldStamps(worldStamps);
        
        this.stamps.forEach(stamp => {
            this.setupEventListeners(stamp);
        });
    }

    parseWorldStamps(xml) {
        const achievements = Array.from(xml.getElementsByTagName('achievement'));
        return achievements.map(achievement => {
            const id = achievement.getAttribute('id');
            const name = achievement.getAttribute('name');
            const eventTypes = Array.from(achievement.getElementsByTagName('event')).map(e => e.textContent.trim());
            const conditionList = Array.from(achievement.getElementsByTagName('condition')).map(c => c.textContent.trim());
            const optionalList = Array.from(achievement.getElementsByTagName('optionalCondition')).map(o => o.textContent.trim());
            const result = achievement.getElementsByTagName('result')[0]?.textContent.trim() || null;
            return { id, name, eventTypes, conditionList, optionalList, result };
        });
    }

    setupEventListeners(stamp) {
        stamp.eventTypes.forEach(eventType => {
            switch (true) {
                case eventType.startsWith('every '): {
                    const interval = expressionToMilliseconds(eventType);
                    if (interval) {
                        this.setupIntervalListener(stamp, interval);
                    } else {
                        console.warn(`Invalid time expression: ${eventType}`);
                    }
                    break;
                }
                case eventType.startsWith('any penguin'):
                case eventType.startsWith('user '): {
                    this.events.on(eventType, (e) => this.checkConditions(stamp, e));
                    break;
                }
                default:
                    console.warn(`Unknown event type: ${eventType}`);
            }
        });
    }

    setupIntervalListener(stamp, interval) {
        setInterval(() => {
            //this.checkConditions(stamp, {interval: true});
        }, interval);
    }

    checkConditions(stamp, properties) {
        console.info(`%c Checking conditions for stamp ${stamp.id} - ${stamp.name}`, 'color:rgb(236, 56, 236)');
        let iterations = 1;
        let iterationsUnique = false;
    
        const conditionsMet = stamp.conditionList.every(condition => {
            if (condition.startsWith('event occurs')) {
                iterations = condition.split(' ').pop()
                iterationsUnique = condition.includes('occursUniquely') ? condition.split(' ')[2] : false;
                return true;
            }
            const met = this.checkCondition(condition, properties);
            console.info(`%c Condition ${met ? 'met' : 'not met'}: ${condition}`, `color:${met ? '#bada55' : 'rgb(255, 124, 84)'}`);
            return met;
        });
    
        const optionalConditionsMet = stamp.optionalList.length === 0 ||
            stamp.optionalList.some(optionalCondition => {
                const met = this.checkCondition(optionalCondition, properties);
                console.info(`%c Optional condition ${met ? 'met' : 'not met'}: ${optionalCondition}`, `color:${met ? '#bada55' : 'rgb(255, 124, 84)'}`);
                return met;
            });
    
        if (conditionsMet && optionalConditionsMet) {
            if (iterations > 1) {
                if (stamp.iterations === undefined) {
                    stamp.iterations = [properties[iterationsUnique]];
                } else {
                    if (iterationsUnique) {
                        if (!stamp.iterations.includes(properties[iterationsUnique])) {
                            console.info(`%c Adding unique iteration for stamp ${stamp.name}`, 'color:rgb(21, 143, 10)');
                            stamp.iterations.push(properties[iterationsUnique]);
                        }
                    } else {
                        stamp.iterations.push(properties[iterationsUnique]);
                    }
                }
                if (stamp.iterations.length < iterations) {
                    console.info(`%c Not enough iterations for stamp ${stamp.name}. Required: ${iterations}, Current: ${stamp.iterations.length}`, 'color:rgb(255, 124, 84)');
                    return;
                }
            }
            console.info(`%c All conditions met for stamp ${stamp.name}`, 'color:rgb(21, 143, 10)');
            this.world.network.send('stamp_earned', { id: stamp.result.split(' ')[1] });
        }
    }

    checkCondition(condition, properties) {
        console.info(`%c Checking condition: ${condition}`, 'color:rgb(85, 216, 218)');
        switch (true) {
            case condition.startsWith('event hasProperty'):
                return this.checkForPropertyCondition(condition, properties);
            case condition.startsWith('event isOnFrame'):
                return properties.frame == condition.split(' ')[2];
            case condition.startsWith('user in'):
                let roomIds = condition.split(' ').slice(2)
                if (roomIds[0] === 'myIgloo') return this.world.room.isClientIgloo
                return roomIds.some(roomId => this.world.room.id == roomId);
            case condition.startsWith('user wearing'):
                return this.checkForWearingCondition(condition);
            case condition.startsWith('user hasProperty'):
                return this.checkForPropertyCondition(condition, { is_member: 1 });
            case condition.startsWith('event hasEventID'):
                return properties.eventID == condition.split(' ')[2];
            case condition.startsWith('event hasEmoteID '):
                return properties.emoteID == condition.split(' ')[3];
            default:
                console.warn(`Unknown condition: ${condition}`);
                return false;
        }
    }

    checkForPropertyCondition(condition, properties) {
        const split = condition.split(' ');
        const property = split[2];
        const operator = split[3];
        const value = ((property === "x" || property === "y") ? 2 : 1) * parseFloat(split[4].replace(/'/g, ''));
    
        console.info(`%c Checking property condition: ${property} ${operator} ${value}`, 'color: #bada55');
    
        const ops = {
            greaterThan: (a, b) => a > b,
            lessThan: (a, b) => a < b,
            equals: (a, b) => a === b
        };
    
        if (ops[operator]) {
            return ops[operator](properties[property], value);
        } else {
            console.warn(`Unknown operator in condition: ${condition}`);
            return false;
        }
    }

    checkForWearingCondition(condition) {
        const equippedItems = Object.values(this.client.penguin.items.equippedFlat).filter(item => item !== 0);
        let cond = condition.replace('user wearing', '').trim();
    
        let only = false;
        if (cond.startsWith('only')) {
            only = true;
            cond = cond.replace('only', '').trim();
        }
    
        let items = [];
        let operator = null;
        if (cond.includes(' or ')) {
            items = cond.split(' or ').map(s => parseInt(s.trim(), 10));
            operator = 'or';
        } else if (cond.includes(' and ')) {
            items = cond.split(' and ').map(s => parseInt(s.trim(), 10));
            operator = 'and';
        } else {
            items = [parseInt(cond.trim(), 10)];
            operator = 'single';
        }
    
        if (operator === 'or') {
            const hasAny = items.some(item => equippedItems.includes(item));
            return only ? hasAny && equippedItems.every(item => items.includes(item)) : hasAny;
        } else if (operator === 'and') {
            const hasAll = items.every(item => equippedItems.includes(item));
            return only ? hasAll && equippedItems.every(item => items.includes(item)) : hasAll;
        } else { // single
            const hasItem = equippedItems.includes(items[0]);
            return only ? hasItem && equippedItems.length === 1 && equippedItems[0] === items[0] : hasItem;
        }
    }

}