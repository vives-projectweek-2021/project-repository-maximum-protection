export default class Shop extends Phaser.Scene{


    constructor() {
        super('Shop')
    }

    preload() {
        this.load.image('background', 'assets/Background_dungeon.jpg');
        this.load.image('shop-keeper', 'assets/shop/Shop-Keeper.png');
        this.load.image('platform', 'assets/platform.jpg');


        for (let i = 1; i <= 10; i++) {
            this.load.image(`idle${i}`, `assets/knight/Idle (${i}).png`);
        }


    }
    create() {
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
        //x - y / width -height
        this.add.image(280, 450, 'background').setScale(1.5)
        this.add.image(250,628  , 'shop-keeper')
        //ground generation
        for(let i = 0; i<=10;i++)
        {
            this.add.image(80*i,800,'platform').setScale(1)
        }

        // this.add.image(50,700,'platform').setScale(0.2)
        // this.add.image(30000,700,'platform').setScale(0.2)
        // this.add.image(30000,700,'platform').setScale(0.2)
        // this.add.image(50000,700,'platform').setScale(0.2)
        let sprite = this.add.sprite(600,715, 'idle1').setScale(0.22)
        sprite.setFlipX(true)
        sprite.play('Idleing')


    }
}