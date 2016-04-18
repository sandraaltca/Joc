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
        teclaEspai:Phaser.Sprite;
        textIntro:Phaser.Text;


        preload():void {
           super.preload();

            this.load.spritesheet('play', 'assets/PlayButton.png',1,1);
            this.game.load.image('Keys', 'assets/Keys1.png');
            this.game.load.image('Espai', 'assets/espai.png');




        }

        create():void {
            super.create();
            this.game.stage.backgroundColor = "#74538f";
            this.teclesMov = this.add.sprite(250,this.world.centerY , 'Keys');
            this.teclesMov.anchor.setTo(0.5, 0.5);
            this.teclaEspai = this.add.sprite(500,this.world.centerY+19,'Espai');
            this.teclaEspai.anchor.setTo(0.5, 0.5);
            this.textIntro = this.game.add.text(270, 100, "El Joc del Gatet ! ", {
                font: "25px Fixedsys",
                fill: "#fff",
                align: "center"
            });




        }



        update():void {
            super.update();


        }


    }


}
