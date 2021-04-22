import { MouseConstraint } from 'matter';
import 'phaser';
import { LEFT, NONE, Physics } from 'phaser';
import GameOver from './gameOver';
import Shop from './shop';
import ShopCutscene from './shopCutscene';
import Upgrades from './Upgrades';
import Visuals from './Visuals';
import WelcomeScreen from './welcomeScreen';

let cursors
let backgroundMusic
let player
let direction = 1;
let platforms
let fireball
let coins
let scoreText
let dragon
let gameover = false
if( (localStorage.getItem("character")) == null ){localStorage.setItem('character','knight')}
let character
let maxScore= parseInt(localStorage.getItem("maxScore"))
if(isNaN(parseInt(localStorage.getItem("coins")))){localStorage.setItem('coins','0')}
let points = parseInt(localStorage.getItem("coins"))
let pointsText 
let velocity
let jumpHight
let playerpossafe = 50
let velocityfireball = 200

export default class Game extends Phaser.Scene {



    constructor() {
        super('game');
    }
    preload() {

        for (let i = 1; i <= 16; i++) {
            this.textures.remove(`idle${i}`);
            this.textures.remove(`jump${i}`);
            this.textures.remove(`run${i}`);
        }
        this.anims.remove("running")
        this.anims.remove("Idleing")
        this.anims.remove("jump")
        
        //audio BG music
        character = localStorage.getItem("character")
        console.log("character = ", localStorage.getItem("character"))
        //audio
        if (character == 'robot'){
            this.load.audio('backgroundmusic',['assets/audio/RobotMusic.mp3'] );
        }else if (character == 'santa'){
            this.load.audio('backgroundmusic', ['assets/audio/JingleBells.mp3']);
        }else if (character == 'santa'){
            this.load.audio('backgroundmusic', ['assets/audio/JingleBells.mp3']);
        }else if (character == 'temple'){
            this.load.audio('moviesample', ['assets/audio/indysample.mp3']);
            this.load.audio('backgroundmusic', ['assets/audio/TempleMusic.mp3']);
        }else if (character == 'knight'){
            this.load.audio('backgroundmusic', ['assets/audio/KnightMusic.mp3']);
        } 
        //audio sound fx
        this.load.audio('coinfx', ['assets/audio/coin.mp3']);
        this.load.audio('jumpfx', ['assets/audio/jump3.mp3']);
        this.load.audio('clickfx', ['assets/audio/click.mp3']);
        this.load.audio('gameoverfx', ['assets/audio/gameover.mp3']);
        this.load.audio('flyingfx', ['assets/audio/flying.mp3']);


        //sprites & images
        gameover = false
        this.load.image('platform', 'assets/platform.jpg');

        for (let i = 0; i <= 4; i++)
        {
            this.load.image(`fireball${i}`, `assets/fireball/Bullet_00${i}.png`);
        }

        for (let i = 1; i <= 4; i++) {
            this.load.image(`fly${i}`, `assets/dragon/dragonflying${i}.png`);
        }

        for (let i = 1; i <= 8; i++) {
            this.load.image(`coin${i}`, `assets/coin/coin_0${i}.png`);
        }

        if (character == "santa")
        {
            for (let i = 1; i <= 16; i++) {
                this.load.image(`idle${i}`, `assets/santa/Idle (${i}).png`);
                this.load.image(`jump${i}`, `assets/santa/Jump (${i}).png`);
                if(i <= 11){this.load.image(`run${i}`, `assets/santa/Run (${i}).png`);};
                
            }

        }else if (character == "knight")
        {
            for (let i = 1; i <= 10; i++) {
                this.load.image(`idle${i}`, `assets/knight/Idle (${i}).png`);
                this.load.image(`jump${i}`, `assets/knight/Jump (${i}).png`);
                this.load.image(`run${i}`, `assets/knight/Run (${i}).png`);
            }
        } else if (character == "robot")
        {
            for (let i = 1; i <= 10; i++) {
                this.load.image(`idle${i}`, `assets/robot/Idle (${i}).png`);
                this.load.image(`jump${i}`, `assets/robot/Jump (${i}).png`);
                if(i <= 8){this.load.image(`run${i}`, `assets/robot/Run (${i}).png`);};
            }
        } else if (character == "temple")
        {
            for (let i = 1; i <= 10; i++) {
                this.load.image(`idle${i}`, `assets/temple/Idle (${i}).png`);
                this.load.image(`jump${i}`, `assets/temple/Jump (${i}).png`);
                this.load.image(`run${i}`, `assets/temple/Run (${i}).png`);
            }
        }
    }



