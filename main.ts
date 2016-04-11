/// <reference path="phaser/phaser.d.ts"/>
//Example game: http://catscatscatscatscats.com/
//http://www.phaser.io/news/2015/11/be-a-cat
//74538f
class mainState extends Phaser.State {
    terraesquerra:Phaser.Sprite;
    gat:Phaser.Sprite;
    terradreta:Phaser.Sprite;
    baldainici:Phaser.Sprite;
    baldes:Phaser.Group;
    ESPAIH = 167;
    ESPAIV = 150;

    preload():void {
        super.preload();
        this.game.load.image('terraesquerra', 'assets/terraEsquerra.png');
        this.game.load.image('terradreta','assets/terra_dreta.png');
        this.game.load.image('baldainici','assets/baldaInici.png');
        this.game.load.image('baldes','assets/balda.png');
        this.game.load.image('gat','assets/gat_quiet.png')

    }
    configGat(){
        this.gat = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.height - 83,
            'gat'
        )
        // Cambiamos el "anchor" del jugador
        this.gat.anchor.setTo(0.5, 0.5);
        //Afegueixo fisica al gat.
        this.game.physics.arcade.enable(this.gat);
    }
    configWorld(){
        this.terraesquerra = this.game.add.sprite(
            this.game.world.width-798,
            this.game.world.height - 100,
            'terraesquerra'
        )
        this.baldainici = this.game.add.sprite(
            this.game.world.width-565,
            this.game.world.height - 35,
            'baldainici'
        )
        this.terradreta = this.game.add.sprite(
            this.game.world.width-250,
            this.game.world.height - 100,
            'terradreta'
        )

    }
    createbaldes(){

        this.baldes = this.add.group();
        this.baldes.enableBody = true;
        this.baldes.physicsBodyType = Phaser.Physics.ARCADE;
        for (var x = 0; x < 3; x++)
        {
            for (var y = 0; y < 5; y++)
            {
                if(x==0 && y==2 || x==1 && y== 0|| x==1 && y==4 || x==2 && y==1 || x==2 && y==2||x==2 && y==3) {
                    var newElement = new Balda(this.game, y * this.ESPAIH, x * this.ESPAIV + 50, 'baldes');
                    this.baldes.add(newElement);
                }
            }
        }


    }

    create():void {
        super.create();
        this.game.stage.backgroundColor = "#74538f";
        this.configWorld();
        this.createbaldes();
        this.configGat();
    }

    update():void {
        super.update();
    }

}
class Balda extends Phaser.Sprite {
    constructor(game:Phaser.Game, x:number, y:number, key:string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame:string|number) {
        super(game, x, y, key, frame);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.height-900;
    }
}

class ShooterGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}

window.onload = () => {
    var game = new ShooterGame();
};
