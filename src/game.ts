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
let firstball
let allballcolider
let coins
let scoreText
let dragon
let gameover = false
if ((localStorage.getItem("character")) == null) { localStorage.setItem('character', 'knight') }
let character
let maxScore = parseInt(localStorage.getItem("maxScore"))
if (isNaN(parseInt(localStorage.getItem("coins")))) { localStorage.setItem('coins', '0') }
let points = parseInt(localStorage.getItem("coins"))
let pointsText
let velocity
let jumpHight
let playerpossafe = 50
let velocityfireball = 200
let bossfightenabled = false
let beatenBoss
let mobile = false
let buttonleft
let buttonright
let buttonjump
let runningleft = false
let runningright = false
let jumping = false


export default class Game extends Phaser.Scene {



    constructor() {
        super('game');
    }
    preload() {



        this.textures.remove("platform")
        for (let i = 1; i <= 16; i++) {
            this.textures.remove(`idle${i}`);
            this.textures.remove(`jump${i}`);
            this.textures.remove(`run${i}`);
        }
        this.anims.remove("running")
        this.anims.remove("Idleing")
        this.anims.remove("jump")

        //character request 
        character = localStorage.getItem("character")
        console.log("character = ", localStorage.getItem("character"))
        //audio
        this.load.audio('Robotbackgroundmusic', ['assets/audio/RobotMusic.mp3']);
        this.load.audio('Santabackgroundmusic', ['assets/audio/JingleBells.mp3']);
        this.load.audio('Templemoviesample', ['assets/audio/indysample.mp3']);
        this.load.audio('Templebackgroundmusic', ['assets/audio/TempleMusic.mp3']);
        this.load.audio('Knightbackgroundmusic', ['assets/audio/KnightMusic.mp3'])
        //audio sound fx
        this.load.audio('coinfx', ['assets/audio/coin.mp3']);
        this.load.audio('jumpfx', ['assets/audio/jump3.mp3']);
        this.load.audio('clickfx', ['assets/audio/click.mp3']);
        this.load.audio('gameoverfx', ['assets/audio/gameover.mp3']);
        this.load.audio('flyingfx', ['assets/audio/flying.mp3']);


        
        gameover = false
        //sprite & image loading
        for (let i = 0; i <= 4; i++) {
            this.load.image(`fireball${i}`, `assets/fireball/Bullet_00${i}.png`);
        }

        for (let i = 1; i <= 4; i++) {
            this.load.image(`fly${i}`, `assets/dragon/dragonflying${i}.png`);
        }

        for (let i = 1; i <= 8; i++) {
            this.load.image(`coin${i}`, `assets/coin/coin_0${i}.png`);
        }

        if (character == "santa") {
            for (let i = 1; i <= 16; i++) {
                this.load.image(`idle${i}`, `assets/santa/Idle (${i}).png`);
                this.load.image(`jump${i}`, `assets/santa/Jump (${i}).png`);
                if (i <= 11) { this.load.image(`run${i}`, `assets/santa/Run (${i}).png`); };
            }

            this.load.image('platform', 'assets/platforms/santaplatform.png');

        } else if (character == "knight") {
            for (let i = 1; i <= 10; i++) {
                this.load.image(`idle${i}`, `assets/knight/Idle (${i}).png`);
                this.load.image(`jump${i}`, `assets/knight/Jump (${i}).png`);
                this.load.image(`run${i}`, `assets/knight/Run (${i}).png`);
            }
            this.load.image('platform', 'assets/platforms/knightplatform.jpg');

        } else if (character == "robot") {
            for (let i = 1; i <= 10; i++) {
                this.load.image(`idle${i}`, `assets/robot/Idle (${i}).png`);
                this.load.image(`jump${i}`, `assets/robot/Jump (${i}).png`);
                if (i <= 8) { this.load.image(`run${i}`, `assets/robot/Run (${i}).png`); };
            }
            this.load.image('platform', 'assets/platforms/robotplatform.png');

        } else if (character == "temple") {
            for (let i = 1; i <= 10; i++) {
                this.load.image(`idle${i}`, `assets/temple/Idle (${i}).png`);
                this.load.image(`jump${i}`, `assets/temple/Jump (${i}).png`);
                this.load.image(`run${i}`, `assets/temple/Run (${i}).png`);
            }
            this.load.image('platform', 'assets/platforms/grassplatform.png');

        }

        this.load.image("arrowbutton", "assets/Button.png");
    }



