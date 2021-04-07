
export default class GameOver extends Phaser.Scene {

    constructor() {
        super('GameOver')
    }

    preload() {
        this.load.image('background', 'assets/Background_dungeon.jpg');
        this.load.image('restart', 'assets/restart.png');
        this.load.image('shop', 'assets/shop.png');




    }
    create() {

        //x - y / width -height
        this.add.image(400, 450, 'background').setScale(1.5)
        let restartButton = this.add.image(200, 600, 'restart').setScale(0.5).setInteractive();
        let shopButton = this.add.image(600, 600, 'shop').setScale(0.5).setInteractive();


        restartButton.on('pointerdown', () => {
            this.scene.start('game')
        });

        shopButton.on('pointerdown',() => {
            this.scene.start('shop')
        });

        this.add.text(200, 200, 'You died...', {
            fontFamily: 'Copperplate',
            fontSize: '80px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'
        });


        this.add.text(140, 400, `Score: ${localStorage.getItem('maxScore')} `, {
            fontFamily: 'Arial',
            fontSize: '30px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })

        this.add.text(530, 400, `Coins: ${localStorage.getItem('coins')} `, {
            fontFamily: 'Arial',
            fontSize: '30px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })

    }
}