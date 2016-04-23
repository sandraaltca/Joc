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
        kitty:Phaser.Sprite;
        cursor:Phaser.CursorKeys;

        create():void {
            super.create();
            this.game.stage.backgroundColor = "#74538f";
            this.teclesMov = this.add.sprite(this.world.centerX-100,this.world.centerY , 'key_up');
            this.teclesMov.animations.add('mov', [0,1], 2,true);
            this.teclesMov.animations.play('mov');
            this.teclesMov.anchor.setTo(0.5, 0.5);
            var textIntro = this.game.add.bitmapText(this.world.centerX, 100, 'carrier_command','Sigues un gat !',30);
            textIntro.anchor.setTo(0.5, 0.5);
            this.cursor = this.game.input.keyboard.createCursorKeys();
            this.kitty = this.add.sprite(this.world.centerX,this.world.centerY-25 , 'kitty');
            this.kitty.animations.add('idEsperar', [0,1,2,3], 10,true);
            this.kitty.animations.play('idEsperar');
            var clic = this.game.add.bitmapText(this.world.centerX, this.world.centerY+120, 'carrier_command','clic up !',30);
            clic.anchor.setTo(0.5, 0.5);

        }


        update():void {
            super.update();
            if(this.cursor.up.isDown) {
                this.game.state.start("game");
            }

        }

    }


}