    create() {
        

        //background sound and music 
        let background
        if (character == "knight") {
            background = this.add.image(400, 450, 'backgroundknight').setScale(1.5)
            backgroundMusic = this.sound.add('Knightbackgroundmusic', { loop: true });
        }
        else if (character == "santa") {
            background = this.add.image(400, 450, 'backgroundsanta').setScale(1.5)
            backgroundMusic = this.sound.add('Santabackgroundmusic', { loop: true });

        }
        else if (character == "robot") {
            background = this.add.image(400, 450, 'backgroundrobot').setScale(1.5)
            backgroundMusic = this.sound.add('Robotbackgroundmusic', { loop: true });

        }
        else if (character == "temple") {
            background = this.add.image(400, 450, 'backgroundtemple').setScale(2)
            backgroundMusic = this.sound.add('Templebackgroundmusic', { loop: true });
            this.sound.add('Templemoviesample', { loop: true });


        }

        backgroundMusic.play();

        //base variables
        velocity = 350
        jumpHight = -1000
        cursors = this.input.keyboard.createCursorKeys()

        background.setScrollFactor(1, 0)

        //dragon loading
        dragon = this.add.sprite(60, -90, 'fly1');
        dragon.setScale(2);
        dragon.setScrollFactor(0);
        dragon.setVisible(false)
        dragon.play('flying', true);

        //animations
        player = this.physics.add.sprite(0, 100, 'idle1')

        this.anims.create({
            key: 'movingfireball',

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
            key: 'flying',

            frames: [
                { key: 'fly1' },
                { key: 'fly2' },
                { key: 'fly3' },
                { key: 'fly4' }

            ],
            frameRate: 5,
            repeat: -1
        });

        if (character == "knight" || character == "temple") {
            if (character == "knight") {
                player.setScale(0.15).setSize(450, 600)
            }
            else if (character == "temple") {
                player.setScale(0.22)
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

        if (character == "santa") {
            player.setScale(0.18) //issue
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

        if (character == "robot") {
            player.setScale(0.23).setSize(300, 500)
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


        //creating starting platforms(these get teleported over the course of the game)
        platforms = this.physics.add.staticGroup()

        for (let i = 0; i < 4; ++i) {
            const x = Phaser.Math.Between(100, 700)
            const y = -300 * i
            
            const platform = platforms.create(x, y, 'platform').setScale(1.1).refreshBody()
        }

        platforms.create(0, 300, 'platform').setScale(1.1).refreshBody()

        const x = Phaser.Math.Between(100, 700)
        const y = 500




        //player platform collider
        this.physics.add.collider(player, platforms)


        //platform collider only top
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
        fireball = this.physics.add.group()

        for( let i = 0; i<3; i++) //spawn 3 fireballs (2 of these get set to invisible and untouchable)
        {
            const ball = fireball.create(dragon.x,player.y-1200-i*500,'fireball1').setScale(0.5).refreshBody().setSize(100,100)
            ball.play('movingfireball',true)
            ball.body.setMaxVelocityY(velocityfireball)
            if (i > 0)
            {
                ball.visible = false
                ball.body.checkCollision.none = true
            } else
            {
                firstball = ball
            }
        }
        
        // colliders with fireballs
        allballcolider = this.physics.add.collider(player,fireball,hitFireball,null,this);
        allballcolider.active = false
        this.physics.add.collider(player,firstball,hitFireball,null,this)

        //camera settings
        this.cameras.main.startFollow(player)
        this.cameras.main.setDeadzone(this.scale.width * 1.5)
        this.cameras.main.setZoom(0.8, 0.8)
        this.cameras.main.centerOnX(400)

        //escape to go to start screen
        this.input.keyboard.on('keydown-ESC', () => {
            this.sound.stopAll()
            this.scene.start('WelcomeScreen')
        })

        //text
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
        //adding upgrades to both velocity and jumpheight
        for (let index = 0; index < parseInt(localStorage.getItem('numberOfSpeedUpgrades')); index++) {
            velocity += 50
        }
        for (let index = 0; index < parseInt(localStorage.getItem('numberOfJumpUpgrades')); index++) {
            jumpHight -= 100
        }
        console.log('velocity = ', velocity)
        console.log('jumpHight = ', jumpHight)

        if (this.sys.game.device.os.desktop){
            mobile = false
        }
        else{
           mobile = true
        }

        runningleft = false
        runningright = false
        jumping = false


        if (mobile)
        {
            buttonleft = this.add.image(50,850 , 'arrowbutton').setInteractive().setScrollFactor(1, 0).setScale(0.5).setDepth(2).setRotation(Math.PI)
            buttonleft.alpha = 0.8
            buttonright = this.add.image(300,850 , 'arrowbutton').setInteractive().setScrollFactor(1, 0).setScale(0.5).setDepth(2)
            buttonright.alpha = 0.8
            buttonjump = this.add.image(700,850 , 'arrowbutton').setInteractive().setScrollFactor(1, 0).setScale(0.5).setDepth(2).setRotation(-Math.PI/2)
            buttonjump.alpha = 0.8

            buttonleft.on('pointerdown',()=>{
                runningleft = true
            })

            buttonright.on('pointerdown',()=>{
                runningright = true
            })

            buttonjump.on('pointerdown',()=>{
                jumping = true
            })

            buttonleft.on('pointerup',()=>{
                runningleft = false
            })

            buttonright.on('pointerup',()=>{
                runningright = false
            })

            buttonjump.on('pointerup',()=>{
                jumping = false
            })
        }
    }

    //gameloop
    update() {
        
        //check for bossfight
        if(bossfightenabled == false && maxScore > 10000 && maxScore < 15000 )
        {
            bossfightenabled = true
            console.log("enable boss fight")
            enablebossfight()
        }
        if(bossfightenabled == true && maxScore > 15000){
            bossfightenabled = false
            console.log("disable boss fight")
            beatenBoss = this.add.text(30, player.y - 500, 'YOU HAVE SLAIN THE DRAGON', {
                fontFamily: 'Arial',
                fontSize: '50px',
                strokeThickness: 5,
                stroke: '#000000',
                color: '#EA6A47'
            });
            disablebossfight()
        }

        //dragon movement
        dragon.x += + direction;
        if (dragon.x == 700) {
            dragon.setFlip(true, false);
            direction = direction * -1
        } else if (dragon.x == 59) {
            dragon.setFlip(false, false);
            direction = direction * -1;
        }


        //fireball shooting
        fireball.children.iterate(child =>{
            const ball = child

            if (ball.y > player.y+600)
            {
                if (direction == 1)
                {
                    ball.x = dragon.x + 100
                }else
                {
                    ball.x = dragon.x - 100
                }
                ball.y = player.y-700
                
            }

        })

        //fireball speeds up the higher you get
        if (playerpossafe-2000 > player.y)
        {   
            playerpossafe =  player.y
            velocityfireball += 20
            console.log("Fireball speeds up")
            fireball.children.iterate(child =>{
                const ball = child
                ball.body.setMaxVelocityY(velocityfireball)
            })
            
        }
        if (this.input.gamepad.total === 1) {
            var pad = this.input.gamepad.getPad(0);
            var axisH = pad.axes[0].getValue();
            var jumpButton = pad.B;
        }





        if (cursors.left.isDown || axisH < 0 || runningleft) {

            playerleft(player)
        }
        else if (cursors.right.isDown || axisH > 0 || runningright) {
            playerright(player)

        }
        else {
            if (player.body.touching.down) { player.play('Idleing', true) }
            player.setVelocityX(0);

        }

        if ((cursors.up.isDown && player.body.touching.down) || (player.body.touching.down && jumpButton == true) || (jumping && player.body.touching.down)) {
            playerjump(player)
            this.sound.play('jumpfx')
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
    input: {
        inputKeyboard: true,
        gamepad: true


    },
    backgroundColor: '#125555',
    width: 800,
    height: 900,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1200 },
            debug: false
        }
    },
    scene: [WelcomeScreen, Game, GameOver, Shop, ShopCutscene, Upgrades, Visuals]
};

const game = new Phaser.Game(config);



function collectCoin(player, coin) {
    coin.destroy()
    this.sound.play('coinfx');
    points++
}

function hitFireball(player)
{
    player.setVelocityY(0)
    bossfightenabled = false
    
    //fireball.visible = false
    player.body.checkCollision.none = true
    player.body.setMaxVelocityX(0)
    player.setVelocityY(0)

}

function enablebossfight()
{
    allballcolider.active = true
    dragon.setVisible(true)
    const balls = fireball.getChildren()
    for(let i = 1; i <=2; i++)
    {
        balls[i].visible = true
        balls[i].body.checkCollision = true
    }


}

function disablebossfight()
{
    allballcolider.active = false
    dragon.setVisible(false)
    const balls = fireball.getChildren()
    
    beatenBoss.visible = true
    for(let i = 1; i <=2; i++)
    {
        balls[i].visible = false
        balls[i].body.checkCollision = false
    }
}

function playerjump(player)
{
    
    player.setVelocityY(jumpHight)
    player.play('jump')
}

function playerleft(player)
{
    player.setVelocityX(velocity * (-1));
    player.setFlipX(true);
    if (player.body.touching.down) { player.play('running', true) }
}

function playerright(player)
{
    player.setVelocityX(velocity * (1));
    player.setFlipX(false);
    if (player.body.touching.down) { player.play('running', true) }
}