    create() {
        

        //play background music

        var backgroundMusic = this.sound.add('backgroundmusic', {loop: true});
        backgroundMusic.play();
        
        if(character == 'temple')
        {
            var sampleplay = this.sound.add('moviesample');
            sampleplay.play();
        }

        //variables
        velocity = 350
        jumpHight = -1000
        cursors = this.input.keyboard.createCursorKeys()
        const background = this.add.image(400, 450, 'background').setScale(1.5)
        background.setScrollFactor(1, 0)

        //dragon logic
        dragon = this.add.sprite(60, -90,'fly1');
        dragon.setScale(2); 
        dragon.setScrollFactor(0);

        //player
        player = this.physics.add.sprite(0, 100, 'idle1')

        this.anims.create({
            key:'movingfireball',

            frames: [
                { key: 'fireball0' },
                { key: 'fireball1' },
                { key: 'fireball2' },
                { key: 'fireball3' },
                { key: 'fireball4' }

            ],
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key:'flying',

            frames: [
                { key: 'fly1' },
                { key: 'fly2' },
                { key: 'fly3' },
                { key: 'fly4' }

            ],
            frameRate: 5,
            repeat: -1
        });

        if (character == "knight" || character == "temple")
        {
            if (character == "knight")
            {
                player.setScale(0.15).setSize(450, 600)
            }
            else if (character == "temple")
            {
                player.setScale(0.2)
            }
            
            this.anims.create({
                key: 'running',
                frames: [
                    { key: 'run1' },
                    { key: 'run2' },
                    { key: 'run3' },
                    { key: 'run4' },
                    { key: 'run5' },
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
                    { key: 'idle5' },
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
                    { key: 'jump5' },
                    { key: 'jump6' },
                    { key: 'jump7' },
                    { key: 'jump8' },
                    { key: 'jump9' },
                    { key: 'jump10' }
                ],
                frameRate: 5,
                repeat: 1
            });
        }

        if (character == "santa")
        {
            player.setScale(0.15) //issue
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
                    { key: 'run10' },
                    { key: 'run11' }

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
                    { key: 'idle5' },
                    { key: 'idle6' },
                    { key: 'idle7' },
                    { key: 'idle8' },
                    { key: 'idle9' },
                    { key: 'idle10' },
                    { key: 'idle11' },
                    { key: 'idle12' },
                    { key: 'idle13' },
                    { key: 'idle14' },
                    { key: 'idle15' },
                    { key: 'idle16' }
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
                    { key: 'jump5' },
                    { key: 'jump6' },
                    { key: 'jump7' },
                    { key: 'jump8' },
                    { key: 'jump9' },
                    { key: 'jump10' },
                    { key: 'jump11' },
                    { key: 'jump12' },
                    { key: 'jump13' },
                    { key: 'jump14' },
                    { key: 'jump15' },
                    { key: 'jump16' },
                ],
                frameRate: 10,
                repeat: 1
            });
        }

        if (character == "robot")
        {
            player.setScale(0.2).setSize(350, 500)
            this.anims.create({
                key: 'running',
                frames: [
                    { key: 'run1' },
                    { key: 'run2' },
                    { key: 'run3' },
                    { key: 'run4' },
                    { key: 'run6' },
                    { key: 'run7' },
                    { key: 'run8' }
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
                    { key: 'idle5' },
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
                    { key: 'jump5' },
                    { key: 'jump6' },
                    { key: 'jump7' },
                    { key: 'jump8' },
                    { key: 'jump9' },
                    { key: 'jump10' }
                ],
                frameRate: 5,
                repeat: 1
            });
        }
       
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

            const platform = platforms.create(x, y, 'platform').setScale(1.1).refreshBody()
        }

        platforms.create(0, 300, 'platform').setScale(1.1).refreshBody()

        const x = Phaser.Math.Between(100,700)
        const y = 500

      
        

        //colliders
        this.physics.add.collider(player, platforms)


        //platform collider
        platforms.getChildren().forEach(function (platform) {
            platform.body.checkCollision.down = false
            platform.body.checkCollision.right = false
            platform.body.checkCollision.left = false
        }, this);


        //coins
        coins = this.physics.add.group()
        this.physics.add.overlap(player, coins, collectCoin, null, this);
        points = parseInt(localStorage.getItem("coins"))

        //fireball
        fireball = this.physics.add.sprite(dragon.x,player.y-1200,'fireball1').setScale(0.5).refreshBody()
        fireball.setSize(100,100)
        fireball.play('movingfireball',true)
        fireball.body.setMaxVelocityY(velocityfireball)
        this.physics.add.overlap(player,fireball,hitFireball,null,this);

        //camera settings
        this.cameras.main.startFollow(player)
        this.cameras.main.setDeadzone(this.scale.width * 1.5)
        this.cameras.main.setZoom(0.8, 0.8)
        this.cameras.main.centerOnX(400)

        this.input.keyboard.on('keydown-ESC', () => {
            //this.scene.pause('WelcomeScreen') --> doesnt work
            this.scene.start('WelcomeScreen')
        })

        scoreText = this.add.text(750, -100, '', {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'
        }).setScrollFactor(1, 0)


        pointsText = this.add.text(750, -50, 'Coins: ', {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'
        }).setScrollFactor(1, 0)

        //set Velocity to the right parameter
        maxScore = 0
        for (let index = 0; index < parseInt(localStorage.getItem('numberOfSpeedUpgrades')); index++) {     
            velocity += 50
        }
        for (let index = 0; index < parseInt(localStorage.getItem('numberOfJumpUpgrades')); index++) {     
            jumpHight -= 100
        }
        console.log('velocity = ', velocity)
        console.log('jumpHight = ', jumpHight)


        

    }
    update() {

        //dragon movement
        dragon.play('flying', true);
        dragon.setVisible(false)

        

        dragon.x += + direction;
        if (dragon.x == 700) {
            dragon.setFlip(true, false);
            direction = direction * -1
        } else if (dragon.x == 59) {
            dragon.setFlip(false, false);
            direction = direction * -1;
        }


        //player movement
        if (fireball.y > player.y+600)
        {
            if (direction == 1)
            {
                fireball.x = dragon.x + 100
            }else
            {
                fireball.x = dragon.x - 100
            }
            fireball.y = player.y-700
            
        }
        
        if (playerpossafe-5000 > player.y)
        {   
            playerpossafe =  player.y
            velocityfireball += 20
            console.log("Fireball speeds up")
            fireball.body.setMaxVelocityY(velocityfireball)

        }
       

        if (cursors.left.isDown) {
            player.setVelocityX(velocity * (-1));
            player.setFlipX(true);
            if (player.body.touching.down) { player.play('running', true) }

        }
        else if (cursors.right.isDown) {
            player.setVelocityX(velocity);
            player.setFlipX(false);
            if (player.body.touching.down) { player.play('running', true) }

        }
        else {
            if (player.body.touching.down) { player.play('Idleing', true) }
            player.setVelocityX(0);

        }

        if (cursors.up.isDown && player.body.touching.down) {
            this.sound.play('jumpfx')
            player.setVelocityY(jumpHight)
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

                this.addCoinAbove(platform)
            }
        })

        //keep max score
        if (Math.round(player.y * -1) > maxScore) {
            maxScore = Math.round(player.y * -1)
        }

        scoreText.setText("Score: " + maxScore)
        pointsText.setText("Coins: " + points)
        //this.data.set('maxScore', maxScore)
        localStorage.setItem('maxScore', maxScore.toString())
        localStorage.setItem('coins', points.toString())



        //checking for game over!
        const bottomPlatform = this.findBottomPlatform()
        if (player.y > bottomPlatform.y + 2000) {
            this.cameras.main.stopFollow()
            console.log('under last platform')
        }
        if (player.y > bottomPlatform.y + 3000 || gameover == true) {
            console.log('game over')   
            this.game.sound.stopAll(); 
            this.scene.start('GameOver');

           //this.scene.start('Shop')
        }


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

    addCoinAbove(sprite) {
        const y = sprite.y - sprite.displayHeight

        const coin = coins.create(Phaser.Math.Between(0, 800), y - 100, 'coin1')
        coin.play('coins')

        // update the physics body size
        coin.body.setSize(coin.width, coin.height)
        coin.body.setAllowGravity(false)
        coin.body.checkCollision.up = false


        return coin
    }

    findBottomPlatform() {
        //getting an array of all platforms
        const plats = platforms.getChildren()
        let bottomPlatform = plats[0]

        for (let i = 1; i < plats.length; i++) {
            const platform = plats[i]

            if (plats.y < bottomPlatform.y) {
                //this skips to the end of the for loop
                continue
            }

            bottomPlatform = platform
        }

        return bottomPlatform
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
    scene: [WelcomeScreen, Game, GameOver, Shop, ShopCutscene,Upgrades, Visuals]
};

const game = new Phaser.Game(config);



function collectCoin(player, coin) {
    coin.destroy()
    this.sound.play('coinfx');
    points++
}

function hitFireball(player,fireball)
{
    gameover = true

}
