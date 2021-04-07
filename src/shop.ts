export default class Shop extends Phaser.Scene{


    constructor() {
        super('Shop')
    }

    preload() {
        this.load.image('shop-background', 'assets/shop/Shop-background.jpg');




    }
    create() {

        //x - y / width -height
        this.add.image(280, 450, 'shop-background').setScale(1.29)        
    }
}