/**
 * Created by 47419119l on 18/04/16.
 */
/**
 * Created by sandra on 18/04/2016.
 */
/// <reference path="phaser/phaser.d.ts"/>
//Example game: http://catscatscatscatscats.com/
//http://www.phaser.io/news/2015/11/be-a-cat
//74538f
module  ElMeuJoc{

    export class Gameover extends Phaser.State {

        teclesMov:Phaser.Sprite;
        kitty:Phaser.Sprite;
        textIntro:Phaser.BitmapText;
        cursor:Phaser.CursorKeys;

        create():void {
            super.create();
            this.game.stage.backgroundColor = "#74538f";
            this.cursor = this.game.input.keyboard.createCursorKeys();

            var gameOverBac = this.game.add.sprite(
                this.game.world.centerX,
                this.game.world.centerY,
                'score'
            );
            gameOverBac.anchor.setTo(0.5, 0.5);
            var titol = this.game.add.bitmapText(
                this.game.world.centerX,
                this.game.world.centerY - 180,
                'carrier_command',
                "  Has sigut un gat! ",
                18);
            titol.anchor.setTo(0.5, 0.5);
            var score1 = this.game.add.bitmapText(
                this.game.world.centerX,
                this.game.world.centerY - 150,
                'carrier_command',
                " Has tirat ",
                15);
            score1.anchor.setTo(0.5, 0.5);
            var score = this.game.add.bitmapText(
                this.game.world.centerX,
                this.game.world.centerY - 100,
                'carrier_command', "0" ,
                40);
            score.anchor.setTo(0.5, 0.5);
            var score1 = this.game.add.bitmapText(
                this.game.world.centerX,
                this.game.world.centerY - 30,
                'carrier_command', " coses. ",
                15);
            score1.anchor.setTo(0.5, 0.5);
            var teclas = this.game.add.sprite(
                this.game.world.centerX,
                this.game.world.centerY + 100,
                'Keys');
            teclas.anchor.setTo(0.5, 0.5);

        }


        update():void {
            super.update();
            if(this.cursor.up.isDown) {

                this.game.state.start("game");
            }

        }

    }


}
