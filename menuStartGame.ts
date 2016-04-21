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

    export class menuStartGame extends Phaser.State {

        teclesMov:Phaser.Sprite;
        textIntro:Phaser.BitmapText;
        cursor:Phaser.CursorKeys;

        create():void {
            super.create();
            this.game.stage.backgroundColor = "#74538f";
            this.teclesMov = this.add.sprite(this.world.centerX,this.world.centerY , 'Keys');
            this.teclesMov.anchor.setTo(0.5, 0.5);

            this.textIntro = this.game.add.bitmapText(this.world.centerX, 100, 'carrier_command','El joc del gatet !',30);
            this.textIntro.inputEnabled = true;
            this.textIntro.input.enableDrag();
            this.textIntro.anchor.setTo(0.5, 0.5);
            this.cursor = this.game.input.keyboard.createCursorKeys();



        }
       onClick():void {
           this.game.state.start("game");
        }


    }


}
