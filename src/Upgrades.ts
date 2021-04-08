
export default class Upgrades extends Phaser.Scene {

    constructor() {
        super('Upgrades')
    }

    preload() {


    }
    create() {

        this.add.text(530, 400, `This is a test `, {
            fontFamily: 'Arial',
            fontSize: '30px',
            strokeThickness: 5,
            stroke: '#000000',
            color: '#EA6A47'

        })

    }
}