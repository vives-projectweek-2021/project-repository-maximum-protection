
export default class Upgrades extends Phaser.Scene {

    constructor() {
        super('Upgrades')
    }

    preload() {
        this.load.image('star_placeholder', 'assets/shop/star_placholder.png');
        this.load.image('star', 'assets/shop/star.png');
        this.load.image('buy_now', 'assets/shop/Buy_now_button.jpg');




    }
    create() {
        console.log(parseInt(localStorage.getItem('blablabla')))
        //x - y / width -height
        this.add.text(450, 50, `upgrade cost = 50 coins  `, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })

        this.add.text(420, 125, `Speed:  `, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })
        let buy_speed = this.add.image(450, 185, 'buy_now').setScale(0.4).setInteractive()
        for (let index = 570; index < 800; index += 50) {
            this.add.image(index, 165, 'star_placeholder').setScale(0.04)
        }

        this.add.text(380, 250, `jump hight:   `, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })
        let insfficientBalance = this.add.text(570, 110, `inufficient Balance`, {
            fontFamily: 'Arial',
            fontSize: '25px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })
        insfficientBalance.visible = false;
        let buy_jumphight = this.add.image(440, 300, 'buy_now').setScale(0.4).setInteractive()

        for (let index = 570; index < 800; index += 50) {
            this.add.image(index, 265, 'star_placeholder').setScale(0.04)
        }

        buy_speed.on('pointerdown', () => {
            insfficientBalance.visible = false
            if (parseInt(localStorage.getItem('coins')) >= 20) {
                let coin = parseInt(localStorage.getItem('coins')) - 20
                localStorage.setItem('coins', coin.toString())
                if (isNaN(parseInt(localStorage.getItem('numberOfSpeedUpgrades')))) {
                    localStorage.setItem('numberOfSpeedUpgrades', '0')
                    console.log('SET numberOfSpeedUpgrades TO 0')
                }
                else {
                    let speedUpgradeLevel = parseInt(localStorage.getItem('conumberOfSpeedUpgradesins')) + 1
                    localStorage.setItem('conumberOfSpeedUpgradesins', speedUpgradeLevel.toString())
                    console.log('numberOfSpeedUpgrades += 1')
                }
            }
            else{
                insfficientBalance.visible = true
            }
        });
    }
}