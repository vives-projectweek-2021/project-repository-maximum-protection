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


        for (let i = 1; i <=10;i++)
        {
            this.load.image(`run${i}`, `assets/knight/Run (${i}).png` );
        }

        for (let i = 1; i <=10;i++)
        {
            this.load.image(`idle${i}`, `assets/knight/Idle (${i}).png` );
        }
        
        for (let i = 1; i <=10;i++)
        {
            this.load.image(`run-left${i}`, `assets/knight/Run-left (${i}).png` );
        }

    }


    
    create ()
    {
        cursors = this.input.keyboard.createCursorKeys();
        this.add.image(800,1000,'background').setScale(2);

        player = this.physics.add.sprite(0,100, 'idle1').setScale(0.2);

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
            key: 'running-left',
            frames: [
                { key: 'run-left1' },
                { key: 'run-left2' },
                { key: 'run-left3' },
                { key: 'run-left4' },
                { key: 'run-left6' },
                { key: 'run-left7' },
                { key: 'run-left8' },
                { key: 'run-left9' },
                { key: 'run-left10'}
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

        
        player.setCollideWorldBounds(true)
        
        platforms = this.physics.add.staticGroup();
        platforms.create(150,800, 'platform').setScale(0.2).refreshBody()
        platforms.create(200,700, 'platform').setScale(0.2).refreshBody()
        platforms.create(400,400, 'platform').setScale(0.2).refreshBody()
        platforms.create(600,300, 'platform').setScale(0.2).refreshBody()
        platforms.create(600,600, 'platform').setScale(0.2).refreshBody()


        this.physics.add.collider(player,platforms);

        

                
    }
    update(){

        if(cursors.left.isDown){
            player.setVelocityX(-200);
            player.play('running-left', true)
            
        }
        else if(cursors.right.isDown){
            player.setVelocityX(160);
            player.play('running', true)

        }
        else{
            player.setVelocityX(0);
            player.play('Idleing', true)
        }

        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-1000)
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
            gravity:{y: 1200},
            debug: false
        }
    },
    scene: Demo
};

const game = new Phaser.Game(config);
