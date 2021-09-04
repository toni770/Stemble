import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import EndScene from './scenes/EndScene'

function launch() {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: 1200,
        height: 600,
        parent: 'game-container',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 0},
                debug: false
            }
        },
        scene: [BootScene, PlayScene, EndScene]
    })
}

export default launch
export {launch}
