
let sprite
let coins
let character = localStorage.getItem("character")
let upgrades
let visuals
let inSubScene
let background

export default class Shop extends Phaser.Scene {


    constructor() {
        super('Shop')
    }

    preload() {
        this.load.image('shop-keeper', 'assets/shop/Shop-Keeper.png');
        this.load.image('upgrades', 'assets/shop/upgrades.png');
        this.load.image('Visuals', 'assets/shop/Visuals.png');
        this.load.audio('click', ['assets/audio/click.mp3'] );
        //load platforms
        this.load.image('santaplatform', 'assets/platforms/santaplatform.png');
        this.load.image('knightplatform', 'assets/platforms/knightplatform.jpg');
        this.load.image('robotplatform', 'assets/platforms/robotplatform.png');
        this.load.image('grassplatform', 'assets/platforms/grassplatform.png');
        
        //santa
        for (let i = 1; i <= 16; i++) {
            this.load.image(`santa${i}`, `assets/santa/Idle (${i}).png`);
            
        };
        //knight
        for (let i = 1; i <= 10; i++) {
            this.load.image(`knight${i}`, `assets/knight/Idle (${i}).png`);
        }
        //robot
        for (let i = 1; i <= 10; i++) {
            this.load.image(`robot${i}`, `assets/robot/Idle (${i}).png`);
        }
        //temple
        for (let i = 1; i <= 10; i++) {
            this.load.image(`temple${i}`, `assets/temple/Idle (${i}).png`);
        }

    }
    create() {

        this.anims.create({
            key: 'knightidle',
            frames: [
                { key: 'knight1' },
                { key: 'knight2' },
                { key: 'knight3' },
                { key: 'knight4' },
                { key: 'knight5' },
                { key: 'knight6' },
                { key: 'knight7' },
                { key: 'knight8' },
                { key: 'knight9' },
                { key: 'knight10' }
            ],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'templeidle',
            frames: [
                { key: 'temple1' },
                { key: 'temple2' },
                { key: 'temple3' },
                { key: 'temple4' },
                { key: 'temple5' },
                { key: 'temple6' },
                { key: 'temple7' },
                { key: 'temple8' },
                { key: 'temple9' },
                { key: 'temple10' }
            ],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'santaidle',
            frames: [
                { key: 'santa1' },
                { key: 'santa2' },
                { key: 'santa3' },
                { key: 'santa4' },
                { key: 'santa5' },
                { key: 'santa6' },
                { key: 'santa7' },
                { key: 'santa8' },
                { key: 'santa9' },
                { key: 'santa10' },
                { key: 'santa11' },
                { key: 'santa12' },
                { key: 'santa13' },
                { key: 'santa14' },
                { key: 'santa15' },
                { key: 'santa16' }
            ],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'robotidle',
            frames: [
                { key: 'robot1' },
                { key: 'robot2' },
                { key: 'robot3' },
                { key: 'robot4' },
                { key: 'robot5' },
                { key: 'robot6' },
                { key: 'robot7' },
                { key: 'robot8' },
                { key: 'robot9' },
                { key: 'robot10' }
            ],
            frameRate: 20,
            repeat: -1
        });
        
        
        //x - y / width -height
        if (character == "knight")
        {
            background = this.add.image(400, 450, 'backgroundknight').setScale(1.2).setDepth(-2)
        } 
        else if (character == "santa")
        {
            background = this.add.image(400, 450, 'backgroundsanta').setScale(1.2).setDepth(-2)
        }
        else if (character == "robot")
        {
            background = this.add.image(400, 450, 'backgroundrobot').setScale(1.1).setDepth(-2)
        }
        else if (character == "temple")
        {
            background = this.add.image(400, 450, 'backgroundtemple').setScale(1.7).setDepth(-2)
        }
        this.add.image(250, 628, 'shop-keeper')
        //ground generation
        
        
        sprite = this.add.sprite(850, 720, 'idle1').setScale(0.23)

        sprite.setFlipX(true)
        sprite.play('running')

        upgrades = this.add.image(600, 200, 'upgrades').setScale(0.3).setInteractive()
        visuals = this.add.image(200, 200, 'Visuals').setScale(0.3).setInteractive()


        upgrades.on('pointerdown', () => {
            this.sound.play('click')
            this.scene.run('Upgrades')
            upgrades.visible = false
            visuals.visible = false
            inSubScene = true
        });

        visuals.on('pointerdown',()=>{
            this.sound.play('click')
            this.scene.run('Visuals')
            upgrades.visible = false
            visuals.visible = false
            inSubScene = true
        })

        coins = this.add.text(800, 590, `Coins: ${localStorage.getItem('coins')} `, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'
        })
        this.input.keyboard.on('keydown-ESC', () => {
            if (inSubScene) {
                upgrades.visible = true
                visuals.visible = true
                inSubScene = false
                console.log("escape!")
            }
            else{
                this.scene.start("game")
            }
        })
    }
    update() {

        character  = localStorage.getItem("character")
        let platforms = this.physics.add.staticGroup()

        if (character == "knight")
        {
            background = this.add.image(400, 450, 'backgroundknight').setScale(1.2).setDepth(-1)
            for (let i = 0; i <= 10; i++) {
                platforms.create(80 * i, 800, 'knightplatform').setScale(1).refreshBody()

            }

        } 
        else if (character == "santa")
        {
            background = this.add.image(400, 450, 'backgroundsanta').setScale(1.2).setDepth(-1)
            for (let i = 0; i <= 10; i++) {
                platforms.create(80 * i, 800, 'santaplatform').setScale(1.05).refreshBody()

                
            }

        }
        else if (character == "robot")
        {
            background = this.add.image(400, 450, 'backgroundrobot').setScale(1.2).setDepth(-1)
            for (let i = 0; i <= 10; i++) {
                platforms.create(80 * i, 800, 'robotplatform').setScale(0.93).refreshBody()

            }

        }
        else if (character == "temple")
        {
            background = this.add.image(400, 450, 'backgroundtemple').setScale(1.5).setDepth(-1)
            for (let i = 0; i <= 10; i++) {
                platforms.create(80 * i, 800, 'grassplatform').setScale(0.78).refreshBody()
            }

        }
        

        background.update()
        

        if (sprite.x >= 600) {
            sprite.x -= 6
            coins.x -= 6
        }
        else {
            if(character == "knight")
            {
               sprite.play('knightidle', true)
               sprite.setScale(0.23)
               sprite.y = 705
            } 
            else if (character == "robot")
            {
                sprite.play('robotidle', true)
               sprite.setScale(0.30)
                sprite.y = 720
            } 
            else if (character == "temple")
            {
               
               sprite.play('templeidle', true) 
               sprite.setScale(0.30)
                sprite.y = 720
            } 
            else if (character == "santa")
            {
                sprite.play('santaidle', true) 
               sprite.setScale(0.23)
                sprite.y = 712
            }
            
        }
        coins.setText(`Coins: ${localStorage.getItem('coins')} `)

        
    }
}