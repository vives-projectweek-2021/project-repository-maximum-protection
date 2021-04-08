
let sprite
export default class Shop extends Phaser.Scene{


    constructor() {
        super('Shop')
    }

    preload() {
        this.load.image('background', 'assets/Background_dungeon.jpg');
        this.load.image('shop-keeper', 'assets/shop/Shop-Keeper.png');
        this.load.image('platform', 'assets/platform.jpg');

        this.load.image('upgrades', 'assets/shop/upgrades.png');
        this.load.image('Visuals', 'assets/shop/Visuals.png');

        for (let i = 1; i <= 10; i++) {
            this.load.image(`idle${i}`, `assets/knight/Idle (${i}).png`);
            this.load.image(`run${i}`, `assets/knight/Run (${i}).png`);
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
        //x - y / width -height
        this.add.image(280, 450, 'background').setScale(1.5)
        this.add.image(250,628  , 'shop-keeper')
        //ground generation
        for(let i = 0; i<=10;i++)
        {
            this.add.image(80*i,800,'platform').setScale(1)
        }
        sprite = this.add.sprite(850,715, 'idle1').setScale(0.22)
        sprite.setFlipX(true)
        sprite.play('running')

        this.add.image(600 , 200, 'upgrades').setScale(0.3)
        this.add.image(200,200, 'Visuals').setScale(0.3)

    }
    update(){
        
        if(sprite.x >= 600){
            sprite.x -= 4
        }
        else{
            sprite.play('Idleing', true)
        }
    }
}