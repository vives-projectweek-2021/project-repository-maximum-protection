let sprite
let coins
export default class ShopCutscene extends Phaser.Scene{


    constructor() {
        super('ShopCutscene')
    }

    preload() {
        this.load.image('shop-keeper', 'assets/shop/Shop-Keeper.png');
    }
    create() {
        //x - y / width -height
        this.add.image(280, 450, 'background').setScale(1.5)
        //ground generation
        for(let i = 0; i<=10;i++)
        {
            this.add.image(80*i,800,'platform').setScale(1)
        }

        let character = localStorage.getItem("character")
        if (character == "robot")
        {
            sprite = this.add.sprite(850,720, 'idle1').setScale(0.25)
        } else if( character == "knight")
        {
            sprite = this.add.sprite(850,715, 'idle1').setScale(0.22)
        } else if (character == "santa")
        {
            sprite = this.add.sprite(850,717, 'idle1').setScale(0.25)
        }

        sprite.setFlipX(true)
        sprite.play('running')

        coins = this.add.text(810, 590, `Coins: ${localStorage.getItem('coins')} `, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'
        })

    }
    update(){
        sprite.x -= 6
        coins.x -= 6
        if(sprite.x <= -50){
            this.scene.start('Shop')
        }
    }
}