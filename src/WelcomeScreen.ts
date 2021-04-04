import { Game } from "phaser";

export default class WelcomeScreen extends Phaser.Scene{
    
    constructor(){
        super('WelcomeScreen')
    }
    preload(){

        this.load.image('background', 'assets/Background_dungeon.jpg');
    }
    create(){
        
        
        this.add.text
        this.add.image(400,450,'background').setScale(1.5)
        this.input.on('pointerdown', ()=>{
            this.scene.start('game')
        })
    }
}
