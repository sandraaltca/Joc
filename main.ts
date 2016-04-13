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
    objectes:Phaser.Group;
    ESPAIH = 167;
    ESPAIV = 110;
    tiempo:Phaser.Text;
    CONTADORTIEMPO=60;
    contadorObjectes=0;

    puntuacio=0;

    balda1=false;
    balda2=false;
    balda3 = false;
    balda4=false;
    balda5=false;
    balda6=false;
    balda7=false;
    balda8=false;

    preload():void {
        super.preload();
        this.game.load.image('terraesquerra', 'assets/terraEsquerra.png');
        this.game.load.image('terradreta','assets/terra_dreta.png');
        this.game.load.image('baldainici','assets/baldaInici.png');
        this.game.load.image('baldes','assets/balda.png');
        this.game.load.image('gat','assets/gat_quiet.png');

        this.game.load.image('teclat','assets/teclat.png');
        this.game.load.image('llibre','assets/llibre1.png');
        this.game.load.image('rellotge','assets/rellotge.png');
        this.game.load.image('flor','assets/flor.png');
        this.game.load.image('basura','assets/basura.png');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);


    }
    tipusObjecte():string{
        var tipus = Math.floor((Math.random() * 6) + 1);
        var object;
        if(tipus==1){
            object='teclat';
        }else if(tipus==2){
            object='llibre';
        }else if(tipus==3){
            object='rellotge';
        }else if(tipus==4){
            object='flor';
        }else {
            object='basura';
        }
        return object;
    }
    sortirObjectes(){

        this.objectes = this.add.group();
        this.objectes.enableBody = true;
        this.objectes.physicsBodyType = Phaser.Physics.ARCADE;


        var x = Math.floor((Math.random() * 8) + 1);
        var y=  Math.floor(Math.random() *8);
        var objectType=this. tipusObjecte();

        if(x==1&& y==2 && !this.balda1){
            var newElement = new Objecte(this.game, y * this.ESPAIH, x * 15 ,  objectType, 1);
            this.objectes.add(newElement);
            this.balda1=true;
        }else if(x==2 && y== 0 && !this.balda2 ){
            var newElement = new Objecte(this.game, y * this.ESPAIH, x * 64 ,  objectType,2);
            this.objectes.add(newElement);
            this.balda2=true;
        }else if( x==2 && y==4 && !this.balda3){
            var newElement = new Objecte(this.game, y * this.ESPAIH, x *  64 ,  objectType,3);
            this.objectes.add(newElement);
            this.balda3=true;

        }else if(x ==4 && y==0 && !this.balda4){
            var newElement = new Objecte(this.game, y * this.ESPAIH, x *90 ,  objectType,4);
            this.objectes.add(newElement);
            this.balda4=true;
        }else if(x ==4 && y==4 && !this.balda5){
            var newElement = new Objecte(this.game, y * this.ESPAIH, x *90 ,  objectType,5);
            this.objectes.add(newElement);
            this.balda5=true;
        }else if(x==3 && y==1 && !this.balda6){
            var newElement = new Objecte(this.game, y * this.ESPAIH, x *80 ,  objectType,6);
            this.objectes.add(newElement);
            this.balda6=true;
        }else if(x==3 && y==2 && !this.balda7){
            var newElement = new Objecte(this.game, y * this.ESPAIH, x *80 ,  objectType,7);
            this.objectes.add(newElement);
            this.balda7=true;
        }else if(x==3 && y==3 && !this.balda8){
            var newElement = new Objecte(this.game, y * this.ESPAIH, x *80 ,  objectType,8);
            this.objectes.add(newElement);
            this.balda8=true;
        }


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
                    var newElement = new Balda(this.game, y * this.ESPAIH, x * this.ESPAIV + 50, 'baldes',0);
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
        this.game.time.events.loop(Phaser.Timer.SECOND, this.temporitzadorPartida, this);
        this.game.time.events.loop(Phaser.Timer.SECOND,this.tempsObjectes,this);
    }
    tirarObjectes(gat:Phaser.Sprite, objecte:Objecte){
        var num = objecte.balda;
        objecte.kill();

        this.alliberarBlada(num);


       /* this.puntuacio=this.puntuacio+10;
        this.CONTADORTIEMPO=this.CONTADORTIEMPO+3;*/

    }
    update():void {
        super.update();
        this.game.physics.arcade.collide(this.gat, this.terradreta);
        this.game.physics.arcade.collide(this.gat, this.terraesquerra);
        this.game.physics.arcade.collide(this.baldes,this.gat);
        this.game.physics.arcade.collide(this.gat, this.objectes, this.tirarObjectes, null, this);

        if(this.contadorObjectes==1){
            this.sortirObjectes();
            this.contadorObjectes=0;
        }

        this.movePlayer();
    }




    alliberarBlada(balda:number){
        if(balda==1){
            this.balda1=true;
        }else if( balda==2){
            this.balda2=true;
        }else if( balda==3){
            this.balda3=true;
        }else if(balda==4){
            this.balda4=true;
        }else if(balda==5){
            this.balda5=true;
        }  else if(balda==6){
            this.balda6=true;
        } else if(balda==7){
            this.balda7=true;
        }else{
            this.balda8=true;
        }
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
        if (this.cursor.up.isDown ) {
            // el jugador se mueve hacia arriba (salto)
            this.gat.body.velocity.y = -320;
        }
        if(this.CONTADORTIEMPO==0){
            
        }

    }
    temporitzadorPartida() {

        this.CONTADORTIEMPO--;
        this.tiempo.setText("Tiempo : "+this.CONTADORTIEMPO);
    }
    tempsObjectes(){
        this.contadorObjectes++;
    }

}
class Objecte extends Phaser.Sprite {
    balda;
    constructor(game:Phaser.Game, x:number, y:number, key:string, balda:number) {
        super(game, x, y, key, 0);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.height-900;
        this.balda = balda;
    }
}
class Balda extends Phaser.Sprite {
    constructor(game:Phaser.Game, x:number, y:number, key:string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame:string|number) {
        super(game, x, y, key, frame);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;

    }
}

class KittyGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}


window.onload = () => {
    var game = new KittyGame();
};
