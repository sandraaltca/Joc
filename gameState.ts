/**
 * Created by sandra on 18/04/2016.
 */
/// <reference path="phaser/phaser.d.ts"/>
//Example game: http://catscatscatscatscats.com/
//http://www.phaser.io/news/2015/11/be-a-cat
//74538f
module  ElMeuJoc{

    export class gameState extends Phaser.State {
        gameOverBac:Phaser.Sprite;
        cursor:Phaser.CursorKeys;
        terraesquerra:Phaser.Sprite;
        gat:Phaser.Sprite;
        terradreta:Phaser.Sprite;
        baldainici:Phaser.Sprite;
        baldes:Phaser.Group;
        objectes:Phaser.Group;
        ESPAIH = 167;
        ESPAIV = 110;
        tiempo:Phaser.BitmapText;
        CONTADORTIEMPO = 30;
        gameOver = false;
        contadorObjectes=0;
        backgrndOvr=false;
        score=0;



        /**
         * Metodes que utilitzaré al create.
         */
        /**
         * Metode configObjectes serveix per congigurar el group d'objectes.
         */
        configObjectes(){
            this.objectes = this.add.group();
            this.objectes.enableBody = true;
            this.objectes.physicsBodyType = Phaser.Physics.ARCADE;
        }

        /**
         * Metode configGat serveix per configurar el Sprite Gat
         */
        // this.playerAnimationsLoad();
        configGat() {
            this.gat = this.game.add.sprite(
                this.game.world.centerX,
                this.game.world.height - 83,
                'kitty'
            );
            // Cambiamos el "anchor" del jugador
            this.gat.anchor.setTo(0.5, 0.5);
            this.playerAnimationsLoad();
            //Afegueixo fisica al gat.
            this.game.physics.arcade.enable(this.gat);
            // que colisione contra las paredes.
            this.gat.body.collideWorldBounds = true;
            // Agregamos gravedad al jugador
            this.gat.body.gravity.y = 500;
            this.gat.animations.play('idEsperar');

        }
        /**
         * Metode configWorld serveix per configurar el mon
         */
        configWorld() {
            this.game.stage.backgroundColor = "#74538f";
            this.terraesquerra = this.game.add.sprite(
                this.game.world.width - 798,
                this.game.world.height - 100,
                'terraesquerra'
            );
            this.game.physics.arcade.enable(this.terraesquerra);
            this.terraesquerra.body.immovable = true;


            this.baldainici = this.game.add.sprite(
                this.game.world.width - 565,
                this.game.world.height - 35,
                'baldainici'
            );
            this.game.physics.arcade.enable(this.baldainici);
            this.baldainici.body.immovable = true;

            this.terradreta = this.game.add.sprite(
                this.game.world.width - 250,
                this.game.world.height - 100,
                'terradreta'
            );
            this.game.physics.arcade.enable(this.terradreta);
            this.terradreta.body.immovable = true;
            this.tiempo = this.game.add.bitmapText(20, 10,'carrier_command', "Tiempo : " + this.CONTADORTIEMPO,15);
            this.game.time.events.loop(Phaser.Timer.SECOND, this.temporitzadorPartida, this);
            this.game.time.events.loop(Phaser.Timer.SECOND, this.tempsObjectes, this);
            // Cogemos los cursores para gestionar la entrada
            this.cursor = this.game.input.keyboard.createCursorKeys();
        }
        playerAnimationsLoad(){
            this.gat.animations.add('idEsperar', [0,1,2,3], 10,true);
            this.gat.animations.add('idDreta', [8,9,10,11,12,13,14,15], 10,true);
            this.gat.animations.add('idEsquerra', [24,25,26,27,28,29,30,31], 10,true);
        }
        /**
         * Contador de la partida.
         */
        temporitzadorPartida() {

            this.CONTADORTIEMPO--;
        }
        /**
         * Metode configbaldes serveix per col·locar les baldes a la posició que l'hi toca
         */
        configbaldes() {

            this.baldes = this.add.group();
            this.baldes.enableBody = true;
            this.baldes.physicsBodyType = Phaser.Physics.ARCADE;
            for (var x = 0; x < 4; x++) {
                for (var y = 0; y < 5; y++) {
                    if (x == 1 && y == 2 || x == 2 && y == 0 || x == 2 && y == 4 || x == 3 && y == 1 || x == 3 && y == 2 || x == 3 && y == 3) {
                        var newElement = new Balda(this.game, y * this.ESPAIH, x * this.ESPAIV + 50, 'baldes', 0);
                        this.baldes.add(newElement);
                    }
                }
            }
        }

        create():void {

            super.create();
            this.configWorld();
            this.configbaldes();
            this.configGat();
            this.configObjectes();
        }

        /**
         * Metodes utilitzats al update
         */
        /**
         * Metode que al chocar amb un obecte desapareix.
         * @param gat - Sprite gat (jugador)
         * @param objecte - Objectes que hi ha a les baldes
         */
        tirarObjectes(gat:Phaser.Sprite, objecte:Objecte) {
            this.score = this.score+1;
            objecte.kill();
        }

