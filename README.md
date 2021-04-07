# Maximum Protection repo -- last update 07/04/2021

## Idea

Maximum Protection(tm) is a vertical platformer where you're constantly being chased by a projectile-shooting enemy. The camera will also move upwards so the player is forced to keep moving. 

There is a power-up the player can grab which bounces the projectiles back towards the enemy for a limited amount of time. 

If the enemy gets hit the player some event could be triggered like 

- the camera could move a bit slower
- the enemy could stop firing a few seconds
- ...

The player wins when he reaches a certain checkpoint or when he collects a certain number of power-ups.

## Theme 

The theme of this game is knights and dragons/goblins or other creatures. The background of the game is currently a dark village, but maybe we'll add new backgrounds to it.

![Background](./ScreenshotsForReadMe/BackgroundScreenshot.png)


### The characters we are currently using

- [Knight sprite art] (Source: https://www.gameart2d.com/the-knight-free-sprites.html) 
- [Some sort of dragon] (Source: https://opengameart.org/content/red-dragon)

## Links

- [phaser](https://phaser.io/)
- [phaser boiler template with typescript](https://github.com/photonstorm/phaser3-typescript-project-template)
- [free to use game art](https://www.gameartguppy.com/)


## The game logic

- [gravity/bouncing physics] (https://phaser.io/examples/v2/arcade-physics/bounce-with-gravity)
- [starstruck -- example game] (https://phaser.io/examples/v2/games/starstruck)


## Progress

### 02/04/2021 
sprite animation working!

### 03/04/2021 - 07/04/2021
1. Adding platforms to the game and make them spawn randomly.
2. Make sure the character jumps high enough and moves fast enough.
3. Adding a horizontal wrap in the game.
4. Adding a welcome screen to the game. 
5. Adding a high score mechanic for the player.
6. Adding a coin system to the game that holds the amount that the player picked up. 
7. If you fell down (didn't make it to the next platform), you automatically return to the welcome screen.
8. While working on the game, fixing bugs...

# 08/04/2021 - ...

