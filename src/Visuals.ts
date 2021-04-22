export default class Visuals extends Phaser.Scene{

    constructor() {
        super('Visuals')
    }

    preload(){
        this.load.image('robot', 'assets/robot/Idle (1).png');
        this.load.image('santa', 'assets/santa/Idle (1).png');
        this.load.image('temple', 'assets/temple/Idle (1).png');
        this.load.image('knight', 'assets/knight/Idle (1).png');
        this.load.image('select', 'assets/shop/select.png');





        this.load.image('buy_now', 'assets/shop/Buy_now_button.jpg');
    }
    create(){
        //x - y / width -height
        this.add.image(100,215, "knight").setScale(0.25)
        let selectKnight = this.add.image(100, 315, 'select').setScale(0.4).setInteractive()

        this.add.image(300,215, "santa").setScale(0.25)
        let buySanta = this.add.image(300,315,'buy_now').setScale(0.4).setInteractive()

        this.add.image(500,215, "temple").setScale(0.25)
        let buyTemple = this.add.image(500,315,'buy_now').setScale(0.4).setInteractive()


        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop("Visuals")
            
        })

    }


}