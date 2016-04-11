/// <reference path="phaser/phaser.d.ts"/>
//Example game: http://catscatscatscatscats.com/
//http://www.phaser.io/news/2015/11/be-a-cat
//74538f
class mainState extends Phaser.State {
    cursor: Phaser.CursorKeys;
    terraesquerra:Phaser.Sprite;
    gat:Phaser.Sprite;
    terradreta:Phaser.Sprite;
    baldainici:Phaser.Sprite;
    baldes:Phaser.Group;
    ESPAIH = 167;
    ESPAIV = 110;
    tiempo:Phaser.Text;
    CONTADORTIEMPO=60;

    preload():void {
        super.preload();
        this.game.load.image('terraesquerra', 'assets/terraEsquerra.png');
        this.game.load.image('terradreta','assets/terra_dreta.png');
        this.game.load.image('baldainici','assets/baldaInici.png');
        this.game.load.image('baldes','assets/balda.png');
        this.game.load.image('gat','assets/gat_quiet.png');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);


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
        // que colisione contra las paredes.
        this.gat.body.collideWorldBounds = true;
        // Agregamos gravedad al jugador
        this.gat.body.gravity.y = 500;

    }
    configWorld(){
        this.terraesquerra = this.game.add.sprite(
            this.game.world.width-798,
            this.game.world.height - 100,
            'terraesquerra'
        )
        this.game.physics.arcade.enable(this.terraesquerra);
        this.terraesquerra.body.immovable = true;


        this.baldainici = this.game.add.sprite(
            this.game.world.width-565,
            this.game.world.height - 35,
            'baldainici'
        )
        this.game.physics.arcade.enable(this.baldainici);
        this.baldainici.body.immovable = true;

        this.terradreta = this.game.add.sprite(
            this.game.world.width-250,
            this.game.world.height - 100,
            'terradreta'
        )
        this.game.physics.arcade.enable(this.terradreta);
        this.terradreta.body.immovable = true;


    }
    createbaldes(){

        this.baldes = this.add.group();
        this.baldes.enableBody = true;
        this.baldes.physicsBodyType = Phaser.Physics.ARCADE;
        for (var x = 0; x < 4; x++)
        {
            for (var y = 0; y < 5; y++)
            {
                if(x==1 && y==2 || x==2 && y== 0|| x==2 && y==4 || x==3 && y==1 || x==3 && y==2||x==3 && y==3) {
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
        // Cogemos los cursores para gestionar la entrada
        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.tiempo = this.game.add.text(20,10,"Tiempo : " +this.CONTADORTIEMPO, { font: "25px Fixedsys", fill: "#fff", align: "center"});
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    }

    update():void {
        super.update();

        this.game.physics.arcade.collide(this.gat, this.terradreta);
        this.game.physics.arcade.collide(this.gat, this.terraesquerra);
        this.game.physics.arcade.collide(this.baldes,this.gat);
        //this.CONTADORTIEMPO=this.CONTADORTIEMPO-1;
      //  this.tiempo.setText("Tiempo :"+this.CONTADORTIEMPO);


        this.movePlayer();

    }

    movePlayer():void {
        // Si pulsamos el cursor izquierdo
        if (this.cursor.left.isDown) {
            // Movemos al jugador a la izquierda
            this.gat.body.velocity.x = -200;
        }
        // Si pulsamos el cursor derecho
        else if (this.cursor.right.isDown) {
            // Movemos al jugador a la derecha
            this.gat.body.velocity.x = 200;
        }
        // Si no se pulsan ni el cursor izquierdo ni el derecho
        else {
            // el jugador se para
            this.gat.body.velocity.x = 0;
        }
        // Si pulsamos la flecha arriba y el jugador está tocando el suelo
        if (this.cursor.up.isDown) {
            // el jugador se mueve hacia arriba (salto)
            this.gat.body.velocity.y = -320;
        }
        if(this.CONTADORTIEMPO==0){
            
        }

    }
    updateCounter() {

        this.CONTADORTIEMPO--;
        this.tiempo.setText("Tiempo : "+this.CONTADORTIEMPO);


}

}
class Balda extends Phaser.Sprite {

    objecte= false;

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
