let cost = 1
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
        this.load.image('selected', 'assets/shop/selected.png');






        this.load.image('buy_now', 'assets/shop/Buy_now_button.jpg');
    }
    create(){
        let insfficientBalance = this.add.text(270, 15, `inufficient Balance`, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })
        insfficientBalance.visible = false
        //x - y / width -height
        //everything with knight
        this.add.image(100,210, "knight").setScale(0.23)
        let selectKnight = this.add.image(100, 315, 'select').setScale(0.4).setInteractive()
        selectKnight.visible = false
        let selectedKnight = this.add.image(100, 315, 'selected').setScale(0.4)

        selectKnight.on('pointerdown',()=>{
            localStorage.setItem("character", "knight")
            selectedKnight.visible = true
            selectedSanta.visible = false
            selectSanta.visible = true

        })


        //everything with santa
        this.add.image(315,215, "santa").setScale(0.25)
        let buySanta = this.add.image(300,315,'buy_now').setScale(0.4).setInteractive()
        let selectSanta = this.add.image(300, 315, 'select').setScale(0.4).setInteractive()
        let selectedSanta = this.add.image(300, 315, 'selected').setScale(0.4)
        selectSanta.visible = false
        selectedSanta.visible = false
        buySanta.on('pointerdown', ()=>{
            if(parseInt(localStorage.getItem('coins')) >= cost){
                selectKnight.visible = true
                insfficientBalance.visible = false
                buySanta.visible = false
                selectedSanta.visible = true
                selectSanta.visible = false
                let coin
                coin = parseInt(localStorage.getItem('coins')) - cost
                localStorage.setItem('coins', coin.toString())
                localStorage.setItem("character", "santa")
            }
            else{
                insfficientBalance.visible = true
            }

        })

        //everything with temple
        this.add.image(490,215, "temple").setScale(0.25)
        let buyTemple = this.add.image(500,315,'buy_now').setScale(0.4).setInteractive()
        let selectTemple= this.add.image(500, 315, 'select').setScale(0.4).setInteractive()
        let selectedTemple = this.add.image(500, 315, 'selected').setScale(0.4)
        selectedTemple.visible = false
        selectTemple.visible = false

        //everything with robot
        this.add.image(700,215, "robot").setScale(0.25)
        let buyRobot = this.add.image(700,315,'buy_now').setScale(0.4).setInteractive()
        let selectRobot= this.add.image(500, 315, 'select').setScale(0.4).setInteractive()
        let selectedRobot = this.add.image(500, 315, 'selected').setScale(0.4)
        selectedRobot.visible = false
        selectRobot.visible = false




        this.add.text(250, 50, `cost = 100 coins  `, {
            fontFamily: 'Arial',
            fontSize: '35px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })

        

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop("Visuals")
            
        })


    }


}