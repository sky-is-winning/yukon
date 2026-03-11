// Runs all js files in ./patches

const patches = require.context('./patches', false, /\.js$/)

for (const key of patches.keys()) {
    patches(key)
}