        /**
         *Metode que retorna un tipus de objecte al atzar.
         * @returns string tipus d'objecte
         */
        tipusObjecte():string {
            var tipus = Math.floor((Math.random() * 6) + 1);
            var object;
            if (tipus == 1) {
                object = 'teclat';
            } else if (tipus == 2) {
                object = 'llibre';
            } else if (tipus == 3) {
                object = 'rellotge';
            } else if (tipus == 4) {
                object = 'flor';
            } else {
                object = 'basura';
            }
            return object;
        }

        /**
         * Metode que crea objectes al atzar en una posició random
         */
        crearObjectes() {

            var posicions:Point[] = [new Point(1, 2), new Point(2, 0), new Point(2, 4), new Point(4, 0), new Point(4, 4), new Point(3, 1), new Point(3, 3), new Point(3, 2)];
            var parametros = {
                "1, 2": {
                    balda: 1,
                    altura: 15
                },
                "2, 0": {
                    balda: 2,
                    altura: 64
                },
                "2, 4": {
                    balda: 3,
                    altura: 64
                },
                "4, 0": {
                    balda: 4,
                    altura: 90
                },
                "4, 4": {
                    balda: 5,
                    altura: 90
                },
                "3, 1": {
                    balda: 6,
                    altura: 80
                },
                "3, 2": {
                    balda: 7,
                    altura: 80
                },
                "3, 3": {
                    balda: 8,
                    altura: 80
                }
            };
            var pos = this.rnd.pick(posicions);
            var x = pos.x;
            var y = pos.y;
            var param = parametros[x + ", " + y];
            var balda = param["balda"];
            var altura = param["altura"];
            var objectType = this.tipusObjecte();

            var newElement = new Objecte(this.game, y * this.ESPAIH, x * altura, objectType, balda);
            this.objectes.add(newElement);


        }



        /***
         * Metode per moure al jugador (gat)
         */
        movePlayer():void {
            // Si pulsamos el cursor izquierdo
            if (this.cursor.left.isDown) {
                // Movemos al jugador a la izquierda
                this.gat.body.velocity.x = -200;
                this.gat.animations.play('idEsquerra');
            }
            // Si pulsamos el cursor derecho
            else if (this.cursor.right.isDown) {
                // Movemos al jugador a la derecha
                this.gat.body.velocity.x = 200;
                this.gat.animations.play('idDreta');
            }
            // Si no se pulsan ni el cursor izquierdo ni el derecho
            else {
                // el jugador se para
                this.gat.body.velocity.x = 0;
                this.gat.animations.play('idEsperar');
            }
            // Si pulsamos la flecha arriba y el jugador está tocando el suelo
            if (this.cursor.up.isDown ) {
                // el jugador se mueve hacia arriba (salto)
                this.gat.body.velocity.y = -320;
                this.gat.animations.play('idDreta');
            }
            if (this.CONTADORTIEMPO == 0) {

            }

        }

        /**
         * Contador de temps per saber quan han de sortir cada un dels objectes
         */
        tempsObjectes() {
            this.contadorObjectes++;
        }


        update():void {
            super.update();
            this.game.physics.arcade.collide(this.gat, this.terradreta);
            this.game.physics.arcade.collide(this.gat, this.terraesquerra);
            this.game.physics.arcade.collide(this.baldes, this.gat);
            this.game.physics.arcade.overlap(this.gat, this.objectes, this.tirarObjectes, null, this);
            if(!this.gameOver){
                this.tiempo.setText("Tiempo : " + this.CONTADORTIEMPO);
                if (this.contadorObjectes == 2) {
                    this.crearObjectes();
                    this.contadorObjectes=0;
                }
                this.movePlayer();
            }else{
                this.gameOverFuncio();

            }
            if(this.CONTADORTIEMPO==0){
                this.gameOver=true;
                this.backgrndOvr=true;
            }
        }
        gameOverFuncio(){
            if(this.backgrndOvr) {

                this.gameOverBac = this.game.add.sprite(
                    this.game.world.centerX,
                    this.game.world.centerY,
                    'score'
                );
                this.gameOverBac.anchor.setTo(0.5, 0.5);
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
                    'carrier_command', "" + this.score,
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
                this.backgrndOvr=false;
            }

            if(this.cursor.up.isDown) {
                this.game.state.restart();
                this.contadorObjectes=0;
                this.CONTADORTIEMPO=30;
                this.gameOver = false;
                this.backgrndOvr=false;
            }


        }
    }
    class Objecte extends Phaser.Sprite {
        balda;
        temporitObjecteKill=3;
        game:Phaser.Game;

        constructor(game:Phaser.Game, x:number, y:number, key:string, balda:number) {
            super(game, x, y, key, 0);
            this.game.time.events.loop(Phaser.Timer.SECOND, this.temporitzadorObjecte, this);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
            this.balda = balda;
            this.game = game;
        }
        temporitzadorObjecte()
        {
            this.temporitObjecteKill=this.temporitObjecteKill-1;
        }
        update():void{
            super.update();
            if(this.temporitObjecteKill==0){
                this.game.add.tween(this).to( { alpha: 0 }, 2000, Phaser.Easing.Bounce.Out, true);
                this.kill();
            }
        }
    }
    class Balda extends Phaser.Sprite {
        constructor(game:Phaser.Game, x:number, y:number, key:string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame:string|number) {
            super(game, x, y, key, frame);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;

        }
    }

}
