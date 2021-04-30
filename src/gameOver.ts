let background

export default class GameOver extends Phaser.Scene {

    constructor() {
        super('GameOver')
    }

    preload() {
        this.load.image('restart', 'assets/restart.png');
        this.load.image('shop', 'assets/shop.png');
        this.load.audio('gameoverfx', ['assets/audio/gameover.mp3']);
        this.load.audio('click', ['assets/audio/click.mp3'] )

    }
    create() {


        this.sound.play('gameoverfx');
        let character = localStorage.getItem("character")
        //x - y / width -height
        if (character == "knight")
        {
            background = this.add.image(400, 450, 'backgroundknight').setScale(1.5)
        } 
        else if (character == "santa")
        {
            background = this.add.image(400, 450, 'backgroundsanta').setScale(1.5)
        }
        else if (character == "robot")
        {
            background = this.add.image(400, 450, 'backgroundrobot').setScale(1.5)
        }
        else if (character == "temple")
        {
            background = this.add.image(400, 450, 'backgroundtemple').setScale(2)
        }
        let restartButton = this.add.image(200, 600, 'restart').setScale(0.5).setInteractive();
        let shopButton = this.add.image(600, 600, 'shop').setScale(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            this.sound.play('click')
            this.scene.start('game')
        });

        shopButton.on('pointerdown',() => {
            this.sound.play('click')
            this.scene.start('ShopCutscene')
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