/// <reference path="phaser/phaser.d.ts"/>
import Point = Phaser.Point;

module ElMeuJoc {
    export class SimpleGame extends Phaser.Game {

        scorePun=0;

        constructor() {
            super(800, 600, Phaser.AUTO, "gameDiv");
            this.state.add("load", LoadState);
            this.state.add("menu", menuStartGame);
            this.state.add("game", gameState);
            this.state.add("gameover", Gameover);

            this.state.start("load");
        }
    }
}

window.onload = () => {

    var game = new ElMeuJoc.SimpleGame();
};