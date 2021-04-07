
export default class GameOver extends Phaser.Scene{

    constructor(){
        super('GameOver')
    }

    preload(){
        this.load.image('background', 'assets/Background_dungeon.jpg');


    }
    create(){
        this.add.image(400, 450, 'background').setScale(1.5)

    }
}