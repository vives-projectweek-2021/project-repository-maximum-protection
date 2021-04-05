import 'phaser';
import { LEFT, NONE } from 'phaser';
import WelcomeScreen from './WelcomeScreen';

let cursors
let player
let platforms
let scoreText
let maxScore = 0
let coin
export default class Game extends Phaser.Scene {



    constructor() {
        super('game');
    }
    preload() {
        this.load.image('platform', 'assets/platform.jpg');
        this.load.image('background', 'assets/Background_dungeon.jpg');

        for (let i = 1; i <= 10; i++) {
            this.load.image(`idle${i}`, `assets/knight/Idle (${i}).png`);
            this.load.image(`jump${i}`, `assets/knight/Jump (${i}).png`);
            this.load.image(`run${i}`, `assets/knight/Run (${i}).png`);
        }
        for (let i = 1; i <= 8; i++) {
            this.load.image(`coin${i}`, `assets/coin/coin_0${i}.png`);
        }

    }



    create() {
        cursors = this.input.keyboard.createCursorKeys()
        const background = this.add.image(400, 450, 'background').setScale(1.5)
        background.setScrollFactor(1, 0)


        player = this.physics.add.sprite(0, 100, 'idle1').setScale(0.15).setSize(450, 600)
        coin = this.add.sprite(100,200,'coin1')
        

        this.anims.create({
            key: 'running',
            frames: [
                { key: 'run1' },
                { key: 'run2' },
                { key: 'run3' },
                { key: 'run4' },
                { key: 'run6' },
                { key: 'run7' },
                { key: 'run8' },
                { key: 'run9' },
                { key: 'run10' }
            ],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'Idleing',
            frames: [
                { key: 'idle1' },
                { key: 'idle2' },
                { key: 'idle3' },
                { key: 'idle4' },
                { key: 'idle6' },
                { key: 'idle7' },
                { key: 'idle8' },
                { key: 'idle9' },
                { key: 'idle10' }
            ],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [
                { key: 'jump1' },
                { key: 'jump2' },
                { key: 'jump3' },
                { key: 'jump4' },
                { key: 'jump6' },
                { key: 'jump7' },
                { key: 'jump8' },
                { key: 'jump9' },
                { key: 'jump10' }
            ],
            frameRate: 5,
            repeat: 1
        });

        this.anims.create({
            key: 'coins',
            frames: [
                { key: 'coin1' },
                { key: 'coin2' },
                { key: 'coin3' },
                { key: 'coin4' },
                { key: 'coin6' },
                { key: 'coin7' },
                { key: 'coin8' }
            ],
            frameRate: 5,
            repeat: -1
        });

        platforms = this.physics.add.staticGroup()

        for (let i = 0; i < 4; ++i) {
            const x = Phaser.Math.Between(100, 700)
            const y = -300 * i

            platforms.create(x, y, 'platform').setScale(0.2).refreshBody()
        }

        platforms.create(0, 300, 'platform').setScale(0.2).refreshBody()


        this.physics.add.collider(player, platforms)


        //camera settings
        this.cameras.main.startFollow(player)
        this.cameras.main.setDeadzone(this.scale.width * 1.5)
        this.cameras.main.setZoom(0.8, 0.8)
        this.cameras.main.centerOnX(400)

        //collision settings for player
        player.body.checkCollision.up = false
        player.body.checkCollision.left = false
        player.body.checkCollision.right = false


        this.input.keyboard.on('keydown-ESC', () => {
            //this.scene.pause('WelcomeScreen') --> doesnt work
            this.scene.start('WelcomeScreen')
        })

        scoreText = this.add.text(750, -100, 'Score', {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'
        }).setScrollFactor(1, 0)

        coin.play('coins',60, true)
        maxScore = 0
    }
    update() {

        if (cursors.left.isDown) {
            player.setVelocityX(-350);
            player.setFlipX(true);
            if (player.body.touching.down) { player.play('running', true) }

        }
        else if (cursors.right.isDown) {
            player.setVelocityX(350);
            player.setFlipX(false);
            if (player.body.touching.down) { player.play('running', true) }

        }
        else {
            if (player.body.touching.down) { player.play('Idleing', true) }
            player.setVelocityX(0);

        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-1000)
            player.play('jump')
        }


        this.horizontalWrap(player)

        platforms.children.iterate(child => {

            const platform = child

            const scrollY = this.cameras.main.scrollY
            if (platform.y >= scrollY + 1500) {
                platform.x = Phaser.Math.Between(20, 780)
                platform.y = platform.y - 1600
                platform.body.updateFromGameObject()
            }
        })
        
        //keep max score
        if(Math.round(player.y * -1) > maxScore){
           maxScore = Math.round(player.y * -1)
        }
        
        scoreText.setText("score: " + maxScore)
        //this.data.set('maxScore', maxScore)
        localStorage.setItem('maxScore', maxScore.toString())
    }



    horizontalWrap(sprite) {
        const halfWidth = sprite.displayWidth * 0.5
        const gameWidth = this.scale.width
        if (sprite.x < -halfWidth) {
            sprite.x = gameWidth + halfWidth
        }
        else if (sprite.x > gameWidth + halfWidth) {
            sprite.x = -halfWidth
        }
    }



}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 900,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1200 },
            debug: true
        }
    },
    scene: [WelcomeScreen, Game]
};

const game = new Phaser.Game(config);
