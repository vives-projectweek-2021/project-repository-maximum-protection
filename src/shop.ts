
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
    }
    create() {

        //x - y / width -height
        this.add.image(280, 450, 'background').setScale(1.5)
        this.add.image(250, 628, 'shop-keeper')
        //ground generation
        for (let i = 0; i <= 10; i++) {
            this.add.image(80 * i, 800, 'platform').setScale(1)
        }

        let character = localStorage.getItem("character")
        if (character == "robot") {
            sprite = this.add.sprite(850, 720, 'idle1').setScale(0.25)
        } else if (character == "knight") {
            sprite = this.add.sprite(850, 715, 'idle1').setScale(0.22)
        } else if (character == "santa") {
            sprite = this.add.sprite(850, 717, 'idle1').setScale(0.25)
        }

        sprite.setFlipX(true)
        sprite.play('running')

        upgrades = this.add.image(600, 200, 'upgrades').setScale(0.3).setInteractive()
        visuals = this.add.image(200, 200, 'Visuals').setScale(0.3).setInteractive()


        upgrades.on('pointerdown', () => {
            this.scene.run('Upgrades')
            upgrades.visible = false
            visuals.visible = false
            inSubScene = true
        });

        visuals.on('pointerdown',()=>{
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