import 'phaser'


export default class Preload extends Phaser.Scene{




    constructor(){
        super('preload')
    }
    preload(){
        this.load.image('platform', 'assets/platform.jpg');
        this.load.image('background', 'assets/Background_dungeon.jpg');

        for (let i = 1; i <= 10; i++) {
            this.load.image(`idle${i}`, `assets/knight/Idle (${i}).png`);
            this.load.image(`jump${i}`, `assets/knight/Jump (${i}).png`);
            this.load.image(`run${i}`, `assets/knight/Run (${i}).png`);
        }
        for (let i = 1; i <= 8; i++) {
            this.load.image(`coin${i}`, `assets/coin/coin_0${i}.png`);
        }
    }
}