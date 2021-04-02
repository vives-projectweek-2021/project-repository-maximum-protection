import 'phaser';

let cursors
let player
let platforms
export default class Demo extends Phaser.Scene
{


    
    constructor ()
    {
        super('demo');
    }
    preload ()
    {
        this.load.image('platform', 'assets/platform.jpg');
        this.load.image('background', 'assets/background.jpg');
        this.load.image('idle', 'assets/knight/Idle (1).png');


        for (let i = 1; i <=10;i++)
        {
            this.load.image(`run${i}`, `assets/knight/Run (${i}).png` );
        }

        for (let i = 1; i <=10;i++)
        {
            this.load.image(`idle${i}`, `assets/knight/Idle (${i}).png` );
        }
        

    }


    
    create ()
    {
        cursors = this.input.keyboard.createCursorKeys();
        
        this.add.image(800,1000,'background').setScale(2)
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
                { key: 'run10'}
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
                { key: 'idle6' },
                { key: 'idle7' },
                { key: 'idle8' },
                { key: 'idle9' },
                { key: 'idle10'}
            ],
            frameRate: 20,
            repeat: -1
        });

        player = this.physics.add.sprite(0,100, 'idle').setScale(0.2).play('Idleing')
        player.play('running')
        player.setCollideWorldBounds(true)
        
        platforms = this.physics.add.staticGroup();
        platforms.create(150,800, 'platform').setScale(0.2).refreshBody()
        platforms.create(200,700, 'platform').setScale(0.2).refreshBody()
        platforms.create(400,400, 'platform').setScale(0.2).refreshBody()
        platforms.create(600,300, 'platform').setScale(0.2).refreshBody()
        platforms.create(600,600, 'platform').setScale(0.2).refreshBody()


        this.physics.add.collider(player,platforms)



                
    }
    update(){

        if(cursors.left.isDown){
            player.setVelocity(-160);
            player.play('running')
        }
        else if(cursors.right.isDown){
            player.setVelocity(160);
            player.play('running')

        }
        else{
            player.setVelocity(0);
            player.play('Idleing')
        }

    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 900,
    physics:{
        default: 'arcade',
        arcade: {
            gravity:{y: 500},
            debug: false
        }
    },
    scene: Demo
};

const game = new Phaser.Game(config);
