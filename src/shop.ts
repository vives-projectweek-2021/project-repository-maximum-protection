
let sprite
let coins
let character = localStorage.getItem("character")
let upgrades
let visuals
let inSubScene
export default class Shop extends Phaser.Scene {


    constructor() {
        super('Shop')
    }

    preload() {
        this.load.image('shop-keeper', 'assets/shop/Shop-Keeper.png');
        this.load.image('upgrades', 'assets/shop/upgrades.png');
        this.load.image('Visuals', 'assets/shop/Visuals.png');
        this.load.audio('click', ['assets/audio/click.mp3'] );
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
            key: 'templetidle',
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
            key: 'santaidle',
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
            key: 'robotidle',
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
        
        
        //x - y / width -height
        this.add.image(280, 450, 'background').setScale(1.5)
        this.add.image(250, 628, 'shop-keeper')
        //ground generation
        for (let i = 0; i <= 10; i++) {
            this.add.image(80 * i, 800, 'platform').setScale(1)
        }
        
        sprite = this.add.sprite(850, 720, 'idle1').setScale(0.25)

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
        if (sprite.x >= 600) {
            sprite.x -= 6
            coins.x -= 6
        }
        else {
            sprite.play('Idleing', true)
        }
        coins.setText(`Coins: ${localStorage.getItem('coins')} `)

        
    }
}