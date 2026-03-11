export default function drawFrame(scene) {
    const graphics = scene.add.graphics()
    const frameColor = scene.crumbs.frameColor

    graphics.lineStyle(16, frameColor, 1)
    graphics.strokeRoundedRect(0, 0, 1520, 960, 15)

    graphics.depth = 100
}
