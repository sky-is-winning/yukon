// Merges all crumb files into one

const fs = require('fs')
const path = require('path')

const lang = 'en'
const crumbsDir = path.resolve(__dirname, `../assets/media/crumbs/${lang}`)

const crumbFiles = [
    'agent_quiz',
    'colors',
    'flooring',
    'furniture',
    'games',
    'igloos',
    'items',
    'jokes',
    'missions',
    'penguin',
    'pets',
    'phone_locations',
    'postcards',
    'quick_keys',
    'rooms',
    'safe_messages',
    'secret_frames',
    'sounds',
    'strings',
    'tour_messages',
    'tour_quiz',
    'worlds',
    'cover',
    'stamps',
    'polaroids',
    'widgets',
    'worlds'
]

const crumbs = {}

crumbFiles.forEach(file => {
    crumbs[file] = require(path.resolve(crumbsDir, `${file}.json`))
})

try {
    fs.writeFileSync(path.resolve(crumbsDir, 'crumbs.json'), JSON.stringify(crumbs))
    console.log('Done')
} catch (error) {
    console.log(error)
}
