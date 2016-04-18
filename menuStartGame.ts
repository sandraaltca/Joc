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
        teclaEspai:Phaser.Sprite;

        preload():void {
           super.preload();
            this.game.load.image('play', 'assets/PlayButton.png');
            this.load.spritesheet('Keys', 'assets/Keys.png',102,128);



        }

        create():void {
            super.create();
            this.game.stage.backgroundColor = "#74538f";


        }
        keysAnimatios(){
            this.teclesMov.animations.add('moviment', [0,1,2,3,4], 10,true);
            this.teclaEspai.animations.add('moviment', [5,6], 10,true);
        }


        update():void {
            super.update();


        }


    }


}
