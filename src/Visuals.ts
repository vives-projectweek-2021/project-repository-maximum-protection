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
        if( (localStorage.getItem("hasSanta")) == null ){localStorage.setItem('hasSanta','false')}
        if( (localStorage.getItem("hasTemple")) == null ){localStorage.setItem('hasTemple','false')}
        if( (localStorage.getItem("hasRobot")) == null ){localStorage.setItem('hasRobot','false')}
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
        this.add.sprite(120,210, "knight").setScale(0.23).play("knightidle")    
        //this.add.image(120,210, "knight").setScale(0.23)
        let selectKnight = this.add.image(100, 315, 'select').setScale(0.4).setInteractive()
        selectKnight.visible = true
        let selectedKnight = this.add.image(100, 315, 'selected').setScale(0.4)
        selectedKnight.visible = false

        selectKnight.on('pointerdown',()=>{
            localStorage.setItem("character", "knight")
            selectedKnight.visible = true
            if(localStorage.getItem("hasRobot") == "true"){
                buyRobot.visible = false
                selectRobot.visible  = true
                selectedRobot.visible  = false
            }
            
            if(localStorage.getItem("hasTemple") == "true"){
                buyTemple.visible = false
                selectTemple.visible = true
                selectedTemple.visible = false
            }
            if(localStorage.getItem("hasSanta") == "true"){
                buySanta.visible = false
                selectSanta.visible = true
                selectedSanta.visible = false
    
            }

        })
        //everything with santa
        //this.add.image(300,215, "santa").setScale(0.25)
        this.add.sprite(300,215, "santa").setScale(0.25).play("santaidle")    
        let buySanta = this.add.image(300,315,'buy_now').setScale(0.4).setInteractive()
        let selectSanta = this.add.image(300, 315, 'select').setScale(0.4).setInteractive()
        let selectedSanta = this.add.image(300, 315, 'selected').setScale(0.4)
        selectSanta.visible = false
        selectedSanta.visible = false
        buySanta.on('pointerdown', ()=>{
            if(parseInt(localStorage.getItem('coins')) >= cost){
                selectKnight.visible = true
                selectedKnight.visible = false
                insfficientBalance.visible = false
                buySanta.visible = false
                selectedSanta.visible = true
                selectSanta.visible = false
                if(localStorage.getItem("hasRobot") == "true"){
                    buyRobot.visible = false
                    selectRobot.visible  = true
                    selectedRobot.visible  = false
                }
                
                if(localStorage.getItem("hasTemple") == "true"){
                    buyTemple.visible = false
                    selectTemple.visible = true
                    selectedTemple.visible = false
        
                }
                let coin
                coin = parseInt(localStorage.getItem('coins')) - cost
                localStorage.setItem('coins', coin.toString())
                localStorage.setItem("character", "santa")
                localStorage.setItem("hasSanta", "true")
            }
            else{
                insfficientBalance.visible = true
            }

        })
        selectSanta.on('pointerdown', ()=>{
            localStorage.setItem("character", "santa")
            selectedSanta.visible = true
            selectedKnight.visible = false
            selectKnight.visible = true
            selectedKnight.visible = false
            if(localStorage.getItem("hasRobot") == "true"){
                buyRobot.visible = false
                selectRobot.visible  = true
                selectedRobot.visible  = false
            }
            
            if(localStorage.getItem("hasTemple") == "true"){
                buyTemple.visible = false
                selectTemple.visible = true
                selectedTemple.visible = false
    
            }
        })


        

        //everything with temple
        this.add.sprite(490,215, "temple").setScale(0.23).play("templeidle") 
        //this.add.image(490,215, "temple").setScale(0.25)
        let buyTemple = this.add.image(500,315,'buy_now').setScale(0.4).setInteractive()
        let selectTemple= this.add.image(500, 315, 'select').setScale(0.4).setInteractive()
        let selectedTemple = this.add.image(500, 315, 'selected').setScale(0.4)
        selectedTemple.visible = false
        selectTemple.visible = false

        buyTemple.on('pointerdown', ()=>{
            if(parseInt(localStorage.getItem('coins')) >= cost){
                selectTemple.visible = false
                selectedTemple.visible = true
                insfficientBalance.visible = false
                buyTemple.visible = false
                selectKnight.visible = true
                selectedKnight.visible = false
                if(localStorage.getItem("hasRobot") == "true"){
                    buyRobot.visible = false
                    selectRobot.visible  = true
                    selectedRobot.visible  = false
                }
                
                if(localStorage.getItem("hasSanta") == "true"){
                    buySanta.visible = false
                    selectSanta.visible = true
                    selectedSanta.visible = false
        
                }
                let coin
                coin = parseInt(localStorage.getItem('coins')) - cost
                localStorage.setItem('coins', coin.toString())
                localStorage.setItem("character", "temple")
                localStorage.setItem("hasTemple", "true")
            }
            else{
                insfficientBalance.visible = true
            }

        })
        selectTemple.on('pointerdown', ()=>{
            localStorage.setItem("character", "temple")
            selectedTemple.visible = false
            selectedTemple.visible = true
            selectKnight.visible = true
            selectedKnight.visible = false
            if(localStorage.getItem("hasRobot") == "true"){
                buyRobot.visible = false
                selectRobot.visible  = true
                selectedRobot.visible  = false
            }
            
            if(localStorage.getItem("hasSanta") == "true"){
                buySanta.visible = false
                selectSanta.visible = true
                selectedSanta.visible = false
    
            }
        })

        //everything with robot
        this.add.sprite(700,215, "robot").setScale(0.23).play("robotidle")    
        //this.add.image(700,215, "robot").setScale(0.25)
        let buyRobot = this.add.image(700,315,'buy_now').setScale(0.4).setInteractive()
        let selectRobot= this.add.image(700, 315, 'select').setScale(0.4).setInteractive()
        let selectedRobot = this.add.image(700, 315, 'selected').setScale(0.4)
        selectedRobot.visible = false
        selectRobot.visible = false

        buyRobot.on('pointerdown', ()=>{
            if(parseInt(localStorage.getItem('coins')) >= cost){
                selectRobot.visible = false
                selectedRobot.visible = true
                insfficientBalance.visible = false
                buyRobot.visible = false
                selectKnight.visible = true
                selectedKnight.visible = false
                if(localStorage.getItem("hasTemple") == "true"){
                    buyTemple.visible = false
                    selectTemple.visible = true
                    selectedTemple.visible = false
        
                }
                
                if(localStorage.getItem("hasSanta") == "true"){
                    buySanta.visible = false
                    selectSanta.visible = true
                    selectedSanta.visible = false
        
                }
                let coin
                coin = parseInt(localStorage.getItem('coins')) - cost
                localStorage.setItem('coins', coin.toString())
                localStorage.setItem("character", "robot")
                localStorage.setItem("hasRobot", "true")
                
            }
            else{
                insfficientBalance.visible = true
            }

        })
        selectRobot.on('pointerdown', ()=>{
            localStorage.setItem("character", "robot")
            selectedRobot.visible = true
            selectRobot.visible = false
            selectKnight.visible = true
            selectKnight.visible = true
            selectedKnight.visible = false
            if(localStorage.getItem("hasTemple") == "true"){
                buyTemple.visible = false
                selectTemple.visible = true
                selectedTemple.visible = false
    
            }
            
            if(localStorage.getItem("hasSanta") == "true"){
                buySanta.visible = false
                selectSanta.visible = true
                selectedSanta.visible = false
    
            }
        })



        this.add.text(250, 50, `cost = 100 coins  `, {
            fontFamily: 'Arial',
            fontSize: '35px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })

        //check if player has bought models
        if(localStorage.getItem("hasSanta") == "true"){
            buySanta.visible = false
            selectSanta.visible = true
        }
        if(localStorage.getItem("hasTemple") == "true"){
            buyTemple.visible = false
            selectTemple.visible = true

        }
        if(localStorage.getItem("hasRobot") == "true"){
            buyRobot.visible = false
            selectRobot.visible = true  
        }

        //check what model has been selected
        if(localStorage.getItem("character") == "santa"){
            selectedSanta.visible = true
        }
        else if(localStorage.getItem("character") == "temple"){
            selectedTemple.visible = true

        }
        else if(localStorage.getItem("character") == "robot"){
            selectedRobot.visible = true
        }
        else{
            selectedKnight.visible = true
        }
        
         
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop("Visuals")
            
        })

    }
    update(){
        
    }
}
