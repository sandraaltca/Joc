/// <reference path="phaser/phaser.d.ts"/>
import Point = Phaser.Point;

module MyGame {
    export class SimpleGame extends Phaser.Game {


        constructor() {
            super(800, 600, Phaser.AUTO, "gameDiv");

          /// this.state.add("load", LoadState);
           // this.state.add("menu", MenuState);
            this.state.add("game", gameState);

           this.state.start("game");
        }
    }
}

window.onload = () => {
    var game = new MyGame.SimpleGame();
};