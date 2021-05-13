
export default class Upgrades extends Phaser.Scene {

    constructor() {
        super('Upgrades')
    }

    preload() {
        this.load.image('star_placeholder', 'assets/shop/star_placholder.png');
        this.load.image('star', 'assets/shop/star.png');
        this.load.image('buy_now', 'assets/shop/Buy_now_button.jpg');
        this.load.audio('click', ['assets/audio/click.mp3'] )

        
    }
    create() {
        console.log('numberOfSpeedUpgrades = ', parseInt(localStorage.getItem('numberOfSpeedUpgrades')))
        console.log('numberOfJumpUpgrades = ', parseInt(localStorage.getItem('numberOfJumpUpgrades')))
        //x - y / width -height
        this.add.text(250, 50, `upgrade cost = 50 coins  `, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })

        this.add.text(220, 125, `Speed:  `, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })
        let buy_speed = this.add.image(250, 185, 'buy_now').setScale(0.4).setInteractive()
        for (let index = 370; index < 600; index += 50) {
            this.add.image(index, 165, 'star_placeholder').setScale(0.04)
        }

        this.add.text(180, 250, `jump height:   `, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })
        let insfficientBalance = this.add.text(370, 110, `inufficient Balance`, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })
        insfficientBalance.visible = false;
        let buy_jumphight = this.add.image(250, 315, 'buy_now').setScale(0.4).setInteractive()

        for (let index = 370; index < 600; index += 50) {
            this.add.image(index, 265, 'star_placeholder').setScale(0.04)
        }

        buy_speed.on('pointerdown', () => {
            this.sound.play('click')

            let coin
            insfficientBalance.visible = false
            if (parseInt(localStorage.getItem('coins')) >= 50) {
                if (isNaN(parseInt(localStorage.getItem('numberOfSpeedUpgrades')))) {
                    localStorage.setItem('numberOfSpeedUpgrades', '1')
                    console.log('SET numberOfSpeedUpgrades TO 1')
                    coin = parseInt(localStorage.getItem('coins')) - 50
                    localStorage.setItem('coins', coin.toString())
                }
                else {
                    if (parseInt(localStorage.getItem('numberOfSpeedUpgrades')) < 5) {
                        coin = parseInt(localStorage.getItem('coins')) - 50
                        localStorage.setItem('coins', coin.toString())
                        let speedUpgradeLevel = parseInt(localStorage.getItem('numberOfSpeedUpgrades')) + 1
                        localStorage.setItem('numberOfSpeedUpgrades', speedUpgradeLevel.toString())
                        console.log('numberOfSpeedUpgrades += 1')


                    }
                }
            }
            else {
                insfficientBalance.visible = true
            }
        });
        buy_jumphight.on('pointerdown', () => {
            this.sound.play('click')

            insfficientBalance.visible = false
            let coin
            if (parseInt(localStorage.getItem('coins')) >= 50) {
                if (isNaN(parseInt(localStorage.getItem('numberOfJumpUpgrades')))) {
                    localStorage.setItem('numberOfJumpUpgrades', '1')
                    console.log('SET numberOfJumpUpgrades TO 1')
                    coin = parseInt(localStorage.getItem('coins')) - 50
                    localStorage.setItem('coins', coin.toString())
                }
                else {
                    if (parseInt(localStorage.getItem('numberOfJumpUpgrades')) < 5) {
                        coin = parseInt(localStorage.getItem('coins')) - 50
                        localStorage.setItem('coins', coin.toString())
                        let speedUpgradeLevel = parseInt(localStorage.getItem('numberOfJumpUpgrades')) + 1
                        localStorage.setItem('numberOfJumpUpgrades', speedUpgradeLevel.toString())
                        console.log('numberOfJumpUpgrades += 1')
                    }
                }
            }
            else {
                insfficientBalance.visible = true
            }
        });
    }
    update() {
        let xSpeed = 370
        let xJump = 370
        for (let index = 0; index < parseInt(localStorage.getItem('numberOfSpeedUpgrades')); index++) {
            this.add.image(xSpeed, 165, 'star').setScale(0.04)
            xSpeed += 50
        }
        for (let index = 0; index < parseInt(localStorage.getItem('numberOfJumpUpgrades')); index++) {
            this.add.image(xJump, 265, 'star').setScale(0.04)
            xJump += 50
        }

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop("Upgrades")
            
        })

        
    }
}