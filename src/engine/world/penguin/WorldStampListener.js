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
        const worldStamps = world.cache.xml.get('world_stamps')

        this.stamps = this.parseWorldStamps(worldStamps);
        
        this.stamps.forEach(stamp => {
            this.setupEventListeners(stamp);
        });
    }

    parseWorldStamps(xml) {
        let stamps = [];
        const achievements = xml.getElementsByTagName('achievement');

        for (let i = 0; i < achievements.length; i++) {
            const achievement = achievements[i];

            const id = achievement.getAttribute('id');
            const name = achievement.getAttribute('name');

            const events = achievement.getElementsByTagName('event');
            const eventTypes = [];
            for (let j = 0; j < events.length; j++) {
                eventTypes.push(events[j].textContent.trim());
            }

            const conditions = achievement.getElementsByTagName('condition');
            const conditionList = [];
            for (let j = 0; j < conditions.length; j++) {
                conditionList.push(conditions[j].textContent.trim());
            }

            const optionalConditions = achievement.getElementsByTagName('optionalCondition');
            const optionalList = [];
            for (let j = 0; j < optionalConditions.length; j++) {
                optionalList.push(optionalConditions[j].textContent.trim());
            }

            const result = achievement.getElementsByTagName('result')[0]?.textContent.trim() || null;

            stamps.push({
                id,
                name,
                eventTypes,
                conditionList,
                optionalList,
                result
            });
        }

        return stamps;
    }

    setupEventListeners(stamp) {
        stamp.eventTypes.forEach(eventType => {
            if (eventType.startsWith('every ')) {
                const interval = expressionToMilliseconds(eventType);
                if (interval) {
                    this.setupIntervalListener(stamp, interval);
                } else {
                    console.warn(`Invalid time expression: ${eventType}`);
                }
            }

            else if (eventType.startsWith('user ')) {
                this.world.events.on(eventType, (e) => {
                    this.checkConditions(stamp, e);
                });
            } else {
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
        let conditionsMet = true;
        let optionalConditionsMet = stamp.optionalList.length === 0;

        for (const condition of stamp.conditionList) {
            if (condition.startsWith('event occurs')) {
                // Needs several iterations of the same event to be met
                iterations = condition.split(' ')[2];
            } else if (!this.checkCondition(condition, properties)) {
                conditionsMet = false;
                console.info(`%c Condition not met: ${condition}`, 'color:rgb(255, 124, 84)');
                break; // If any condition is not met, we stop checking
            } else {
                console.info(`%c Condition met: ${condition}`, 'color: #bada55');
            }
        };

        for (const optionalCondition of stamp.optionalList) {
            if (this.checkCondition(optionalCondition, properties)) {
                optionalConditionsMet = true;
                console.info(`%c Optional condition met: ${optionalCondition}`, 'color: #bada55');
                break; // If any optional condition is met, we stop checking
            } else {
                console.info(`%c Optional condition not met: ${optionalCondition}`, 'color:rgb(255, 124, 84)');
            }
        };

        if (conditionsMet && optionalConditionsMet) {
            if (iterations > 1) {
                stamp.iterations = (stamp.iterations || 0) + 1;
                if (stamp.iterations < iterations) {
                    console.info(`%c Not enough iterations for stamp ${stamp.name}. Required: ${iterations}, Current: ${stamp.iterations}`, 'color:rgb(255, 124, 84)');
                    return;
                }
            }
            console.info(`%c All conditions met for stamp ${stamp.name}`, 'color:rgb(21, 143, 10)');
            this.world.network.send('stamp_earned', { id: stamp.result.split(' ')[1] });
        }
    }

    checkCondition(condition, properties) {
        if (condition.startsWith('event hasProperty')) {
            return this.checkForPropertyCondition(condition, properties);
        } else if (condition.startsWith('event isOnFrame')) {
            return properties.frame == condition.split(' ')[2]
        } else if (condition.startsWith('user in')) {
            return this.world.room.id == condition.split(' ')[2]
        } else if (condition.startsWith('user wearing')) {
            return this.checkForWearingCondition(condition)
        } else if (condition.startsWith('user hasProperty')) {
            return this.checkForPropertyCondition(condition, { is_member: 1 });
        } else if (condition.startsWith('event hasEventID')) {
            return properties.eventID == condition.split(' ')[2];
        }
    
        console.warn(`Unknown condition: ${condition}`);
        return false;
    }

    checkForPropertyCondition(condition, properties) {
        // event hasProperty x greaterThan 'number'
        const split = condition.split(' ');
        const property = split[2];
        const operator = split[3];
        const value = ((property == "x" || property == "y") ? 2 : 1) * parseFloat(split[4].replace(/'/g, '')); // Yukon is at 2x scale

        console.info(`%c Checking property condition: ${property} ${operator} ${value}`, 'color: #bada55');

        if (operator === 'greaterThan') {
            return properties[property] > value;
        } else if (operator === 'lessThan') {
            return properties[property] < value;
        } else if (operator === 'equals') {
            return properties[property] === value;
        } else {
            console.warn(`Unknown operator in condition: ${condition}`);
            return false;
        }
    }

    checkForWearingCondition(condition) {
        // user wearing 'item'
        // Examples: 
        // user wearing 262 or 10262
        // user wearing only 274 or 292 or 4257
        // user wearing 4430 and 6091 and 1309 and 3089

        const equippedItems = Object.values(this.client.penguin.items.equippedFlat).filter(item => item !== 0);

        // Remove "user wearing" from the condition
        let cond = condition.replace('user wearing', '').trim();

        // Check for 'only'
        let only = false;
        if (cond.startsWith('only')) {
            only = true;
            cond = cond.replace('only', '').trim();
        }

        // Split by 'or' or 'and'
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

        // Check conditions
        if (operator === 'or') {
            const hasAny = items.some(item => equippedItems.includes(item));
            if (!only) {
                return hasAny;
            } else {
                // Only these items, and at least one is equipped
                return hasAny && equippedItems.every(item => items.includes(item))
            }
        } else if (operator === 'and') {
            const hasAll = items.every(item => equippedItems.includes(item));
            if (!only) {
                return hasAll;
            } else {
                // Only these items, and all are equipped
                return hasAll && equippedItems.every(item => items.includes(item));
            }
        } else { // single
            const hasItem = equippedItems.includes(items[0]);
            if (!only) {
                return hasItem;
            } else {
                // Only this item is equipped
                return hasItem && equippedItems.length === 1 && equippedItems[0] === items[0];
            }
        }
    }

}