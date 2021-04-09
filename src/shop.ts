
let sprite
let coins
let character = localStorage.getItem("character")
export default class Shop extends Phaser.Scene{


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
        this.add.image(250,628  , 'shop-keeper')
        //ground generation
        for(let i = 0; i<=10;i++)
        {
            this.add.image(80*i,800,'platform').setScale(1)
        }

        let character = localStorage.getItem("character")
        if (character == "robot")
        {
            sprite = this.add.sprite(850,720, 'idle1').setScale(0.25)
        } else 
        {
            sprite = this.add.sprite(850,715, 'idle1').setScale(0.22)
        }

        sprite.setFlipX(true)
        sprite.play('running')

        let upgrades = this.add.image(600 , 200, 'upgrades').setScale(0.3).setInteractive()
        let visuals = this.add.image(200,200, 'Visuals').setScale(0.3).setInteractive()
        

        upgrades.on('pointerdown', () => {
            this.scene.run('Upgrades')
            upgrades.visible = false
        });

        coins = this.add.text(800, 590, `Coins: ${localStorage.getItem('coins')} `, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'
        })
    }
    update(){
        
        if(sprite.x >= 600){
            sprite.x -= 6
            coins.x -= 6
        }
        else{
            sprite.play('Idleing', true)
        }
        coins.setText(`Coins: ${localStorage.getItem('coins')} `)

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start('game')
        })
    }
}