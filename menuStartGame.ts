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
        butoStart:Phaser.Sprite;
        textIntro:Phaser.BitmapText;


        preload():void {
           super.preload();
            this.load.spritesheet('play', 'assets/PlayButton.png',123,54);
            this.game.load.image('Keys', 'assets/Keys1.png');
            this.game.load.image('Espai', 'assets/espai.png');
            this.game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');

        }

        create():void {
            super.create();
            this.game.stage.backgroundColor = "#74538f";
            this.teclesMov = this.add.sprite(this.world.centerX,this.world.centerY , 'Keys');
            this.teclesMov.anchor.setTo(0.5, 0.5);
            this.butoStart = this.add.sprite(this.world.centerX,this.world.centerY+130,'play');
            this.butoStart.anchor.setTo(0.5, 0.5);
            this.textIntro = this.game.add.bitmapText(this.world.centerX, 100, 'carrier_command','El joc del gatet !',30);
            this.textIntro.inputEnabled = true;
            this.textIntro.input.enableDrag();
            this.textIntro.anchor.setTo(0.5, 0.5);
            this.botoAnimacio();
            this.butoStart.animations.play('lila');

        }

        empezar():void {
            this.game.state.start('play');
        }
        botoAnimacio():void{
            this.butoStart.animations.add('lila', [0], 10,true);
            this.butoStart.animations.add('blanc', [1], 10,true);

        }



        update():void {
            super.update();


        }


    }


}
